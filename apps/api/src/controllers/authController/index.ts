import { Request, Response, NextFunction } from "express"
import { createToken } from "@/utils/jsonWebToken"
import { authenticationUserService, authWithGoogleService, forgotPasswordService, keepAuthService, registerEOService, registerUserService, resetPasswordService } from "@/services/authService"
import { verifyRegisterService } from "../../services/authService"

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, referralCode } = req.body
        console.log(username)
        console.log(email)
        console.log(password)
        const resData = await registerUserService({ username, email, password, referralCode })

        res.status(201).json({
            error: false,
            message: "Register success",
            data: {
                username: resData.username,
                token: resData.token,
                role: resData.role,
                isVerified: resData.isVerified,
                isGoogleRegistered: resData.isGoogleRegistered,
                profilePictureUrl: resData.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)
    }
}

export const authenticationUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role, isGoogleRegistered } = req.body

        const user = await authenticationUserService({ email, password, role })
        const token = await createToken({ id: user!.id, role: user!.role })
        
        res.status(200).json({
            error: false,
            message: 'Login success',
            data: {
                token,
                username: user!.username,
                role: user!.role,
                isVerified: user!.isVerified,
                isGoogleRegistered: user!.isGoogleRegistered,
                profilePictureUrl: user!.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)    
    }
}

export const keepAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, token } = req.body
        const resData = await keepAuthService({ id, role })

        res.status(200).json({
            error: false,
            message: 'Keep auth success',
            data: {
                token,
                role,
                username: resData.username,
                isVerified: resData.isVerified,
                isGoogleRegistered: resData.isGoogleRegistered,
                profilePictureUrl: resData.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)  
    } 
}

export const verifyRegister = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body

        const userData = await verifyRegisterService({ id, role })
    
        res.status(200).json({
            error: false,
            message: 'Verify register success',
            data: {
                token: userData.token,
                role,
                username: userData.username,
                isVerified: true,
                isGoogleRegistered: userData.isGoogleRegistered,
                profilePictureUrl: userData.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)
    }
}

export const registerEO = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyName, phoneNumber, address, email, pic, password } = req.body
        
        const newEO = await registerEOService({ companyName, phoneNumber, address, email, pic, password })
    
        res.status(201).json({
            error: false,
            message: 'Register Success',
            data: {
                companyName,
                token: newEO.token,
                role: newEO.role,
                isVerified: newEO.isVerified,
                isGoogleRegistered: false,
                profilePictureUrl: newEO.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)
    }
}

export const authWithGoogle = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body

        const userData = await authWithGoogleService({ email })

        res.status(200).json({
            error: false,
            message: 'Authentication with Google success',
            data: {
                token: userData?.token,
                username: userData?.username,
                role: userData?.role,
                isVerified: userData?.isVerified,
                isGoogleRegistered: userData?.isGoogleRegistered,
                profilePictureUrl: userData?.profilePictureUrl
            }
        })

    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        
        await forgotPasswordService({ email })
        
        res.status(200).json({
            error: false,
            message: 'Send email reset password success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params
        const { countResetPass, password } = req.body
        
        await resetPasswordService({ token, countResetPass, password })
        res.status(200).json({
            error: false,
            message: 'Reset password success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}