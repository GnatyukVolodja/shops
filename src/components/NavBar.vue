<template>
    <div class="NavBar">
      <div class="container-fluid header flex" v-bind:class="{ dark_blue: dark }">
        <div class="row container">

          <div class="col-3 col-sm-3 d-flex d-md-none pl-0 justify-content-start">
            <div class="menu-btn" v-bind:class="{ dark_blue: dark }" @click="burger()">
              <div class="menu-btn__burger"></div>
            </div>
            <div class="burger" @click="burgerList()">
                <ul class="list-unstyled m-0 p-3" v-bind:class="{ dark_blue: dark }">
                  <li class="text-center p-2"><router-link class="" to="/">Головна</router-link></li><hr class="m-0">
                  <li class="text-center p-2"><router-link class="" to="/about">Про нас</router-link></li><hr class="m-0">
                  <li class="text-center p-2"><router-link class="" to="/login">Логін</router-link></li><hr class="m-0">
                  <li class="text-center p-2"><router-link class="" to="/register">Реєстрація</router-link></li><hr class="m-0">
                  <li class="text-center p-2"><a class="" href="tel:+38050-000-0000"><i class='fas fa-phone-alt mx-2' style='font-size:16px; color: #007bff'></i>+38 (050) 000 00 00 </a></li>
                </ul>
            </div>
          </div>
          <div class="col-3 col-sm-3 col-md-1 col-lg-1 col-xl-1 py-3 flex logo"><i class='fab fa-vuejs'></i></div>
          <!--logo-->
          <div class="col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2 py-3 d-none d-lg-block site-name">
            <h2 class="siteName">{{siteName}}</h2>
          </div>
          <div id="nav" class="col-md-9 col-lg-7 col-xl-7 d-none d-md-flex flex py-4">
            <router-link class="mx-2" to="/">Головна</router-link>
            <router-link class="mx-2" to="/about">Про нас</router-link>
            <router-link class="mx-2" to="/login">Логін</router-link>
            <router-link class="mx-2" to="/register">Реєстрація</router-link>
            <a class="" href="tel:+38050-000-0000"><i class='fas fa-phone-alt mx-2' style='font-size:16px; color: #007bff'></i>+38 (050) 000 00 00 </a>
          </div>
          <!--site-name-->
          <div class="col-3 col-sm-3 col-md-1 col-lg-1 col-xl-1 py-3 cart flex">
            <span class="notify" v-show="notify">Кошик порожній</span>
            <span class="ml-2">{{ cartItemCount }}</span>
            <i class="fab fa-opencart" @click="showCartProduct" style="color: red !important;"></i>
          </div>
          <!--cart-->
          <div class="col-3 col-sm-3 col-md-1 col-lg-1 col-xl-1 py-3 pr-0 flex justify-content-end">
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="dark-theme-button" @click="darkTheme()">
              <label class="custom-control-label" for="dark-theme-button"></label>
            </div>
          </div>
          <!--switch-->
        </div>
      </div>
    </div>
</template>

<script lang="js">
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      siteName: 'Плиточка',
      notify: false
    }
  },
  computed: {
    cartItemCount: function () {
      return this.$store.state.store_carts.length || ''
    },
    dark () {
      return this.$store.state.dark
    }

  },
  watch: {},
  created () {},
  methods: {
    ...mapMutations([
      'greys',
      'darks'
    ]),
    ...mapActions([
      'greys',
      'darks'
    ]),
    showCartProduct () {
      this.$store.commit('showProduct')
      if (this.$store.state.store_carts.length) {
        this.$store.state.store_showProduct = false
        this.$store.state.store_showAllProduct = true
        setTimeout(() => $('#res').text(this.totalSum), 0)
        setTimeout(() => $('.showAllProduct.box-shadow').addClass('transition'), 0)
      } else {
        $('.notify').fadeIn('slow')
        setTimeout(() => $('.notify').fadeOut('slow'), 1000)
      }
    },
    darkTheme () {
      if (getCookie('dark-theme') === 'on') {
        this.greys({ status: 'off' })
        const date = new Date()
        date.setDate(date.getDate() + 365)
        setCookie('dark-theme', 'off', { path: '/', expires: date.toUTCString() })
      } else {
        this.darks({ status: 'on' })
        const date = new Date()
        date.setDate(date.getDate() + 365)
        setCookie('dark-theme', 'on', { path: '/', expires: date.toUTCString() })
      }
      function getCookie (name) {
        const matches = document.cookie.match(new RegExp(
          // eslint-disable-next-line
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
      }
      function setCookie (name, value, options) {
        options = options || {}
        let expires = options.expires
        if (typeof expires === 'number' && expires) {
          const d = new Date()
          d.setTime(d.getTime() + expires * 1000)
          expires = options.expires = d
        }
        if (expires && expires.toUTCString) {
          options.expires = expires.toUTCString()
        }
        value = encodeURIComponent(value)
        let updatedCookie = name + '=' + value
        for (const propName in options) {
          updatedCookie += '; ' + propName
          const propValue = options[propName]
          if (propValue !== true) {
            updatedCookie += '=' + propValue
          }
        }
        document.cookie = updatedCookie
      }
    },
    burger () {
      $('.menu-btn').toggleClass('open')
      $('.burger').slideToggle('slow')
    },
    burgerList () {
      $('.burger').each(function () {
        $(this).slideUp()
      })
      $('.menu-btn').removeClass('open')
    }
  },
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

#nav
  background: transparent !important

#nav a
  text-decoration: none

/*menu */
.burger a
  text-decoration: none !important

.burger
  display: none
  position: fixed
  top: 0
  left: 0
  background: #e1e1e1
  width: 100%
  z-index: 55554

/*burger*/
.menu-btn
  display: flex
  justify-content: center
  align-items: center
  width: 80px
  height: 80px
  cursor: pointer
  transition: all 0.5s ease-in-out
  z-index: 55555
  margin-left: -15px

.menu-btn__burger
  width: 50px
  height: 6px
  background-color: black
  border-radius: 5px
  box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2)
  transition: all 0.5s ease-in-out

.menu-btn__burger::before,
.menu-btn__burger::after
  content: ""
  position: absolute
  width: 50px
  height: 6px
  background: black
  border-radius: 5px
  box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2)
  transition: all 0.5s ease-in-out

.menu-btn__burger::before
  transform: translateY(-16px)

.menu-btn__burger::after
  transform: translateY(16px)

.menu-btn.open .menu-btn__burger
  transform: translateX(-50px)
  background: transparent
  box-shadow: none

.menu-btn.open .menu-btn__burger::before
  transform: rotate(45deg) translate(35px, -35px)

.menu-btn.open .menu-btn__burger::after
  transform: rotate(-45deg) translate(35px, 35px)

.dark_headers .menu-btn__burger,
.dark_headers .menu-btn__burger::before,
.dark_headers .menu-btn__burger::after
  background-color: white
/*end burger*/

.header
  position: fixed
  z-index: 555
  background: #ececec
  top: 0
  left: 0
  right: 0

  .custom-control.custom-switch
    margin-right: 8px

  .logo i
    font-size: 48px
    color: #28a745 !important

  .site-name h2
    font-family: cursive

  label
    cursor: pointer

  .custom-switch .custom-control-label::before
    width: 2.75rem

  .custom-switch .custom-control-input:checked ~ .custom-control-label::after
    background-color: #fff
    -webkit-transform: translateX(.75rem)
    transform: translateX(2rem)

  .custom-switch .custom-control-input:checked ~ .custom-control-label::after
    -webkit-transform: translateX(1.75rem)
    transform: translateX(1.75rem)

  .logo
    display: flex
    align-items: center
    justify-content: center
    flex-direction: row

  .cart
    padding: 15px
    color: red
    font-size: 15px
    font-weight: 700
    display: flex
    align-items: center
    justify-content: center

    i
      cursor: pointer
      font-size: 32px
      //padding: 32px 5px
      color: red

  .notify
    position: absolute
    bottom: 0
    width: 128px
    margin: 0 auto

/*dark theme*/
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
/*end dark theme*/

</style>


