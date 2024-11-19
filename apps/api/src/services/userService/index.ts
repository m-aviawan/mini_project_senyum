import prisma from "@/connection";
import { IEO, IUser } from "../authService/types";

export const getUserService = async({ role, id }: Pick< IUser, 'id' | 'role'>) => {
    let userData, resData;

    if(role === 'CUSTOMER') {
        userData = await prisma.user.findUnique({
            where: { id },
        })
        
        if(!userData?.id) throw { msg: 'User not found!' }
        resData = {
            username: userData?.username,
            email: userData?.email,
            phoneNumber: userData?.phoneNumber,
            address: userData?.address,
            birthDate: userData?.birthDate,
            gender: userData?.gender,
            profilePictureUrl: userData?.profilePictureUrl
        }
    } else if(role === 'EO') {
        userData = await prisma.eventOrganizer.findUnique({
            where: { id }
        })
        
        if(!userData?.id) throw { msg: 'Event organizer not found!' }
        resData = {
            companyName: userData?.companyName,
            address: userData?.address,
            email: userData?.email,
            phoneNumber: userData?.phoneNumber,
            pic: userData?.pic,
            profilePictureUrl: userData?.profilePictureUrl
        }
    }

    return resData
}

export const updateProfileService = async({ username, phoneNumber, address, birthDate, gender, id, role, pic, companyName, imagesUploaded }: any) => {

        let updatedProfile, resData;
        if(role === 'CUSTOMER') {
            if(imagesUploaded) {
                updatedProfile = await prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        username,
                        phoneNumber,
                        address,
                        birthDate,
                        gender,
                        profilePictureUrl: imagesUploaded
                    }
                })
                resData = {
                    username,
                    phoneNumber,
                    address,
                    birthDate,
                    gender,
                    ProfilePictureUrl: imagesUploaded
                }
            } else {
                updatedProfile = await prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        username,
                        phoneNumber,
                        address,
                        birthDate,
                        gender
                    }
                })
                resData = {
                    username,
                    phoneNumber,
                    address,
                    birthDate,
                    gender
                }
            }
        } else if( role === 'EO') {
            if(imagesUploaded) {
                updatedProfile = await prisma.eventOrganizer.update({
                    where: {
                        id
                    },
                    data: {
                        companyName,
                        phoneNumber,
                        address,
                        pic,
                        profilePictureUrl: imagesUploaded
                    }
                })
                resData = {
                    companyName,
                    phoneNumber,
                    address,
                    pic,
                    profilePictureUrl: imagesUploaded
                }
            } else {
                updatedProfile = await prisma.eventOrganizer.update({
                    where: {
                        id
                    },
                    data: {
                        companyName,
                        phoneNumber,
                        address,
                        pic
                    }
                })
                resData = {
                    companyName,
                    phoneNumber,
                    address,
                    pic
                }
            }
        }
    return resData
}