import {defineStore} from 'pinia';

export const useCollapseStore = defineStore('isOpen', {
  state: () => ({
    isOpenState: true, // State nomini o'zgartiramiz
  }),
  actions: {
    toggleOpen() {
      this.isOpenState = !this.isOpenState;
    },
  },
  getters: {
    isOpen: (state) => state.isOpenState, // Getter nomi o'zgarmaydi
  },
});
