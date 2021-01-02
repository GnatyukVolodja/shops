<template>
  <div class="footer w-100">
    <div class="flex  icons mx-auto w-100" v-bind:class="{ dark_blue: dark }">
      <i class='fab py-4 fa-facebook-square mx-3'></i>
      <i class='fab py-4 fa-instagram mx-3'></i>
      <i class='fab py-4 fa-linkedin mx-3'></i>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'Footer',
  components: {},
  mixins: [],
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

  }
}

</script>
<style lang="sass">
*
  box-sizing: border-box

.flex
  display: flex
  align-items: center
  justify-content: center

.flex-left
  display: flex
  align-items: center
  justify-content: flex-start

.flex-right
  display: flex
  align-items: center
  justify-content: flex-end

.flex-top
  display: flex
  align-items: flex-start
  justify-content: center

.flex-bottom
  display: flex
  align-items: flex-end
  justify-content: center

.footer
  background: red

  .icons
    background: #ececec

  i
    color: #007bff
    cursor: pointer
    font-size: 24px

.dark_blue
  background: #152036 !important
  color: white !important

  i:hover
    background: #152036 !important
    color: white !important

.dark_grey
  background: #1b2a47 !important
  color: white

  select, option, #clear-filter
    color: white !important
    font-weight: 300
    opacity: 1

  p, label
    color: white

  .page-link
    background: #1b2a47 !important
    border: 2px solid #152036 !important

</style>
