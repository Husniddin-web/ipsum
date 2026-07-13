import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type AdminBreadcrumbProps = {
  items: Array<{ label: string; href?: string }>;
};

export function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin">Админ</BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item) => (
          <BreadcrumbItem key={`${item.href ?? item.label}-${item.label}`}>
            <BreadcrumbSeparator />
            {item.href ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
