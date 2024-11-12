import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mfauziavi@gmail.com',
        pass: 'qgvjpgwkpnjvvghu'
    },
    tls: {
        rejectUnauthorized:false
    }
})