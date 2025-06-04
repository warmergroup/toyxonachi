import {defineStore} from "pinia";
import type {DrawerType, IToyxona} from "~/interfaces";

export const openState = defineStore("openDrawer", {
  state: () => ({
    isOpen: false,
    drawerType: null as DrawerType | null,
    toyxonalar: [] as IToyxona[],
  }),
  actions: {
    onOpen(type: DrawerType) {
      this.drawerType = type;
      this.isOpen = true;
    },
    onClose() {
      this.isOpen = false;
      this.drawerType = null;
    },
  },
});