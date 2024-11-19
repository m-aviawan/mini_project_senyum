export interface IUser {
    id?               : string,
    username          : string,
    email             : string,
    password          : string,
    role?             : string, 
    referralCode      : string,
    profilePictureUrl?: string,
    totalPoint?       : number,
    createdAt?        : Date,
    updatedAt?        : Date,
    deletedAt?        : Date,
    isGoogleRegistered?: boolean,
    countResetPass?: boolean
}

export interface IEO {
    id?               : string,
    email             : string,
    password          : string,
    companyName       : string,
    address?          : string,
    phoneNumber?      : string,
    profilePictureUrl?: string,
    isVerified        : boolean,
    role?             : string, 
    pic?              : string, 
    createdAt?        : Date,
    updatedAt?        : Date,
    deletedAt?        : Date,
}

export interface IUserWithToken extends IUser {
    token: string
}

export interface IUserWithToken extends IUser {
    token: string
}
