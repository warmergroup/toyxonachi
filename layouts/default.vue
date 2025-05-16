<template>
  <div class="">
    <LayoutsNavbar />
    <section class="px-5 pt-20 pb-24">
      <slot />
    </section>
    <LayoutsMobileNavbar class="lg:hidden" />
  </div>
</template>