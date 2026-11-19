import nodemailer from "nodemailer";

export const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}

/* Usig gmail App Password
- To use a Gmail App Password with Nodemailer, you must enable 2-Step Verification on your Google Account and generate a 16-character App Password.


Step 1: Enable 2-Step Verification
    - Go to your Google Account Security Settings.

    - Under How you sign in to Google, select 2-Step      Verification.

    - Follow the on-screen prompts to turn it on (if it is not already active).

Step 2: Generate an App Password
    - In your Google Account Security Settings, search for or click on App passwords (if you don't see it, ensure 2-Step Verification is fully enabled).

    - Enter a custom name for your app (for example, NodeJS Nodemailer).

    - Click Create.

    - Google will display a 16-character password. Copy this code and remove any spaces.
*/