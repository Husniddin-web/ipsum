export const queryKeys = {
  publicCatalog: ['public', 'catalog'] as const,
  publicServices: (params?: Record<string, unknown>) => ['public', 'services', params] as const,
  adminDirections: (params?: Record<string, unknown>) => ['admin', 'directions', params] as const,
  adminCategories: (params?: Record<string, unknown>) => ['admin', 'categories', params] as const,
  adminSections: (params?: Record<string, unknown>) => ['admin', 'sections', params] as const,
  adminServices: (params?: Record<string, unknown>) => ['admin', 'services', params] as const,
  adminAppointments: (params?: Record<string, unknown>) =>
    ['admin', 'appointments', params] as const,
  adminImports: (params?: Record<string, unknown>) => ['admin', 'imports', params] as const,
};
