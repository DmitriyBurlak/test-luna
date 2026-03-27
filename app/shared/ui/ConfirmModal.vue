<script setup lang="ts">
const props = withDefaults(defineProps<{
  open: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
}>(), {
  confirmText: 'Удалить',
  cancelText: 'Отмена'
})

const isOpen = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  (e: 'cancel' | 'confirm'): void
}>()

function onConfirm() {
  emit('confirm')
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="props.title"
    :description="props.description"
    :close="{
      color: 'neutral',
      variant: 'outline',
      size: 'md'
    }"
    :dismissible="false"
  >
    <template #footer="{ close }">
      <UButton
        :label="props.cancelText"
        variant="outline"
        color="neutral"
        block
        @click="close"
      />
      <UButton
        :label="props.confirmText"
        color="error"
        variant="solid"
        block
        @click="onConfirm"
      />
    </template>
  </UModal>
</template>
