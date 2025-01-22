import nodemailer from 'nodemailer';
import { db, userTable } from '@/app/lib/drizzle';
import { eq } from 'drizzle-orm';
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:{email:string, emailType:string, userId:string}) => {

    try {
        
      const hashedToken = await bcryptjs.hash(userId, 10);

      if (emailType === "VERIFY") {
        await db
          .update(userTable)
          .set({
            verifyToken: hashedToken,
            verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour from now
          })
          .where(eq(userTable.id, userId));
      }
        
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "276b24e9dd443d",
        pass: "35d5968573b900"
      }
    });

    const verificationLink = `${process.env.DOMAIN}verifyemail?token=${hashedToken}`
    const resetPasswordLink = `${process.env.DOMAIN}resetpassword?token=${hashedToken}`

    const mailOptions = {
        from: 'foodTuck@gmail.com', 
        to: email, 
        subject: emailType === "VERIFY" ? 'Verify Your Email' : 'Reset your password', 
        html:  emailType === "VERIFY" 
        ? `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2>Verify Your Email Address</h2>
              <p>Hi there,</p>
              <p>Thank you for signing up with FoodTruck! Please verify your email address by clicking the button below:</p>
              <a href="${verificationLink}" 
                 style="display: inline-block; padding: 10px 20px; margin-top: 10px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                Verify Email
              </a>
              <p>If you did not create an account with us, please ignore this email.</p>
              <p>Thank you,</p>
              <p>The FoodTruck Team</p>
            </div>
          `
        : `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2>Reset Your Password</h2>
              <p>Hi there,</p>
              <p>We received a request to reset your password. You can reset it by clicking the button below:</p>
              <a href="${resetPasswordLink}" 
                 style="display: inline-block; padding: 10px 20px; margin-top: 10px; color: white; background-color: #FF5733; text-decoration: none; border-radius: 5px;">
                Reset Password
              </a>
              <p>If you did not request a password reset, please ignore this email.</p>
              <p>Thank you,</p>
              <p>The FoodTruck Team</p>
            </div>
          `,
      }

    const mailResponse = await transport.sendMail
    (mailOptions);
    return mailResponse

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error message:', error.message);
          } else {
            console.error('An unknown error occurred:', error);
          }
    }
}