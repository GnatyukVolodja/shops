<template>
  <div class="about flex-top mt-5" v-bind:class="{ dark_blue: dark }">
    <h1 class="text-center mt-5" >Про нас...</h1>
  </div>
</template>

<script lang="js">
export default {
  name: 'about',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {}
  },
  computed: {
    dark () {
      return this.$store.state.dark
    }
  },
  watch: {},
  created () {},
  methods: {},
  mounted () {
    if (getCookie('dark-theme') === 'on') {
      this.$store.state.dark = true
      $('#dark-theme-button').attr('checked', 'checked')
    }
    function getCookie (name) {
      const matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line
          '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
      ))
      return matches ? decodeURIComponent(matches[1]) : undefined
    }
  }
}

</script>
<style lang="sass">
.about
  height: 897px
  background: #ececec
</style>
