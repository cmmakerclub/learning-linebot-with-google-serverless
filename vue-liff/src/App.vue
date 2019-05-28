<template>
  <div id="app" style="margin-top: 0">
    <div class="container mx-auto min-h-screen bg-teal-100">
      <Navbar></Navbar>
      <div class="flex justify-center p-6">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <img class="w-screen h-64 bg-gray-200" :src="this.profile.pictureUrl" alt="" style="object-fit: cover">
          <div class="px-6 py-4 text-left">
            <div class="font-bold text-base mb-2">
              User ID :&ensp;
              <span>{{ this.profile.userId }}</span>
            </div>
            <div class="font-bold text-base mb-2">
              Display Name :&ensp;
              <span>{{ this.profile.displayName }}</span>
            </div>
            <div class="font-bold text-base mb-2">
              Status Message :&ensp;
              <span>{{ this.profile.statusMessage }}</span>
            </div>
          </div>
          <div class="text-right px-5 pb-5">
            <button type="button"
                    class="bg-green-500 text-white hover:bg-green-400 font-bold py-2 px-4 rounded w-full shadow border-gray-400"
                    v-clipboard:copy="this.accessToken"
                    v-clipboard:success="onCopy">
              <font-awesome-icon icon="copy"/>
              {{ textCopyButton }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'

  export default {
    name: 'App',
    components: {
      Navbar,
    },
    data () {
      return {
        profile: {
          userId: '',
          displayName: '',
          pictureUrl: '',
          statusMessage: '',
        },
        accessToken: '',
        textCopyButton: 'Copy Access Token',
      }
    },

    methods: {
      getProfile: function () {
        this.$liff.getProfile().then(profile => {
          this.profile = profile
        }).catch((error) => {
          alert('Error getting profile: ' + error)
        })
      },
      getAccessToken: function () {
        this.accessToken = this.$liff.getAccessToken()
      },
      onCopy: function () {
        this.textCopyButton = 'Copied!'
      }
    },

    beforeCreate () {
      this.$liff.init()
    },

    mounted () {
      setTimeout(() => {
        this.getProfile()
        this.getAccessToken()
      }, 1000)
    },
  }
</script>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
