import { defineStore } from 'pinia';

export const useToyxonaFormStore = defineStore('toyxona', {
  state: () => ({
    images: [] as (string | { id: number, image_url: string })[],
    // boshqa form maydonlari...
  }),
  actions: {
    setImages(imgs: (string | { id: number, image_url: string })[]) {
      this.images = imgs;
    },
    addImage(img: string | { id: number, image_url: string }) {
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