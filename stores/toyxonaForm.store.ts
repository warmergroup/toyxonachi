import { defineStore } from 'pinia';

export const useTotxonaFormStore = defineStore('toyxona', {
  state: () => ({
    images: [] as string[],
    // boshqa form maydonlari...
  }),
  actions: {
    setImages(imgs: string[]) {
      this.images = imgs;
    },
    addImage(img: string) {
      this.images.push(img);
    },
    removeImage(idx: number) {
      this.images.splice(idx, 1);
    },
    cleareImage() {
      this.images = [];
    }
  }
});