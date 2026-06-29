import { VercelRequest, VercelResponse } from '@vercel/node';

// Екрануємо спеціальні символи для Telegram
function escapeMarkdown(text: string): string {
  if (!text) return "";
  return text.replace(/[_*`\[\]()]/g, "\\$&");
}

// Відправляємо повідомлення в Telegram
async function sendTelegramMessage(text: string): Promise<boolean> {
  // Беремо токен і ID з налаштувань Vercel
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Якщо немає налаштувань - виходимо
  if (!token || !chatId) {
    console.log("❌ Немає TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID");
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
      console.log("❌ Telegram API помилка:", await response.text());
      return false;
    }

    console.log("✅ Повідомлення відправлено в Telegram!");
    return true;
  } catch (error) {
    console.log("❌ Помилка з'єднання з Telegram:", error);
    return false;
  }
}

// Це головна функція, яку викликає Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Дозволяємо запити з будь-якого сайту (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Якщо це перевірочний запит - відповідаємо "ОК"
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Якщо це не POST - помилка
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Метод не дозволено. Використовуйте POST.' 
    });
  }

  try {
    // Отримуємо дані з форми
    const { name, phone, date, time, guests, comment } = req.body;

    // Перевіряємо, чи всі поля заповнені
    if (!name || !phone || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        error: "Заповніть всі обов'язкові поля: ім'я, телефон, дата, час, гості",
      });
    }

    // Створюємо гарне повідомлення для Telegram
    const formattedMessage = `🍽 *НОВА БРОНЬ*

👤 *Ім'я:*
${escapeMarkdown(name)}

📞 *Телефон:*
${escapeMarkdown(phone)}

📅 *Дата:*
${escapeMarkdown(date)}

🕒 *Час:*
${escapeMarkdown(time)}

👥 *Гостей:*
${escapeMarkdown(String(guests))}

💬 *Коментар:*
${comment ? escapeMarkdown(comment) : "Немає"}`;

    // Відправляємо в Telegram
    const telegramSent = await sendTelegramMessage(formattedMessage);

    if (!telegramSent) {
      return res.status(502).json({
        success: false,
        error: "Не вдалося відправити повідомлення в Telegram. Спробуйте пізніше.",
      });
    }

    // Все добре!
    return res.status(200).json({ 
      success: true,
      message: "Бронь успішно створена!" 
    });

  } catch (error) {
    console.log("❌ Помилка сервера:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Внутрішня помилка сервера." 
    });
  }
}
