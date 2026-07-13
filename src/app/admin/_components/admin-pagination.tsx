'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type AdminPaginationProps = {
  page: number;
  limit: number;
  total: number;
  pages?: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export function AdminPagination({
  page,
  limit,
  total,
  pages,
  onPageChange,
  onLimitChange,
}: AdminPaginationProps) {
  const pageCount = Math.max(1, pages ?? Math.ceil(total / limit));
  const visiblePages = Array.from({ length: pageCount }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === pageCount || Math.abs(item - page) <= 1,
  );

  return (
    <div className="admin-pagination">
      <span>
        Всего: <b>{total}</b>
      </span>
      <label>
        На странице
        <select value={limit} onChange={(event) => onLimitChange(Number(event.target.value))}>
          {[10, 20, 50, 100].map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious disabled={page <= 1} onClick={() => onPageChange(page - 1)} />
          </PaginationItem>
          {visiblePages.map((item, index) => {
            const previous = visiblePages[index - 1];
            const hasGap = previous !== undefined && item - previous > 1;
            return (
              <PaginationItem key={item}>
                {hasGap && <PaginationEllipsis />}
                <PaginationLink isActive={item === page} onClick={() => onPageChange(item)}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
