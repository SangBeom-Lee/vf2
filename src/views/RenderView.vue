<template>
  <board-index v-if="collection === 'board' && document === 'list'"></board-index>
  <board-content v-else-if="collection === 'board'" :document="document"></board-content>
  <page-index v-else-if="collection === 'page' && document === 'list'"></page-index>
  <page-content v-else-if="collection === 'page'" :document="document"></page-content>
  <error-page v-else></error-page>
</template>
<script>
import BoardIndex from './board/IndexView'
import BoardContent from './board/ContentView'
import PageIndex from './page/IndexView'
import PageContent from './page/ContentView'
import ErrorPage from './ErrorView'
export default {
  components: {
    BoardIndex, BoardContent, PageIndex, PageContent, ErrorPage
  },
  computed: {
    collection () {
      return this.$route.params.collection
    },
    document () {
      return this.$route.params.document
    }
  }
}
</script>
