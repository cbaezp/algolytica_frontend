/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { subject, message, name, email } = req.body;

  if (typeof subject !== "string" || typeof message !== "string") {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const requestBody = {
      sender: {
        name: "Algolytica",
        email: "support@algolytica.com",
      },
      to: [
        {
          email: "support@algolytica.com",
          name: "Support",
        },
      ],
      subject: subject,
      replyTo: {
        email: email,
        name: name || "Anonymous",
      },
      textContent: `Title: ${subject}\nFrom: ${email} | ${name}\nMessage: ${message}`,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
      }
    );

    return res.status(200).json({ message: "Email Sent Successfully", data: response.data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending email", error: error.response?.data || error.message });
  }
};
