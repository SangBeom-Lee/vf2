<template>
  <v-sheet>
      <v-btn type="primary" width="200px">
            이미지 업로드
            <input
              class="imginput"
              type="file"
              accept="image/jpeg, image/jpg"
              @change="getImgPath"
            />
          </v-btn>
      <v-btn @click="write">write</v-btn>
  </v-sheet>
</template>
<script>
import { getStorage, ref, uploadBytes } from 'firebase/storage'

export default {
  data () {
    return {
      text: '',
      imgPath: '',
      imgName: ''
    }
  },
  methods: {
    async write () {
      const storage = getStorage()
      const mountainImagesRef = ref(storage, this.imgName)

      uploadBytes(mountainImagesRef, this.imgpath).then((snapshot) => {
        console.log('Uploaded a blob or file!')
      })
    },
    getImgPath (e) {
      const img = e.target.files[0]
      this.imgpath = img
      this.imgName = img.name.split('.')[0]
    }
  }
}
</script>
