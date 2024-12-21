/* eslint-disable import/no-anonymous-default-export */
import nodemailer from "nodemailer";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { subject, message, name, email } = req.body;

  if (typeof subject !== "string" || typeof message !== "string") {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "mailgun",
      host: "smtp.mailgun.org",
      port: 465,
      secure: true,
      auth: {
        user: "contact@odds73.com",
        pass: process.env.CONTACT_PASS,
      },
    });

    const mailOptions = {
      from: "contact@odds73.com",
      to: "support@odds73.com",
      replyTo: email,
      subject: subject,
      html: `
        <h3>Title: ${subject}</h3>
        <p>From: ${email} | ${name}</p>
        <p>Message: ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email Sent Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending email" });
  }
};
