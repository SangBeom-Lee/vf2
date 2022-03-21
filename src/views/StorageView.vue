<template>
  <v-sheet>
      <v-textarea v-model="text">

      </v-textarea>
      <v-btn type="primary" width="200px">
            이미지 업로드
            <input
              class="imginput"
              type="file"
              accept="image/jpeg, image/jpg"
              @change="getImgPath"
            />
          </v-btn>
      <v-btn @click="read">read</v-btn>
      <v-btn @click="write">write</v-btn>
  </v-sheet>
</template>
<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from 'axios'

export default {
  data () {
    return {
      text: '',
      imgPath: '',
      imgName: '',
      url: ''
    }
  },
  methods: {
    async write () {
      const storage = getStorage()
      const mountainImagesRef = ref(storage, this.imgName)

      await uploadBytes(mountainImagesRef, this.imgpath).then((snapshot) => {
        console.log(snapshot)
        console.log('Uploaded a blob or file!')
      })

      this.url = await getDownloadURL(mountainImagesRef)
    },
    getImgPath (e) {
      const img = e.target.files[0]
      this.imgpath = img
      this.imgName = img.name.split('.')[0]
    },
    async read () {
      const r = await axios.get(this.url)
      this.text = r.data
      console.log(r)
    }
  }
}
</script>
