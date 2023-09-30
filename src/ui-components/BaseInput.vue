<template>
  <div class="base-input">
    <label>{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="base-input__field"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  label: {
    type:String,
    default: ""
  },
  modelValue: {
    type: String,
    default: ""
  }
})
</script>

<style lang="scss" scoped>
.base-input {
  display: flex;
  flex-direction: column;

  &__field {

  }
}
</style>
