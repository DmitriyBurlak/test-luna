<template>
  <UFooter>
    <template #left>
      <p class="footer-widget__text">
        Built with Nuxt UI • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://github.com/DmitriyBurlak/test-luna"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>

<style scoped lang="scss">
.footer-widget__text {
  font-size: 14px;
  color: var(--ui-text-muted, #737373);
}
</style>
