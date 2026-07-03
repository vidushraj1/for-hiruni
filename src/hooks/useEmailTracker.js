import { useCallback } from 'react';

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const useEmailTracker = () => {
  const track = useCallback(async (eventName, eventDetail = '', pageLabel = '') => {
    // If secrets aren't set yet, skip execution gracefully
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram Bot Token or Chat ID is missing.');
      return;
    }

    try {
      const timestamp = new Date().toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const text = 
        `<b>💌 Hiruni Activity Alert</b>\n\n` +
        `<b>Event:</b> ${eventName}\n` +
        `<b>Detail:</b> ${eventDetail || 'N/A'}\n` +
        `<b>Page:</b> ${pageLabel || 'N/A'}\n` +
        `<b>Time:</b> ${timestamp}`;

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'HTML',
        }),
      });
    } catch (_) {
      // Silent error — keeps UI working smoothly
    }
  }, []);

  return { track };
};