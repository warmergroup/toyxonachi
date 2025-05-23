import {defineStore} from "pinia";
import type {IToyxonalar} from "~/interfaces";

export const useToyxonalarStore = defineStore("toyxonaStore", {
  state: () => ({
    toyxonalar: [] as IToyxonalar[],
    toyxona: {} as IToyxonalar,
    isLoading: false,
  }),
  actions: {
    setToyxonalar(toyxonalar: IToyxonalar[]) {
      this.toyxonalar = toyxonalar;
    },
    getToyxonaById(id: string) {
      return this.toyxonalar.find((p) => p.id === id);
    },
    addToyxona(toyxona: IToyxonalar) {
      this.toyxonalar.unshift(toyxona);
    },
    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});