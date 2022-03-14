<template>
  <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
  <v-menu offset-y v-else-if="!$store.state.fireUser">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on"><v-icon>mdi-account</v-icon></v-btn>
    </template>
    <v-card>
      <v-card-title>로그인</v-card-title>
      <v-divider/>
      <v-card-actions>
        <v-btn color="red" dark @click="signInWithGoogle" block><v-icon left>mdi-google</v-icon> 구글로 로그인</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
  <v-menu offset-y v-else>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">
        <v-avatar size="32">
          <v-img :src="$store.state.fireUser.photoURL"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>정보</v-card-title>
      <v-divider/>
      <v-card-actions>
        <v-btn color="" dark @click="signOut" block>로그아웃</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async signInWithGoogle () {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      this.loading = true
      await signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          const user = result.user

          console.log(token)
          this.$store.commit('setFireUser', user)

          this.loading = false
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)
          // ...
          console.log(errorCode)
          console.log(errorMessage)
          console.log(email)
          console.log(credential)
        })
    },
    // 로그아웃
    signOut () {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.$store.commit('setFireUser', null)
      })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
