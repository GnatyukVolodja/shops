<template>

    <div class="registration">
      <div class="showCart test flex-top">
        <div class="row">
          <div class="col-12 box-shadow p-3 my-3" v-bind:class="{ dark_grey: dark }">
            <a class="close" href="javascript:void(0);" type="button" aria-label="Close" @click="showCartProduct">
              <span aria-hidden="true">&times;</span>
            </a>
            <form action="" method="post">
              <div class="row">
                <div class="col-md-6">
                  <strong class="ml-3">Ім'я:</strong>
                  <input id="firstName" class="form-control" name="Ім'я" v-model.trim="order.firstName" />
                </div>
                <div class="col-md-6">
                  <strong class="ml-3">Фамілія:</strong>
                  <input id="lastName" class="form-control" name="Фамілія" v-model.trim="order.lastName "/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <strong class="ml-3">Адреса:</strong>
                  <input id="address" class="form-control" name="Адреса" v-model.lazy="order.address" />
                </div>
                <div class="col-md-6">
                  <strong class="ml-3">Місто:</strong>
                  <input id="city" class="form-control" name="city" v-model.lazy="order.city" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <strong class="ml-3">Країна:</strong>
                  <select class="form-control" name="Країна" v-model="default_country" v-bind:class="{ dark_grey: dark }">
                    <option v-for="country in order.countrys" :key="country.value" :value="country.value">{{ country.value }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <strong class="ml-3">Поштовий код:</strong>
                  <input class="form-control" type="number" name="Поштовий код" v-model.number="order.zip"/>
                </div>
              </div>
              <div class="row boxes">
                <!--              <div class="">-->
                <span class="col-12 col-sm-12 col-md-4 text-center p-0">
                  <input class="mr-2" id="gift" type="checkbox" name="Упаковка"  :true-value="order.sendGift" :false-value="order.dontSendGift" v-model="order.gift"/>
                  <label for="gift">Потрібна упаковка?</label>
                </span>
                <span class="col-12 col-sm-6 col-md-4 text-center p-0">
                  <input class="mr-2" id="home" type="radio" :value="order.home" v-model="order.method" name="Доставка"/>
                  <label for="home">Доставка на домашній адрес</label>
                </span>
                <span class="col-12 col-sm-6 col-md-4 text-center p-0">
                  <input class="mr-2" id="business" type="radio" :value="order.business" v-model="order.method" name="Доставка"/>
                  <label for="business">Доставка на робочий адрес</label>
                </span>
                <span class="col-12 text-center"><b>Загальна сума замовлення: <span id="res">0</span> грн.</b></span>
                <!--              </div>-->
              </div>
              <div class="row">
                <div class="col-md-6 text-center mt-3">
                  <button class="submit btn btn-primary submit" type="submit" @click="backToProduct">До кошика</button>
                </div>
                <div class="col-md-6 text-center mt-3">
                  <button type="submit" class="submit btn btn-primary submit" @click="submitForm">Підтвердити замовлення</button>
                </div>
              </div>
              <div class="col-md-12 my-3">
                <p class="text-center"><strong>Дані для замовлення:</strong></p>
                <div class="row">
                  <div class="col-md-6">
                    <p class="text-left">
                      Ім'я: <b>{{ order.firstName }}</b><br>
                      Фамілія: <b>{{ order.lastName }}</b><br>
                      Адреса: <b>{{ order.address }}</b><br>
                      Місто: <b>{{ order.city }}</b>
                    </p>
                  </div>
                  <div class="col-md-6">
                    <p class="text-left">
                      Країна: <b>{{ default_country }}</b><br>
                      Поштовий код: <b>{{ order.zip }}</b><br>
                      Доставка: <b>{{ order.method }}</b><br>
                      Упаковка: <b>{{ order.gift }}</b>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="wrapper">
            <div v-if="isError">Помилка відправки...</div>
            <div v-else-if="isLoading">Відправка замовлення...</div>
            <div v-else>Підтвердіть відправку замовлення!</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="js">
export default {
  name: 'Registration',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      order: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        // state: '',
        countrys: [
          { value: 'Україна' },
          { value: 'Росія' },
          { value: 'Польша' },
          { value: 'Білорусія' }
        ],
        method: 'на домашній адрес',
        business: 'на робочий адрес',
        home: 'на домашній адрес',
        gift: 'так, потрібна упаковка',
        sendGift: 'так, потрібна упаковка',
        dontSendGift: 'ні, не потрібна упаковка'
      },
      default_country: 'Україна',
      isLoading: false,
      isError: false
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
    showCartProduct () {
      console.log('showCartProduct()')
      this.$store.state.store_showProduct = !this.$store.state.store_showProduct
      this.$store.state.store_showAllProduct = !this.$store.state.store_showAllProduct

      this.$emit('toggle', 'You clicked header 1')
    },
    backToProduct () {
      this.$store.state.store_showAllProduct = !this.$store.state.store_showAllProduct
    },
    async submitForm (e) {
      e.preventDefault()

      try {
        this.isLoading = true
        const { data } = await this.$http.patch(
          '/api/items/1',
          { name: 'something' }
        )
        console.log('ok=>', data)
      } catch (err) {
        this.isError = true
        console.log('err')
      } finally {
        this.isLoading = false
      }
      if (this.order.firstName && this.order.lastName && this.order.address && this.order.city) {
        this.$store.commit('carts')
        this.$store.state.store_buy_product = []
        this.$store.state.store_carts = []
        return true
      }
      for (let i = 0; i < 4; i++) {
        console.log(this.order[i])
      }
      if (!this.order.firstName) {
        $('#firstName').css('border', '1px solid red')
      } else {
        $('#firstName').css('border', '1px solid #ced4da')
      }
      if (!this.order.lastName) {
        $('#lastName').css('border', '1px solid red')
      } else {
        $('#lastName').css('border', '1px solid #ced4da')
      }
      if (!this.order.address) {
        $('#address').css('border', '1px solid red')
      } else {
        $('#address').css('border', '1px solid #ced4da')
      }
      if (!this.order.city) {
        $('#city').css('border', '1px solid red')
      } else {
        $('#city').css('border', '1px solid #ced4da')
      }

      e.preventDefault()

    }
  }
}

</script>
<style lang="sass" scoped></style>
