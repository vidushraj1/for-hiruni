import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../emailConfig';

export const useEmailTracker = () => {
  const track = (eventName, eventDetail = '', pageLabel = '') => {
    try {
      emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          event_name: eventName,
          event_detail: eventDetail,
          page_label: pageLabel || 'N/A',
          timestamp: new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        EMAIL_CONFIG.PUBLIC_KEY
      );
    } catch (_) {
      // Silent — never surface errors to the user
    }
  };

  return { track };
};
