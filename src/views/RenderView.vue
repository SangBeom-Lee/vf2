<template>
  <board-index v-if="collection === 'board' && document === 'list'"></board-index>
  <board-content v-else-if="collection === 'board' && !action" :document="document"></board-content>
  <board-write v-else-if="collection === 'board'" :document="document" :action="action"></board-write>
  <page-index v-else-if="collection === 'page' && document === 'list'"></page-index>
  <page-content v-else-if="collection === 'page'" :document="document"></page-content>
  <error-page v-else></error-page>
</template>
<script>
import BoardIndex from './board/IndexView'
import BoardContent from './board/ContentView'
import BoardWrite from './board/WriteView'
import PageIndex from './page/IndexView'
import PageContent from './page/ContentView'
import ErrorPage from './ErrorView'
export default {
  components: {
    BoardIndex, BoardContent, PageIndex, PageContent, ErrorPage, BoardWrite
  },
  computed: {
    collection () {
      return this.$route.params.collection
    },
    document () {
      return this.$route.params.document
    },
    action () {
      return this.$route.params.action
    }
  }
}
</script>
