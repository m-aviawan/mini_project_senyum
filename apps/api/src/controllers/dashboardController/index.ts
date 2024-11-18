import { NextFunction, Request, Response } from "express";
import prisma from "@/connection";

export const dashboardController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body
        const { 
            take = 20,
            skip = 0,
            year = new Date().getFullYear().toString(), 
            revenuePeriod, 
            eventsCreatedPeriod, 
            customerTransactionsPeriod, 
            transactionsPeriod ,
            performance,
            search
        } = req.query

        const events = await prisma.eventOrganizer.findUnique({
            where: {
                id
            },   // OFFSET 0
            include: {
              events: {
                where: {
                  name: {
                    contains: search as string
                  }
                },
                take: Number(take),  // LIMIT 20
                skip: Number(skip),
                orderBy: {
                    name: 'asc'
                },
                include: {
                  tickets: {
                    include: {
                      transaction_details: {
                        include: {
                          transactions: true, // Include the associated transaction
                        },
                      },
                    },
                  },
                },
              },
            },
          });

        const transactionAccumulation = await prisma.transactionDetail.groupBy({

          by: ['ticketId'],
          
        })

        const revenueByDate = await prisma.transaction.groupBy({
          by: ['createdAt'],
          _sum: {
            totalPrice: true,  // Sum of totalPrice for each date
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
        console.log(revenueByDate);
        //period => week, month, year
        //performance untuk grafik performa yoy
        // console.log((Number(year) - 1).toString())
        // const getEventOrganizer = await prisma.eventOrganizer.findUnique({
        //     where: {
        //         id
        //     },
        //     include: {
        //         events: true,
        //     }
        // })
        
        // const eventsId = getEventOrganizer?.events.map((item) => {
        //     return item.id
        // })

        // const getEventsCount = await prisma.event.findMany({
        //     where: {
        //         eoId: getEventOrganizer?.id,
        //         createdAt: {
        //             gte: new Date(),
        //             lte: new Date()
        //         }
        //     }
        // })

        // const getEventsCountBefore = await prisma.event.findMany({
        //     where: {
        //         eoId: getEventOrganizer?.id,
        //         createdAt: {
        //             gt: (Number(year) - 1).toString()
        //         }
        //     }
        // })

        // const getEventsTicket = await prisma.eventTicket.findMany({
        //     where: {
        //         eventId: { in: eventsId}
        //     }
        // })
    
        // const ticketsId = getEventsTicket.map(item => {
        //     return item.id
        // })
    
        // const getTransactionsDetail = await prisma.transactionDetail.findMany({
        //     where: {
        //         ticketId: {
        //             in: ticketsId
        //         }
        //     }
        // })

        const latestCreatedEvents = await prisma.event.findMany({
            take: 3,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                tickets: true,
            }
        })

        const topThreeEventsRevenue = await prisma.event.findMany({
            take: 3
        })

        res.status(200).json({
            error: false,
            message: 'Get data dashboard success',
            data: {
                events,
                revenueByDate
                // getEventsTicket,
                // getTransactionsDetail,
                // latestCreatedEvents,
                // getEventsCount: getEventsCount.length,
                // getEventsCountBefore: getEventsCountBefore.length,
            }
        })
    }   
     catch (error) {
        next(error)
    }
}   

export const eventList = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body
        const { 
            sort,
            search,
            take = 5,
            skip = 0
        } = req.query

        const events = await prisma.eventOrganizer.findUnique({
            where: {
                id
            },   // OFFSET 0
            include: {
              events: {
                where: {
                  name: {
                    contains: search as string
                  }
                },
                take: Number(take),
                skip: Number(skip),
                orderBy: {
                    name: 'asc'
                },
                include: {
                  tickets: {
                    include: {
                      transaction_details: {
                        include: {
                          transactions: true, // Include the associated transaction
                        },
                      },
                    },
                  },
                },
              },
            },
          });

        // const eventsSorted = await prisma.eventOrganizer.({
        //     where: {
        //         id
        //     },   // OFFSET 0
        //     include: {
        //       events: {
        //         where: {
        //           name: {
        //             contains: search as string
        //           }
        //         },
        //         take: Number(take) as number,  // LIMIT 20
        //         skip: Number(skip) as number,
        //         orderBy: {
        //             name: 'asc'
        //         },
        //         include: {
        //           tickets: {
        //             include: {
        //               transaction_details: {
        //                 include: {
        //                   transactions: true, // Include the associated transaction
        //                 },
        //               },
        //             },
        //           },
        //         },
        //       },
        //     },
        //   });

          // const results = await prisma.transactionDetail.groupBy({
          //   by: ['tickets.eventId'], // Group berdasarkan eventId yang ada di EventTicket
          //   _sum: {
          //     price: true,  // Jumlahkan harga transaksi
          //     qty: true,    // Jumlahkan kuantitas transaksi
          //   },
          //   include: {
          //     tickets: {
          //       include: {
          //         events: true, // Gabungkan data event berdasarkan eventId
          //       },
          //     },
          //   },
          // });



  } catch (error) {
    next(error)
  }
}