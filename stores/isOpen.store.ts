import {defineStore} from "pinia";
import type {ComponentType, IToyxona} from "~/interfaces";

export const openState = defineStore("openDrawer", {
  state: () => ({
    isOpen: false,
    componentType: null as ComponentType | null,
    toyxonalar: [] as IToyxona[],
  }),
  actions: {
    onOpen(type: ComponentType) {
      this.componentType = type;
      this.isOpen = true;
    },
    onClose() {
      this.isOpen = false;
      this.componentType = null;
    },
  },
});