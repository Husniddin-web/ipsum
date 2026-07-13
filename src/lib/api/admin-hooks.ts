'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  adminApi,
  type CategoryPayload,
  type DirectionPayload,
  type SectionPayload,
  type ServicePayload,
} from './services';
import { getApiErrorMessage } from './errors';
import { queryKeys } from './query-keys';

const showError = (error: unknown) => toast.error(getApiErrorMessage(error));

export function useAdminDirections(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.adminDirections(params),
    queryFn: () => adminApi.directions(params),
  });
}

export function useCreateDirection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: DirectionPayload) => adminApi.createDirection(payload),
    onSuccess: async () => {
      toast.success('Направление добавлено');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'directions'] });
    },
    onError: showError,
  });
}

export function useUpdateDirection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DirectionPayload }) =>
      adminApi.updateDirection(id, payload),
    onSuccess: async () => {
      toast.success('Направление обновлено');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'directions'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useDeleteDirection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.deleteDirection,
    onSuccess: async () => {
      toast.success('Направление удалено');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'directions'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'sections'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useAdminCategories(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.adminCategories(params),
    queryFn: () => adminApi.categories(String(params?.directionId || ''), params),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryPayload) => adminApi.createCategory(payload),
    onSuccess: async () => {
      toast.success('Категория добавлена');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
    },
    onError: showError,
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CategoryPayload }) =>
      adminApi.updateCategory(id, payload),
    onSuccess: async () => {
      toast.success('Категория обновлена');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'sections'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.deleteCategory,
    onSuccess: async () => {
      toast.success('Категория удалена');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'sections'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useAdminSections(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.adminSections(params),
    queryFn: () => adminApi.sections(String(params?.categoryId || ''), params),
  });
}

export function useCreateSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SectionPayload) => adminApi.createSection(payload),
    onSuccess: async () => {
      toast.success('Раздел добавлен');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'sections'] });
    },
    onError: showError,
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SectionPayload }) =>
      adminApi.updateSection(id, payload),
    onSuccess: async () => {
      toast.success('Раздел обновлён');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'sections'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useDeleteSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.deleteSection,
    onSuccess: async () => {
      toast.success('Раздел удалён');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'sections'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useAdminServices(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.adminServices(params),
    queryFn: () => adminApi.services(params),
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ServicePayload) => adminApi.createService(payload),
    onSuccess: async () => {
      toast.success('Услуга добавлена');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ServicePayload }) =>
      adminApi.updateService(id, payload),
    onSuccess: async () => {
      toast.success('Услуга обновлена');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.deleteService,
    onSuccess: async () => {
      toast.success('Услуга удалена');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}

export function useAdminAppointments(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.adminAppointments(params),
    queryFn: () => adminApi.appointments(params),
  });
}

export function useAppointmentStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.appointmentStatus(id, status),
    onSuccess: async () => {
      toast.success('Статус заявки обновлён');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'appointments'] });
    },
    onError: showError,
  });
}

export function useResendTelegram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.resendTelegram,
    onSuccess: async () => {
      toast.success('Заявка отправлена в Telegram');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'appointments'] });
    },
    onError: showError,
  });
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.deleteAppointment,
    onSuccess: async () => {
      toast.success('Заявка удалена');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'appointments'] });
    },
    onError: showError,
  });
}

export function useAdminImports(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.adminImports(params),
    queryFn: () => adminApi.imports(params),
  });
}

export function useImportServices() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, directionId }: { file: File; directionId: string }) =>
      adminApi.importServices(file, directionId),
    onSuccess: async () => {
      toast.success('Импорт завершён');
      await queryClient.invalidateQueries({ queryKey: ['admin', 'imports'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'sections'] });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
    },
    onError: showError,
  });
}
