import {defineStore} from "pinia";
import type {ComponentType, IToyxonalar} from "~/interfaces";

export const openState = defineStore("openDrawer", {
  state: () => ({
    isOpen: false,
    componentType: null as ComponentType | null,
    toyxonalar: [] as IToyxonalar[],
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