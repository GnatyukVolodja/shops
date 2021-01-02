<template>
  <div class="login flex-top mt-5" v-bind:class="{ dark_blue: dark }">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12 mt-5">
          <h1 class="text-center">Увійти</h1>
          <p class="text-center">
            <router-link to="/register">Потрібний інший акаунт ?</router-link>
          </p>
          <form>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button @click="login" class="btn btn-secondary mx-auto d-block my-3">Вхід</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'login',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      email: '',
      password: '',
      logins: []
    }
  },
  computed: {
    dark () {
      return this.$store.state.dark
    }
  },
  watch: {},
  created () {},
  methods: {
    login () {}
  },
  mounted () {
    if (getCookie('dark-theme') === 'on') {
      this.$store.state.dark = true
      // eslint-disable-next-line
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
.login
  height: 897px
  background: #ececec
</style>
