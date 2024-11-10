export interface IUser {
    id?               : string,
    username          : string,
    email             : string,
    password          : string,
    role?             : string, 
    refferalCode?     : string,
    profilePictureUrl?: string,
    totalPoint?       : number,
    createdAt?        : Date,
    updatedAt?        : Date,
    deletedAt?        : Date
}