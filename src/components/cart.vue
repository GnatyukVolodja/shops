<template>
  <div class="cart ">
    <div class="showAllProduct test flex-top">
      <div class="row">
        <div class="col-12 box-shadow p-3 my-3" v-bind:class="{ dark_grey: dark }">

          <div class="row">
            <b class="col-3 col-sm-6 text-center">Товар</b>
            <b class="col-3 col-sm-2 text-center">Кількість</b>
            <b class="col-3 col-sm-2 text-center">Ціна</b>
            <b class="col-3 col-sm-2 text-center">Сума</b>
          </div>

          <div v-for="prod in buy_product" :key="prod.id">
            <div class="row my-2 product" style="position: relative" :data-id="prod.id">
              <a class="close" href="javascript:void(0);" type="button" aria-label="Close" @click="removeProduct(prod.id)" >
                <span aria-hidden="true">&times;</span>
              </a>
              <div class="col-6 col-sm-3 p-1 p-sm-0 flex mx-auto">
                <figure>
                  <img class="w-75" :src="require('@/assets/' + prod.image)" :alt="prod.title"/>
                </figure>
              </div>
              <div class="col-12 col-sm-3 p-1 p-sm-0 flex text-center">
                <p class="m-0" v-html="prod.description"></p>
              </div>
              <div class="col-6 col-sm-2 p-1 p-sm-0 px-0 flex text-center">
                <button type="button" class="btn btn-success" v-bind:disabled="cartCount(prod.id) === prod.availableInventory" @click="addCartItem(prod)" style="width: 25px; height: 25px; padding: 0">+</button>
                <span class="mx-1">{{cartCount(prod.id)}} шт</span>
                <button type="button" class="btn btn-success" v-bind:disabled="cartCount(prod.id) === 0" @click="removeCartItem(prod)" style="width: 25px; height: 25px; padding: 0">-</button>
              </div>
              <div class="col-3 col-sm-2 p-1 p-sm-0 flex">
                {{ prod.price }} грн
              </div>
              <div class="col-3 col-sm-2 p-1 p-sm-0 flex">
                <span class="counts">{{cartCount(prod.id) * prod.price}}</span> грн.
              </div>
            </div><hr v-bind:class="{ dark_grey: dark }">
          </div>

          <div class="row">
            <div class="col-sm-6 text-center mt-3">
              <button class="submit btn btn-primary submit" type="button"  @click="showCartProduct">Продовжити покупки</button>
            </div>
            <div class="col-sm-6 text-center mt-3">
              <button class="submit btn btn-primary submit" type="button" v-bind:disabled="cart.length === 0" @click="showCheckout">Оформити замовлення</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      buy_product: [],

    }
  },
  computed: {
    dark () {
      return this.$store.state.dark
    }
  },
  watch: {},
  created () {},
  methods: {}
}
</script>

<style scoped>

</style>
