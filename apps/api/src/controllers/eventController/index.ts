// import React from 'react'
// import prisma from "@/connection/prisma"

// export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { name, role, token } = req.body

//         res.status(200).json({
//             error: false,
//             message: 'Keep auth success',
//             data: {
//                 token,
//                 role,
//                 name
//             }
//         })
//     } catch (error) {
//         next(error)  
//     } 
// }
