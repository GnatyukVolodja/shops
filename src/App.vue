<template>
  <div class="white_home" v-bind:class="{ dark_blue: dark }">
    <NavBar/>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer/>
  </div>
</template>

<script>

import Footer from './components/Footer'
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    Footer,
    NavBar
  },
  data () {
    return {}
  },
  methods: {},
  computed: {
    dark () {
      return this.$store.state.dark
    }
  }
}
</script>

<style lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity .5s

.fade-enter,
.fade-leave-to
  opacity: 0

.white_home
  background: #ececec

/*style scroll*/
::-webkit-scrollbar
  /* Let's get this party started*/
  width: 10px
  height: 10px

::-webkit-scrollbar-track
  /* Track*/
  /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);*/
  -webkit-border-radius: 10px
  border-radius: 10px

::-webkit-scrollbar-thumb
  /* Handle*/
  -webkit-border-radius: 10px
  border-radius: 10px
  background-color: grey
  /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);*/
  border: 1px solid transparent

  &:hover
    background-color: #4a4949

::-webkit-scrollbar
  width: 10px
  height: 10px
  background: transparent

::-webkit-scrollbar-button
  width: 0
  height: 0
  background: transparent

::-webkit-scrollbar-track, ::-webkit-scrollbar-track-piece
  width: 10px
  height: 10px
  background: transparent
</style>
