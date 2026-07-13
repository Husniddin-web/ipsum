'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const toPositiveNumber = (value: string | null, fallback: number) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
};

export function useAdminUrlPagination(defaultLimit = 10) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = toPositiveNumber(searchParams.get('page'), 1);
  const limit = toPositiveNumber(searchParams.get('limit'), defaultLimit);

  const setParams = useCallback(
    (updates: Record<string, string | number | undefined>, resetPage = false) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === '') params.delete(key);
        else params.set(key, String(value));
      });
      if (resetPage) params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const params = useMemo(
    () => ({
      page,
      limit,
      search: searchParams.get('search') || undefined,
    }),
    [limit, page, searchParams],
  );

  return {
    page,
    limit,
    params,
    get: (key: string) => searchParams.get(key) || '',
    setPage: (nextPage: number) => setParams({ page: nextPage }),
    setLimit: (nextLimit: number) => setParams({ limit: nextLimit, page: 1 }),
    setParam: (key: string, value?: string | number) => setParams({ [key]: value }, true),
    setParams,
  };
}
