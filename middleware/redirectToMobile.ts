export default defineNuxtRouteMiddleware(() => {
  const userAgent = process.server
    ? useRequestHeaders()['user-agent']
    : navigator.userAgent;

  const isDesktop = /Windows|Macintosh|Linux/i.test(userAgent || '');

  if (isDesktop) {
    return navigateTo('/mobile-only');
  }
});