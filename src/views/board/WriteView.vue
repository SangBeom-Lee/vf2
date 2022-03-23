<template>
  <v-container fluid>
    <v-form>
      <v-card :loading="loading">
        <v-toolbar color='accent' dense flat dark>
          <v-toolbar-title>게시판 정보 작성</v-toolbar-title>
          <v-spacer/>
          <v-btn v-icon @click="$router.push('/board/' + document)"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-btn v-icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="form.category" outlined label="종류"></v-text-field>
          <v-text-field v-model="form.title" outlined label="제목"></v-text-field>
          <v-text-field v-model="form.description" outlined label="설명"></v-text-field>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
export default {
  props: ['document', 'action'],
  data () {
    return {
      unsubscribe: null,
      form: {
        category: '',
        title: '',
        description: ''
      },
      exists: false,
      loading: false,
      ref: null
    }
  }
}
</script>
