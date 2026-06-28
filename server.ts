import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to escape special Markdown characters for Telegram Markdown mode
function escapeMarkdown(text: string): string {
  if (!text) return "";
  return text.replace(/[_*`\[\]()]/g, "\\$&");
}

// Helper to send Telegram message
async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[Telegram] Configuration missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.");
    return false;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[Telegram API Error] Status: ${response.status}, Response: ${errText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Telegram Connection Error]", error);
    return false;
  }
}

// 🍽 1. Reservation Endpoint
app.post("/api/reservation", async (req: Request, res: Response) => {
  try {
    const { name, phone, date, time, guests, comment } = req.body;

    if (!name || !phone || !date || !time || !guests) {
      res.status(400).json({
        success: false,
        error: "Missing required reservation fields (name, phone, date, time, guests).",
      });
      return;
    }

    console.log(`[Reservation Received] Name: ${name}, Phone: ${phone}, Guests: ${guests}`);

    // Construct Markdown Message
    const formattedMessage = `🍽 *NEW RESERVATION*

👤 *Name:*
${escapeMarkdown(name)}

📞 *Phone:*
${escapeMarkdown(phone)}

📅 *Date:*
${escapeMarkdown(date)}

🕒 *Time:*
${escapeMarkdown(time)}

👥 *Guests:*
${escapeMarkdown(String(guests))}

💬 *Comment:*
${comment ? escapeMarkdown(comment) : "None"}`;

    const telegramSent = await sendTelegramMessage(formattedMessage);

    if (!telegramSent) {
      console.warn("[Reservation] Notification could not be sent via Telegram.");
      res.status(502).json({
        success: false,
        error: "Failed to send reservation notification. Please try again or contact us directly.",
      });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Reservation API Error]", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

// 🔔 2. Call Waiter Endpoint (Future Feature Setup)
app.post("/api/call-waiter", async (req: Request, res: Response) => {
  try {
    const { tableNumber } = req.body;
    if (!tableNumber) {
      res.status(400).json({ success: false, error: "Table number is required." });
      return;
    }

    console.log(`[Waiter Call] Table: ${tableNumber}`);

    const formattedMessage = `🔔 *WAITER CALL*

📍 *Table Number:*
Table ${escapeMarkdown(String(tableNumber))}

⏰ *Time:*
${escapeMarkdown(new Date().toLocaleTimeString())}`;

    const telegramSent = await sendTelegramMessage(formattedMessage);
    res.status(telegramSent ? 200 : 502).json({ success: telegramSent });
  } catch (error) {
    console.error("[Call Waiter API Error]", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

// 💵 3. Request Bill Endpoint (Future Feature Setup)
app.post("/api/request-bill", async (req: Request, res: Response) => {
  try {
    const { tableNumber, paymentMethod } = req.body;
    if (!tableNumber) {
      res.status(400).json({ success: false, error: "Table number is required." });
      return;
    }

    console.log(`[Request Bill] Table: ${tableNumber}, Method: ${paymentMethod || "Not specified"}`);

    const formattedMessage = `💵 *BILL REQUEST*

📍 *Table Number:*
Table ${escapeMarkdown(String(tableNumber))}

💳 *Payment Method:*
${paymentMethod ? escapeMarkdown(paymentMethod) : "Not specified"}

⏰ *Time:*
${escapeMarkdown(new Date().toLocaleTimeString())}`;

    const telegramSent = await sendTelegramMessage(formattedMessage);
    res.status(telegramSent ? 200 : 502).json({ success: telegramSent });
  } catch (error) {
    console.error("[Request Bill API Error]", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

// ✉️ 4. Contact Staff / Feedbacks (Future Feature Setup)
app.post("/api/contact-staff", async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    if (!message) {
      res.status(400).json({ success: false, error: "Message is required." });
      return;
    }

    console.log(`[Contact Staff] From: ${name || "Anonymous"}`);

    const formattedMessage = `✉️ *NEW STAFF CONTACT*

👤 *Name:*
${name ? escapeMarkdown(name) : "Anonymous"}

📧 *Email:*
${email ? escapeMarkdown(email) : "Not provided"}

💬 *Message:*
${escapeMarkdown(message)}`;

    const telegramSent = await sendTelegramMessage(formattedMessage);
    res.status(telegramSent ? 200 : 502).json({ success: telegramSent });
  } catch (error) {
    console.error("[Contact Staff API Error]", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
