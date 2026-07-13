'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LabService } from '../api/types';
type SelectionState = {
  items: LabService[];
  add: (service: LabService) => void;
  remove: (id: string) => void;
  toggle: (service: LabService) => void;
  clear: () => void;
  has: (id: string) => boolean;
};
export const useSelectionStore = create<SelectionState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (service) =>
        set({ items: [...get().items.filter((item) => item._id !== service._id), service] }),
      remove: (id) => set({ items: get().items.filter((item) => item._id !== id) }),
      toggle: (service) =>
        get().has(service._id) ? get().remove(service._id) : get().add(service),
      clear: () => set({ items: [] }),
      has: (id) => get().items.some((item) => item._id === id),
    }),
    { name: 'ipsum-selected-services' },
  ),
);
