import Vue from 'vue'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import '@toast-ui/editor/dist/i18n/ko-kr'

import { Editor, Viewer } from '@toast-ui/vue-editor'
Vue.component('toastEditor', Editor)
Vue.component('toastViewer', Viewer)
