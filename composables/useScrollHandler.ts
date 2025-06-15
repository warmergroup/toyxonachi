import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollHandler() {
  const isHidden = ref(false); // Navbar yoki Topbar yashirilganmi
  let prevScrollPos = 0;

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos < currentScrollPos) {
      isHidden.value = true; // Pastga scroll qilinganda yashirish
    } else {
      isHidden.value = false; // Yuqoriga scroll qilinganda ko'rsatish
    }
    prevScrollPos = currentScrollPos;
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      prevScrollPos = window.pageYOffset; // Faqat brauzerda ishlaydi
      window.addEventListener('scroll', handleScroll);
    }
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  return { isHidden };
}