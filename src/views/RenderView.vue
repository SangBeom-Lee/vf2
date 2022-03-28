<template>
  <board-index v-if="collection === 'board' && document === 'list'"></board-index>
  <board-content v-else-if="collection === 'board' && !action" :document="document"></board-content>
  <board-write v-else-if="collection === 'board' && action === 'config-write'" :document="document" :action="action"></board-write>
  <board-article-write v-else-if="collection === 'board' && action === 'article-write'" :document="document" :action="action"></board-article-write>
  <page-index v-else-if="collection === 'page' && document === 'list'"></page-index>
  <page-content v-else-if="collection === 'page'" :document="document"></page-content>
  <error-page v-else></error-page>
</template>
<script>
import BoardIndex from './board/IndexView'
import BoardContent from './board/ContentView'
import BoardWrite from './board/WriteView'
import BoardArticleWrite from './board/article/WriteView'
import PageIndex from './page/IndexView'
import PageContent from './page/ContentView'
import ErrorPage from './ErrorView'
export default {
  components: {
    BoardIndex, BoardContent, BoardArticleWrite, PageIndex, PageContent, ErrorPage, BoardWrite
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
