import {defineStore} from "pinia";
import type {IToyxonalar} from "~/interfaces";

export const useToyxonalarStore = defineStore("toyxonaStore", {
  state: () => ({
    toyxonalar: [] as IToyxonalar[],
    toyxona: {} as IToyxonalar,
    isLoading: false,
    error: null as Error | null,
    currentPage: 1,
    hasNextPage: true,
  }),
  getters: {
    isEmpty: (state) => state.toyxonalar.length === 0,
    getToyxonaById: (state) => (id: string) => {
      return state.toyxonalar.find((p) => p.id === id);
    },
  },
  actions: {
    setToyxonalar(toyxonalar: IToyxonalar[]) {
      this.toyxonalar = toyxonalar;
    },
    addToyxona(toyxona: IToyxonalar) {
      // Mavjud bo'lmagan to'yxonani qo'shish uchun idsini tekshiriladi
      const exists = this.toyxonalar.some(t => t.id === toyxona.id);
      if (!exists) {
        this.toyxonalar.unshift(toyxona);
      }
    },
    setLoading(value: boolean) {
      this.isLoading = value;
    },
    setError(error: Error | null) {
      this.error = error;
    },
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    setHasNextPage(value: boolean) {
      this.hasNextPage = value;
    },
    findToyxona(id: string) {
      return this.toyxonalar.find((p) => p.id === id);
    },
    clearToyxonalar() {
      this.toyxonalar = [];
      this.currentPage = 1;
      this.hasNextPage = true;
      this.error = null;
    },
  },
});