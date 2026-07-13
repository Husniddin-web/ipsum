'use client';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/errors';
import { authApi } from '@/lib/api/services';
export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (result) => {
      sessionStorage.setItem('ipsum_access_token', result.accessToken);
      sessionStorage.setItem('ipsum_refresh_token', result.refreshToken);
      toast.success('Вход выполнен');
      router.replace('/admin');
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Неверный email или пароль')),
  });
  return (
    <main className="admin-login">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          loginMutation.mutate({
            email: String(form.get('email')),
            password: String(form.get('password')),
          });
        }}
      >
        <Image src="/logo.png" alt="IPSUM" width={180} height={60} />
        <div>
          <span>Защищённый доступ</span>
          <h1>Вход в панель</h1>
          <p>Управление каталогом лаборатории и заявками.</p>
        </div>
        <label>
          Email
          <input name="email" type="email" required autoComplete="username" />
        </label>
        <label>
          Пароль
          <input name="password" type="password" required autoComplete="current-password" />
        </label>
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Входим...' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
