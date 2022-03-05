<template>
  <v-footer app color="primary" dark absolute>
    <v-spacer/>
    <div>&copy; {{ new Date().getFullYear() + ' ' + footer }}</div>
  </v-footer>
</template>

<script>
export default {
  props: ['footer']
}
</script>
