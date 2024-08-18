import multer from 'multer';

export const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

import nodemailer from 'nodemailer';




export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, 
  secure: false, 
  auth: {
    user: "rahulpurohitrp789rp@gmail.com",
    pass: "ecis kzht yqfz pgzl",
  },
  tls: {
    rejectUnauthorized: false // For self-signed certificates
  }
});

export async function sendEmail(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error('Failed to send email: ' + error.message);
  }
}
