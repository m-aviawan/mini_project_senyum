import prisma from "@/connection/prisma"
import { addWeeks, isAfter, isBefore } from "date-fns"
import { NextFunction, Request, Response } from "express"
import { Multer } from "multer"
import { boolean } from "yup"
import {v2 as cloudinary, cloudinaryUpload} from 'cloudinary'

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    const { 
        id, name, type, locationName,
        location, url = null, description = null, startDate,
        endDate, isPaid = false, categoryId, tickets
    } = req.body

    let eventImages;
    if(!Array.isArray(req?.files) && !req?.files?.images?.length) {
        throw { msg: 'File not found!' }
    } else {
        eventImages = req.files 
    } 

    if (req.files) {
        files = Array.isArray(req.files)
        ? req.files
        : req.files['images']

        console.log(req.files)

        const imagesUploaded = []
        for (const image of files!){
            const result: any = await cloudinaryUpload(image.buffer);
            console.log(result)
            imagesUploaded.push(result.res!)
        }
    }

    const capacityArr: number[] = tickets.map((item: any) => item.available)
    const capacity: number = capacityArr.reduce((acc: number, curr: number) => acc + curr)

    const isDateValid = isAfter(new Date(startDate), new Date(endDate))

    let newEvent;
    
    if(isDateValid) {
        newEvent = await prisma.event.create({
            data: { 
                eoId: id, name, type,
                location, locationName, url,
                description, startDate, endDate,
                isPaid, categoryId, capacity
            }
        })
    } else {
        throw { err: 'Start Date must before End Date!' }
    }

    const addEventTicket = tickets.map((item: any) => {
        if(item.discount && item.discount != 0) {
            return {
                name: item.name,
                price: item.price,
                available: item.totalSeat,
                totalSeat: item.toalSeat,
                bookSeat: 0,
                discount: item.discount,
                discountStart: item.discountStart,
                discountExpiry: item.discountExpiry,
                startDate: item.startDate,
                endDate: item.endDate
            }
        }
        return {
            name: item.name,
            price: item.price,
            available: item.totalSeat,
            totalSeat: item.toalSeat,
            bookSeat: 0,
            startDate: item.startDate,
            endDate: item.endDate
        }
        
    })

    await prisma.eventTicket.createMany({
        data: addEventTicket
    })

    const addEventImage = eventImages?.images.map((item: any) => {
        return { url: item.filename, directory: item.destination, eventId: newEvent.id}
    })

    await prisma.eventImage.createMany({
        data: addEventImage
    })
}

export const updateEvent = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
            id, name, type, locationName,
            location, url = null, description = null, startDate,
            endDate, isPaid = false, categoryId, tickets, capacity
        } = req.body
    
        const { eventId } = req.params
    
        const currentEventData = await prisma.event.findUnique({
            where: {
                id: eventId
            }
        })
    
        const limitStartDateChange = addWeeks(currentEventData!.startDate, 2)
        const isStartDateChangeValid = isBefore(limitStartDateChange, new Date(startDate))
        const isEndDateChangeValid = isAfter(currentEventData!.startDate, new Date(endDate))
    
        if(isStartDateChangeValid && isEndDateChangeValid) {
            await prisma.event.update({
                where: { id: eventId },
                data: {
                    description, startDate, 
                    endDate, location, 
                    locationName, capacity
                }
            })
        } else {
            throw { msg: 'Start Date or End Date invalid!', status: 406 }
        }
    } catch (error) {
        next(error)
    }

}

export const getEvents = async(req: Request, res: Response, next: NextFunction) => {
    try {

        interface IFilterFeat {
            take: number,
            skip: number,
            name: string
        }

        let { take = 20, skip = 0, name = '' }: any = req.query
        let events;
        events = await prisma.category.findMany({
            // skip,
            // take,
            include: {
                events: true
            }
        })

        if(name?.length >= 3) {
            events = await prisma.event.findMany({
                where: { 
                    name: {
                        startsWith: '%',
                        endsWith: '%'
                    }
                },
                skip,
                take
            })
        }
        
        res.status(200).json({
            error: false,
            message: 'Get events success',
            data: events
        })
    } catch (error) {
        next(error)
    }
}

export const getEventDetail = async(req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.params
    
    const eventDetail = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
            tickets: true,
            images: true,
            reviews: true
        }
    })

    const getEventOrganizer = await prisma.eventOrganizer.findUnique({
        where: {
            id: eventDetail?.eoId
        }
    }) 

    const eventImagesPath: string[] | undefined = eventDetail?.images?.map((item) => {
        return `${item.directory}/${item.url}`
    })

    let eventTickets: any[] | undefined = []
    eventDetail?.tickets.forEach((item) => {
        const isAfterStart = isAfter(new Date(item.startDate), new Date())
        const isBeforeEnd = isBefore(new Date(item.endDate), new Date())
        let availability = ''
        let available = item.available - item.bookSeat
        if(isAfterStart && isBeforeEnd) {
            availability = 'Sale'
            if(available <= 0) {
                availability = 'Sold out!'
            }
        } else if (!isAfterStart && isBeforeEnd) {
            availability = 'Coming soon'
        } else if (isAfterStart && !isBeforeEnd) {
            availability = 'Ended'
        } else {
            throw { msg: 'Ticket start date and end date invalid!', status: 500 }
        }

        let isDiscountStart, isDiscountEnd, discountStatus;
        if(item.discountStart && item.discountExpiry) {
            isDiscountStart = isAfter(new Date(item.discountStart), new Date())
            isDiscountEnd = isBefore(new Date(item.discountExpiry), new Date())
            discountStatus = Boolean(isDiscountEnd && isDiscountStart)
        }

        eventTickets.push({
            availability,
            name: item.name,
            price: item.price,
            available,
            discount: item.discount,
            discountStart: item.discountStart,
            discountExpiry: item.discountExpiry,
            discountStatus,
            startDate: item.startDate,
            endDate: item.endDate
        })
    })

    res.status(200).json({
        error: false,
        message: 'Get event detail success',
        data: {
            eventDetail,
            eventOrganizer: {
                companyName: getEventOrganizer?.companyName,
                address: getEventOrganizer?.address,
                email: getEventOrganizer?.email,
            },
            eventTickets,
            eventImagesPath
        }
    })
}

// model Event {
//     id           String    @id @default(cuid())
//     name         String
//     type         EventType
//     locationName String
//     location     String
//     url          String?
//     description  String?
//     startDate    DateTime
//     endDate      DateTime
//     isPaid       Boolean   @default(false)
//     capacity     Int
  
//     categoryId     Int
//     categories     Category       @relation(fields: [categoryId], references: [id])
//     eoId           String
//     eventOrganizer EventOrganizer @relation(fields: [eoId], references: [id])
  
//     tickets      EventTicket[]
//     images       EventImage[]
//     reviews      Review[]
  
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     deletedAt DateTime?
  
//     @@map("events")
//   }
  
//   model EventTicket {
//     id             String    @id @default(cuid())
//     name           String
//     price          Int
//     available      Int
//     bookSeat       Int
//     discount       Int       @default(0)
//     discountStart  DateTime?
//     discountExpiry DateTime?
//     startDate      DateTime
//     endDate        DateTime
  
//     transaction_details TransactionDetail[]
//     eventId             String
//     events              Event               @relation(fields: [eventId], references: [id])
  
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     deletedAt DateTime?
  
//     @@map("event_tickets")
//   }
  
//   model Category {
//     id   Int    @id @default(autoincrement())
//     name String
  
//     events Event[]
  
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     deletedAt DateTime?
  
//     @@map("categories")
//   }
  
//   model EventImage {
//     id  Int    @id @default(autoincrement())
//     url String
  
//     eventId String
//     events  Event  @relation(fields: [eventId], references: [id])
  
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     deletedAt DateTime?
  
//     @@map("event_images")
//   }
  