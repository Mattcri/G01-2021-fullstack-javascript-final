<template>
  <v-alert
    class="text-center"
    :type="type"
    dismissible
    outlined
    border="left"
    @input="closeAlert"
  >

  </v-alert>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'error'
    },
    closeAlert: Function
  }
}
</script>
