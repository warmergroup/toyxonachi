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
    updateToyxona(updatedToyxonalar: IToyxonalar) {
      const index = this.toyxonalar.findIndex(
        (p) => p.id === updatedToyxonalar.id
      );
      if (index !== -1) this.toyxonalar.splice(index, 1, updatedToyxonalar);
    },
    removeToyxona(toyxonaId: string) {
      this.toyxonalar = this.toyxonalar.filter((p) => p.id !== toyxonaId);
    },
    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});