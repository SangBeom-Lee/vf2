<template>
  <v-sheet>
    <v-subheader>
      editor
    </v-subheader>
    <v-spacer />
    <v-btn @click="toggle=!toggle">toggle</v-btn>
    <v-btn @click="read">read</v-btn>
    <toastEditor :options="options" :initialValue="text" ref="editor"></toastEditor>
    <toastViewer v-if="toggle" :initialValue="text"></toastViewer>
  </v-sheet>
</template>
<script>
export default {
  data () {
    return {
      options: {
        language: 'ko'
      },
      text: '# abcdefg',
      toggle: false
    }
  },
  methods: {
    read () {
      this.text = this.$refs.editor.invoke('getMarkdown')
      alert(this.$refs.editor.invoke('getMarkdown'))
    }
  }
}
</script>
