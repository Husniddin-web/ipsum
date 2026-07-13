'use client';

import { useQuery } from '@tanstack/react-query';
import { publicApi } from './services';
import { queryKeys } from './query-keys';

export function usePublicCatalog() {
  return useQuery({
    queryKey: queryKeys.publicCatalog,
    queryFn: publicApi.catalog,
  });
}

export function usePublicServices(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.publicServices(params),
    queryFn: () => publicApi.services(params),
  });
}
