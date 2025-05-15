<template>
  <div class="">
    <LayoutsNavbar />
    <section class="px-5 mt-20">
      <div class="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      <slot />
    </section>
    <LayoutsMobileNavbar class="lg:hidden" />
  </div>
</template>