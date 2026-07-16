import { useCallback } from 'react';

export const useTelegramTracker = () => {
  const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  const sendRawMessage = useCallback(async (text) => {
    if (!TOKEN || !CHAT_ID) {
      console.warn("🚨 Missing Telegram Token or Chat ID in .env file!");
      return;
    }
    try {
      const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
      });
      const data = await res.json();
      if (!data.ok) console.error("🚨 Telegram Error:", data);
    } catch (e) {
      console.error("🚨 Fetch Error:", e);
    }
  }, [TOKEN, CHAT_ID]);

  const track = useCallback(async (eventName, eventDetail = '', pageLabel = '') => {
    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
    const text = 
      `<b>💌 Hiruni Activity Alert</b>\n\n` +
      `<b>Event:</b> ${eventName}\n` +
      `<b>Detail:</b> ${eventDetail || 'N/A'}\n` +
      `<b>Page:</b> ${pageLabel || 'N/A'}\n` +
      `<b>Time:</b> ${timestamp}`;
      
    await sendRawMessage(text);
  }, [sendRawMessage]);

  return { track, sendRawMessage };
};