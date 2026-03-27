<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  to?: string
}>(), {
  label: 'назад',
  to: '/'
})

const router = useRouter()

function navigateBack() {
  router.push(props.to)
}
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    icon="i-lucide-arrow-left"
    @click="navigateBack"
  >
    {{ props.label }}
  </UButton>
</template>
