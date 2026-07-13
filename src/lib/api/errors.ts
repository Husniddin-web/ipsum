import axios from 'axios';

type ApiErrorPayload = {
  message?: string | string[];
  error?: string;
};

export function getApiErrorMessage(error: unknown, fallback = 'Не удалось выполнить действие') {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) return fallback;

  const message = error.response?.data?.message;
  if (Array.isArray(message)) return message.join(', ');
  if (message) return message;
  if (error.response?.data?.error) return error.response.data.error;

  return fallback;
}
