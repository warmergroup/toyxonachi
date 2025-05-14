<template>
  <div class="">
    <LayoutsNavbar/>
    <section class="px-5 mt-20">
      <slot/>
    </section>
    <LayoutsMobileNavbar class="lg:hidden"/>
  </div>
</template>