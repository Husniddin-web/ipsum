import type { Metadata } from 'next';
import { AdminShell } from './_components/admin-shell';
import './admin.css';
export const metadata: Metadata = {
  title: 'Управление | IPSUM Pathology',
  robots: { index: false, follow: false },
};
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
