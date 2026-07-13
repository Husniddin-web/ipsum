import Link from 'next/link';
import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="breadcrumb" className={cn('mb-5', className)} {...props} />;
}
function BreadcrumbList({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn('flex flex-wrap items-center gap-2 text-sm text-[#758096]', className)}
      {...props}
    />
  );
}
function BreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn('inline-flex items-center gap-2', className)} {...props} />;
}
function BreadcrumbLink({
  href,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link href={href} className={cn('font-bold hover:text-[#ed3237]', className)} {...props} />
  );
}
function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-current="page"
      className={cn('font-extrabold text-[#35374b]', className)}
      {...props}
    />
  );
}
function BreadcrumbSeparator() {
  return <ChevronRight className="size-4" />;
}

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
