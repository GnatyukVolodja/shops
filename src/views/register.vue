<template>
  <div class="register flex-top mt-5"  v-bind:class="{ dark_blue: dark }">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12 mt-5">
          <h1 class="text-center ">Реєстрація</h1>
          <p class="text-center">
            <router-link to="/login">Вже зареєстровані?</router-link>
          </p>

          <ul class="error-messages  d-none">
            <li style="list-style: none">That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Ім'я" v-model="name">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Пошта" v-model="mail">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Пароль" v-model="password">
            </fieldset>
            <button @click="register" class="btn  btn-secondary mx-auto d-block my-3">Зареєструватися</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'register',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      name: '',
      mail: '',
      password: '',
      registration: []
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
    register () {}
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
.register
  height: 897px
  background: #ececec
</style>
