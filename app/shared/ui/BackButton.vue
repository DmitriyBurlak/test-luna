<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  to?: string
}>(), {
  label: 'назад',
  to: '/'
})
</script>

<template>
  <div class="btn-back">
    <UButton
      color="neutral"
      variant="link"
      icon="i-lucide-arrow-left"
      :to="props.to"
    >
      {{ props.label }}
    </UButton>
  </div>

</template>

<style scoped lang="scss">
.btn-back {
  max-width: max-content;
}
</style>