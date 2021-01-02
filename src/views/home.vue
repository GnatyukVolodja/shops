<template>
  <div id="page-home" v-bind:class="{ dark_blue: dark }">

    <div id="main" class="container" v-bind:class="{ dark_blue: dark }">
      <div class="row" v-if="store_showProduct" :key="store_showProduct">

        <div class="col-12">
          <ul id="lightSlider" class="mb-3 nav">
            <li class="nav-item" v-for="product in array" :key="product.id" style="width: 10vw">
              <img style="width: 100%; height: auto" :src="require('@/assets/' + product.image)" :alt="product.title"/>
            </li>
          </ul>
        </div>
        <!--lightSlider-->

        <div class="col-12">
          <div class="row sort no-gutters p-3" v-bind:class="{ dark_grey: dark }">
            <div class="col-12 col-sm-4 col-lg-3">
              <select class="form-control select_sort" v-model="default_selected" @change="(default_selected)" v-bind:class="{ dark_grey: dark }">
                <option v-for="option in sort.options" :key="option.key" :value="option.key">{{ option.value }}</option>
              </select>
            </div>
            <div class="col-12 col-sm-4 col-lg-6 py-2 flex">
              <a v-show="clearFilter" id="clear-filter" class="close" href="javascript:void(0);" type="button" aria-label="Close" @click="clearFilters()">Очистити всі фільтри
                <span aria-hidden="true">&times;</span>
              </a>
            </div>
            <div class="col-12 col-sm-4 col-lg-3 ">
              <select class="form-control select_count" :data-perPage="perPage" v-model="perPage" @change="(perPage)"  @click="setPages()" v-bind:class="{ dark_grey: dark }">
                <option v-for="n  in counts "  :key="n" :value="n">Товарів на сторінку: {{ n }}</option>
              </select>
            </div>
          </div>
        </div><!--sort-->

        <div class="col-12 col-sm-5 col-md-4 col-lg-3 pr-0">
          <div class="w-100 filter mt-3 p-3" v-bind:class="{ dark_grey: dark }">
            <label for="range-price" style="cursor: auto">Ціна:</label>
            <input type="text" id="range-price" class="js-range-slider mt-2" name="my_range" value="" style="cursor: pointer"/>
          </div>
          <div class="w-100 filter mt-3 p-3" v-bind:class="{ dark_grey: dark }">
            <p>Країна:</p>
            <div class="filter-item" v-for="(filterCountry, index) in filterCountrys" :key="filterCountry">
              <input type="checkbox" :id="index + 1" v-model="selectCountry" class="mx-0 mr-2 country-checkbox" name="country" :value="filterCountry.country" @change="setCountry(filterCountry.country, index + 1)"/>
              <img class="text-right mr-2" style="width: 25px; height: auto" :src="require('@/assets/' + filterCountry.flag)" :alt="filterCountry.title"/>
              <label class="mb-0 " :for="index + 1">{{ filterCountry.country }}</label><br>
            </div>
          </div>
          <div class="w-100 filter mt-3 p-3" v-bind:class="{ dark_grey: dark }">
            <p>Бренд:</p>
            <div class="filter-item" v-for="(filterBrand, index) in filterBrands"  :key="filterBrand">
              <input type="checkbox" :id="index + 5" v-model="selectBrand" class="mx-0 mr-2 brand-checkbox" name="brand" :value="filterBrand.brand" @change="setBrand(filterBrand.brand, index + 5)"/>
<!--              <img class="text-right mr-2" style="width: 60px; height: auto" :src="require('@/assets/' + filterBrand.brand)" :alt="filterBrand.title"/>-->
              <label class="mb-0 " :for="index + 5">{{ filterBrand.brand }}</label><br>
            </div>
          </div>
        </div><!--filter-->

        <div class="col-12 col-sm-7 col-md-8 col-lg-9 d-flex flex-wrap pl-0">
            <div class="mt-3 product col-12 col-sm-12 col-md-6 col-lg-4" v-for="product in sortedProducts(default_selected)" :key="product.id" :data-id="product.id">
              <div class="col-12 p-0 product-img" >
                <figure class="scale">
                  <img style="width: 100%; height: auto" :src="require('@/assets/' + product.image)" @click="addToModal(product)" data-toggle="modal" data-target="#exampleModal" :alt="product.title"/>
                </figure>
              </div>
              <div class="col-12 p-3 product-info" v-bind:class="{ dark_grey: dark }">

                <div class="row w-100 no-gutters" >
                  <div class="col-5 float-left text-left">
                     <span v-for="n in 5" :key="n">
                         <i class="fas fa-star" style="font-size:12px" :class="{'rating-active': checkRating(n, product)}"></i>
                     </span>
                  </div>
                  <div class="col-7 float-right text-right">
                    <img style="width: 25px; height: auto" :src="require('@/assets/' + product.flag)" :alt="product.title"/> {{ product.country }}
                  </div>
                </div>
                <h6 class="text-center" v-text="product.title"></h6>
                <p class="m-0">
                  <span class="text-center" v-if="product.availableInventory - cartCount(product.id) &gt;= 10">В наявності: <b> {{ product.availableInventory - cartCount(product.id) }}</b> шт.</span>
                  <span class="text-center text-danger" v-else-if="product.availableInventory - cartCount(product.id) &lt; 10 &amp;&amp; product.availableInventory - cartCount(product.id) &gt;= 1">Закінчується: <b> {{ product.availableInventory - cartCount(product.id) }}</b> шт.</span>
                  <span class="text-center" v-else></span>
                </p>
                <p class="m-0">
                  <span class="price ml-3">Ціна:<b class="ml-1">{{ product.price }}</b> грн/шт.</span>
                </p>
                <button class="btn bg-success text-white addToCart mt-3" @click="addToCart(product)" v-if="canAddToCart(product)">Купити</button>
                <button class="btn bg-warning text-white addToCart mt-3" disabled="disabled" v-else>Товар закінчився</button>
              </div>
          </div>
        </div>

        <nav class="nav mx-auto">
          <ul class="pagination mt-3" v-bind:class="{ dark_grey: dark }">
            <li class="page-item">
              <button type="button" id="previous" class="page-link" @click="back()"> Попередня </button>
            </li>
            <li class="page-item" v-for="pageNumber in pages" :key="pageNumber" >
              <button type="button" class="page-link item" :data-pagenumber="pageNumber" :data-page="page" @click="currentPage(pageNumber)"> {{pageNumber}} </button>
            </li>
            <li class="page-item">
              <button type="button" id="next" @click="next()" class="page-link"> Наступна </button>
            </li>
          </ul>
        </nav><!--pagination-->

      </div>
      <Cart v-else-if="store_showAllProduct" :key="store_showAllProduct" v-on:toggle="toggleHeader()" />
      <Registration v-else v-on:toggle="toggleHeader()" />
      <a href="#" class="back-to-top" @click="scroll()">
        <i class="material-icons" v-bind:class="{ dark_grey: dark }" style="font-size: 48px; color:red !important;">keyboard_arrow_up</i>
      </a>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog  modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header" v-bind:class="{ dark_blue: dark }">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"  v-bind:class="{ dark_blue: dark }">
              <div class="row product d-flex flex-column flex-md-row "  v-for="product in productModal" :key="product.id" :data-id="product.id" >
                <div class="col-12 col-md-8 col-lg-5 product-img mx-auto">
                  <figure class="m-0 flex">
                    <img style="width: 100%; height: auto" :src="require('@/assets/' + product.image)" data-toggle="modal" data-target="#exampleModal" :alt="product.title"/>
                  </figure>
                </div>
                <div class="col-12 col-md-12 col-lg-7 product-info">
                  <p class="text-right">
                    <img style="width: 25px; height: auto" :src="require('@/assets/' + product.flag)" :alt="product.title"/> {{ product.country }}
                  </p>
                  <h3 class="text-center" v-text="product.title"></h3>
                  <p class="text-center" v-html="product.description"></p>
                  <p class="text-center">
                    <span class="message" v-if="product.availableInventory - cartCount(product.id) &gt;= 10">В наявності: <b> {{ product.availableInventory - cartCount(product.id) }}</b> шт.</span>
                    <span class="message text-danger" v-else-if="product.availableInventory - cartCount(product.id) &lt; 10 &amp;&amp; product.availableInventory - cartCount(product.id) &gt;= 1">Закінчується: <b> {{ product.availableInventory - cartCount(product.id) }}</b> шт.</span>
                    <span class="message" v-else></span>
                    <span class="price ml-3">Ціна:<b class="ml-1">{{ product.price }}</b> грн/шт.</span>
                  </p>
                  <p class="text-center">
                    <button class="btn bg-success text-white addToCart mt-3 mx-auto" @click="addToCart(product)" v-if="canAddToCart(product)">Купити</button>
                    <button class="btn bg-warning text-white addToCart mt-3 mx-auto" disabled="disabled" v-else>Товар закінчився</button>
                  </p>
                  <div class="rating text-right">
                   <span v-for="n in 5" :key="n">
                       <i class="fas fa-star" style="font-size:12px" :class="{'rating-active': checkRating(n, product)}"></i>
                   </span>
                  </div>
                </div>
              </div>
          </div>
          <div class="modal-footer flex"  v-bind:class="{ dark_blue: dark }">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрити</button>
              <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="showCartProduct" v-bind:disabled="cart.length <= 0">Перейти до кошика</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="js">
import { mapState, mapGetters } from 'vuex'
import Registration from '../components/registration'
import Cart from '../components/cart'

export default {
  name: 'home',
  components: {
    Registration,
    Cart
  },
  data () {
    return {
      default_selected: 'min_max',
      selectCountry: [],
      selectBrand: [],
      buy_product: [],
      totalSum: 0,
      counts: [],
      sort: {
        options: [
          { value: 'Сортувати за назвою', key: 'title' },
          { value: 'Сортувати за рейтингом', key: 'rating' },
          { value: 'Сортувати за новизною', key: 'id' },
          { value: 'Сортувати за ціною: від вищої до нижчої ', key: 'max_min' },
          { value: 'Сортувати за ціною: від нижчої до вищої ', key: 'min_max' }
        ]
      },
      array: [
        {
          id: 1001,
          title: 'Керамічна плитка Paradyz',
          description: 'Antonella Brown Wood, <b><em>Paradyz</em></b>, глянцева стінова 30×60 см',
          price: 250,
          image: 'img/tiles_10.jpg',
          availableInventory: 15,
          rating: 5,
          country: 'Україна',
          flag: 'img/UA.png',
          brand: 'Paradyz',
          brandUrl: 'img/Paradyz.png'
        },
        {
          id: 1004,
          title: 'Керамічна плитка Tubadzin',
          description: 'Antonella Bianco Inserto, <b><em>Tubadzin</em></b>, декор 30×60 см',
          price: 274,
          image: 'img/tiles_7.jpg',
          availableInventory: 15,
          rating: 3,
          country: 'Росія',
          flag: 'img/RU.png',
          brand: 'Tubadzin',
          brandUrl: 'img/Tubadzin.png'

        },
        {
          id: 1003,
          title: 'Керамічна плитка Stargres',
          description: 'Antonella Brown Wood, <b><em>Stargres</em></b>, глянцева стінова 30×60 см',
          price: 474,
          image: 'img/tiles_8.jpg',
          availableInventory: 7,
          rating: 4,
          country: 'Білорусія',
          flag: 'img/BY.png',
          brand: 'Stargres',
          brandUrl: 'img/Stargres.png'

        },
        {
          id: 1002,
          title: 'Керамічна плитка Cerrad',
          description: 'Antonella Bianco Inserto, <b><em>Cerrad</em></b>, декор 30×60 см',
          price: 350,
          image: 'img/tiles_9.jpg',
          availableInventory: 55,
          rating: 2,
          country: 'Польша',
          flag: 'img/PL.png',
          brand: 'Cerrad',
          brandUrl: 'img/Cerrad.png'

        },
        {
          id: 1005,
          title: 'Керамічна плитка Cerrad',
          description: 'Antonella Bianco inferno, <b><em>Cerrad</em></b>, декор 30×60 см',
          price: 500,
          image: 'img/tiles_10.jpg',
          availableInventory: 16,
          rating: 1,
          country: 'Україна',
          flag: 'img/UA.png',
          brand: 'Cerrad',
          brandUrl: 'img/Cerrad.png'

        },
        {
          id: 1006,
          title: 'Керамічна плитка Paradyz',
          description: 'Antonella Brown Wood, <b><em>Paradyz</em></b>, глянцева стінова 30×60 см',
          price: 750,
          image: 'img/tiles_11.jpg',
          availableInventory: 15,
          rating: 5,
          country: 'Росія',
          flag: 'img/RU.png',
          brand: 'Paradyz',
          brandUrl: 'img/Paradyz.png'

        },
        // },
        {
          id: 1007,
          title: 'Керамічна плитка Tubadzin',
          description: 'Antonella Bianco Inserto, <b><em>Tubadzin</em></b>, декор 30×60 см',
          price: 874,
          image: 'img/tiles_12.jpg',
          availableInventory: 15,
          rating: 3,
          country: 'Білорусія',
          flag: 'img/BY.png',
          brand: 'Tubadzin',
          brandUrl: 'img/Tubadzin.png'

        },
        {
          id: 1008,
          title: 'Керамічна плитка Stargres',
          description: 'Antonella Brown Wood, <b><em>Stargres</em></b>, глянцева стінова 30×60 см',
          price: 974,
          image: 'img/tiles_13.jpg',
          availableInventory: 7,
          rating: 4,
          country: 'Польша',
          flag: 'img/PL.png',
          brand: 'Stargres',
          brandUrl: 'img/Stargres.png'

        },
        {
          id: 1009,
          title: 'Керамічна плитка Cerrad',
          description: 'Antonella Bianco Inserto, <b><em>Cerrad</em></b>, декор 30×60 см',
          price: 1000,
          image: 'img/tiles_14.jpg',
          availableInventory: 55,
          rating: 2,
          country: 'Україна',
          flag: 'img/UA.png',
          brand: 'Cerrad',
          brandUrl: 'img/Cerrad.png'

        },
        {
          id: 1010,
          title: 'Керамічна плитка Cerrad',
          description: 'Antonella Bianco inferno, <b><em>Cerrad</em></b>, декор 30×60 см',
          price: 500,
          image: 'img/tiles_14.jpg',
          availableInventory: 0,
          rating: 1,
          country: 'Росія',
          flag: 'img/RU.png',
          brand: 'Cerrad',
          brandUrl: 'img/Cerrad.png'

        }
      ],
      products: [],
      cart: [],
      page: 1,
      perPage: 6,
      pages: [],
      data_from: '',
      data_to: '',
      minPrice: '',
      maxPrice: '',
      filterProduct: [],
      filterCountrys: [],
      filterBrands: [],
      resCountCountry: [],
      resCountBrand: [],
      clearFilter: false,
      ua: [],
      ru: [],
      by: [],
      pl: [],
      paradyz: [],
      tubadzin: [],
      stargres: [],
      cerrad: [],
      productModal: []
    }
  },
  methods: {
    toggleHeader (x) {
      setTimeout(() => this.slider(), 0)
      setTimeout(() => this.rangeSlider(), 0)
      console.log('x=>')
    },
    // lang_ua () {
    //     this.uas = true;
    //     this.rus = false;
    // },
    // lang_ru () {
    //     this.uas = false;
    //     this.rus = true;
    // },
    // burger (product) {
    //   this.productModal = []
    //   this.productModal.push(product)
    //   console.log(product)
    // },
    addToModal (product) {
      this.productModal = []
      this.productModal.push(product)
      console.log(product)
    },
    back () {
      // console.log('back ()')
      this.page--
      if (this.page === 1) {
        $('#previous').attr('disabled', true)
      } else {
        $('#previous').removeAttr('disabled')
      }
      if (this.page >= 1) {
        $('#next').removeAttr('disabled')
      }
      this.activePage()
    },
    next () {
      // console.log('next ()')
      this.page++
      if (this.page === this.pages.length) {
        $('#next').attr('disabled', true)
      } else {
        $('#next').attr('disabled', false)
      }
      if (this.page >= 1) {
        $('#previous').removeAttr('disabled')
      }
      this.activePage()
    },
    currentPage (pageNumber) {
      // console.log('currentPage (pageNumber) ==>', pageNumber)
      this.page = pageNumber
      if (this.page > 1) {
        $('#previous').removeAttr('disabled')
      }
      if (this.page === 1) {
        $('#previous').attr('disabled', true)
      }
      if (this.pages.length === this.page) {
        $('#next').attr('disabled', true)
      }
      if (this.pages.length > this.page) {
        $('#next').removeAttr('disabled')
      }
      this.activePage()
    },
    activePage () {
      // console.log('activePage ()')
      const c = this.page
      $('.item').each(function () {
        $(this).removeClass('active')
        if ($(this).data('pagenumber') === c) {
          $(this).addClass('active')
        }
      })
    },
    setPages () {
      this.pages = []
      for (let i = 1; i <= Math.ceil(this.products.length / this.perPage); i++) {
        this.pages.push(i)
      }
      this.sortedProducts()
    },
    scroll () {
      // console.log('scroll ()')
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow')
        } else {
          $('.back-to-top').fadeOut('slow')
        }
      })
      $('body').on('click', '.back-to-top', function () {
        $('html, body, #app').animate({
          scrollTop: 0
        }, 1500)
        return false
      })
    },
    paginate (posts) {
      // console.log('paginate (posts)', posts)
      const page = this.page // 1
      const perPage = this.perPage // 10
      const from = (page * perPage) - perPage // (1 * 10) - 10 = 0
      const to = (page * perPage) // 1 * 10 = 10
      return posts.slice(from, to) // 0, 10
    },
    addToCart (aProduct) {
      this.$store.commit('carts')
      this.$store.state.store_carts.push(aProduct.id)
      this.cart = this.$store.state.store_carts

      this.$store.state.store_buy_product.push(aProduct)
      this.buy_product = this.$store.state.store_buy_product

      const resArr = []
      this.$store.state.store_buy_product.filter(function (item) {
        const i = resArr.findIndex(x => (x.id === item.id))
        if (i <= -1) {
          resArr.push(item)
        }
        return null
      })
      this.buy_product = resArr
    },
    addCartItem (add) {
      this.cart.push(add.id)
    },
    removeCartItem (rem) {
      const index = this.cart.indexOf(rem.id)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    },
    showCheckout () {
      // console.log('showCheckout()')
      this.$store.state.store_showAllProduct = !this.$store.state.store_showAllProduct
      console.log(this.cart)
      let sum = 0
      $('.counts').each(function () {
        sum += Number($(this).text())
      })
      this.totalSum = sum
      setTimeout(() => $('#res').text(this.totalSum), 0)
    },
    removeProduct (prodId) {
      // console.log('removeProduct(prod_id) ==>', prod_id)
      setTimeout(() => this.rangeSlider(), 0)
      setTimeout(() => this.slider(), 0)
      this.$store.commit('removeProduct')

      this.cart = this.$store.state.store_carts.filter(item => item !== prodId)
      this.$store.state.store_carts = this.cart
      console.log(this.cart)
      this.buy_product = this.$store.state.store_buy_product.filter(n => n.id !== prodId)
      this.$store.state.store_buy_product = this.buy_product
      console.log(this.buy_product)

      if (!this.$store.state.store_carts.length) {
        this.$store.state.store_showProduct = true
        this.$store.state.store_showAllProduct = false
      }
    },
    showCartProduct (x) {
      this.$store.state.store_showProduct = !this.$store.state.store_showProduct
      this.$store.state.store_showAllProduct = !this.$store.state.store_showAllProduct
      setTimeout(() => $('#res').text(this.totalSum), 0)
      setTimeout(() => this.slider(), 0)
      setTimeout(() => this.rangeSlider(), 0)
    },
    checkRating (n, myProduct) {
      // console.log('checkRating(n, myProduct) ==>', n, myProduct)
      return myProduct.rating - n >= 0
    },
    canAddToCart (aProduct) {
      // console.log('canAddToCart(aProduct) ==>', aProduct)
      return aProduct.availableInventory > this.cartCount(aProduct.id)
    },
    cartCount (id) {
      // console.log('cartCount(id) ==>', id)
      let count = 0
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++
        }
      }
      return count
    },
    sortedProducts (c) {
      // console.log('sortedProducts(c) ==>', c)
      if (c === 'max_min' || c === 'min_max' || c === 'rating' || c === 'title' || c === 'id') {
        // eslint-disable-next-line
        function compare (a, b) {
          if (c === 'max_min') {
            if (a.price < b.price) return 1
            if (a.price > b.price) return -1
            return 0
          } else if (c === 'min_max') {
            // console.log("el =>", c);
            // console.log("a.price =>", a.price);
            if (a.price < b.price) return -1
            if (a.price > b.price) return 1
            return 0
          } else if (c === 'rating') {
            if (a.rating < b.rating) return 1
            if (a.rating > b.rating) return -1
            return 0
          } else if (c === 'title') {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
            return 0
          } else if (c === 'id') {
            if (a.id < b.id) return -1
            if (a.id > b.id) return 1
            return 0
          }
        }
        this.products = this.products.sort(compare)
      }

      return this.paginate(this.products)
      // }
    },
    slider () {
      // console.log('slider()')
      $('#lightSlider').lightSlider({
        item: 7,
        // autoWidth: true,
        slideMove: 1,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        loop: true,
        auto: true,
        speed: 2000,
        pause: 4000,
        cssEasing: 'ease',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              item: 6
            }
          },
          {
            breakpoint: 992,
            settings: {
              item: 5
            }
          },
          {
            breakpoint: 768,
            settings: {
              item: 4
            }
          },
          {
            breakpoint: 575,
            settings: {
              item: 3
            }
          }
        ]
      })
    },
    loadCountry () {
      this.filterCountrys = this.array.reduce((acc, cur) => [...acc.filter((obj) => obj.country !== cur.country), cur], []) // unic count
      console.log(this.filterCountrys)
    },
    loadBrand () {
      this.filterBrands = this.array.reduce((acc, cur) => [...acc.filter((obj) => obj.brand !== cur.brand), cur], []) // unic count
      console.log(this.filterBrands)
    },
    setCountry (country, id) {
      this.clearFilter = true
      this.array.filter((item) => {
        if (item.country === country && id === 3) {
          if (this.selectCountry.includes('Україна')) {
            this.ua.push(item)
            this.ua = this.ua.reduce((acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur], [])
            this.products = this.resCountCountry.concat(this.ua, this.ru, this.pl, this.by)
          } else {
            this.ua = []
            if (this.selectCountry.length === 0) {
              this.products = this.array
            } else {
              this.products = this.resCountCountry.concat(this.ua, this.ru, this.pl, this.by)
            }
          }
        }
        if (item.country === country && id === 4) {
          if (this.selectCountry.includes('Росія')) {
            this.ru.push(item)
            this.ru = this.ru.reduce((acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur], [])
            this.products = this.resCountCountry.concat(this.ua, this.ru, this.pl, this.by)
          } else {
            this.ru = []
            if (this.selectCountry.length === 0) {
              this.products = this.array
            } else {
              this.products = this.resCountCountry.concat(this.ua, this.ru, this.pl, this.by)
            }
          }
        }

        if (item.country === country && id === 1) {
          if (this.selectCountry.includes('Білорусія')) {
            this.by.push(item)
            this.by = this.by.reduce((acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur], [])
            this.products = this.resCountCountry.concat(this.ua, this.ru, this.pl, this.by)
          } else {
            this.by = []
            if (this.selectCountry.length === 0) {
              this.products = this.array
            } else {
              this.products = this.resCountCountry.concat(this.ua, this.ru, this.pl, this.by)
            }
          }
        }

        if (item.country === country && id === 2) {
          if (this.selectCountry.includes('Польша')) {
            this.pl.push(item)
            this.pl = this.pl.reduce((acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur], [])
            this.products = this.resCountCountry.concat(this.ua, this.ru, this.pl, this.by)
          } else {
            this.pl = []
            if (this.selectCountry.length === 0) {
              this.products = this.array
            } else {
              this.products = this.resCountCountry.concat(this.ua, this.ru, this.pl, this.by)
            }
          }
        }
      })

      console.log(this.products)

      if (this.selectCountry.length === 0) this.clearFilter = false

      this.setPages()
    },
    setBrand (brand, id) {
      this.clearFilter = true
      this.array.filter((item) => {
        if (item.brand === brand && id === 5) {
          if (this.selectBrand.includes('Paradyz')) {
            this.paradyz.push(item)
            this.paradyz = this.paradyz.reduce((acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur], [])
            this.products = this.resCountBrand.concat(this.paradyz, this.tubadzin, this.stargres, this.cerrad)
          } else {
            this.paradyz = []
            if (this.selectBrand.length === 0) {
              this.products = this.array
            } else {
              this.products = this.resCountBrand.concat(this.paradyz, this.tubadzin, this.stargres, this.cerrad)
            }
          }
        }
        if (item.brand === brand && id === 6) {
          if (this.selectBrand.includes('Tubadzin')) {
            this.tubadzin.push(item)
            this.tubadzin = this.tubadzin.reduce((acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur], [])
            this.products = this.resCountBrand.concat(this.paradyz, this.tubadzin, this.stargres, this.cerrad)
          } else {
            this.tubadzin = []
            if (this.selectBrand.length === 0) {
              this.products = this.array
            } else {
              this.products = this.resCountBrand.concat(this.paradyz, this.tubadzin, this.stargres, this.cerrad)
            }
          }
        }

        if (item.brand === brand && id === 7) {
          if (this.selectBrand.includes('Stargres')) {
            this.stargres.push(item)
            this.stargres = this.stargres.reduce((acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur], [])
            this.products = this.resCountBrand.concat(this.paradyz, this.tubadzin, this.stargres, this.cerrad)
          } else {
            this.stargres = []
            if (this.selectBrand.length === 0) {
              this.products = this.array
            } else {
              this.products = this.resCountBrand.concat(this.paradyz, this.tubadzin, this.stargres, this.cerrad)
            }
          }
        }

        if (item.brand === brand && id === 8) {
          if (this.selectBrand.includes('Cerrad')) {
            this.cerrad.push(item)
            this.cerrad = this.cerrad.reduce((acc, cur) => [...acc.filter((obj) => obj.id !== cur.id), cur], [])
            this.products = this.resCountBrand.concat(this.paradyz, this.tubadzin, this.stargres, this.cerrad)
          } else {
            this.cerrad = []
            if (this.selectBrand.length === 0) {
              this.products = this.array
            } else {
              this.products = this.resCountBrand.concat(this.paradyz, this.tubadzin, this.stargres, this.cerrad)
            }
          }
        }
      })

      console.log(this.products)

      if (this.selectBrand.length === 0) this.clearFilter = false

      this.setPages()
    },
    changeRangeSlider (a, b) {
      // console.log('changeRangeSlider()')

      if (this.clearFilter) {
        this.clearFilter = true
      } else if (this.data_from === this.minPrice || this.data_to === this.maxPrice) {
        this.clearFilter = false
      }

      $('#clear-filter').fadeIn('slow')
      this.filterProduct = []
      const sortArray = this.array.map(num => {
        if (num.price >= a && num.price <= b) return num
      })
      for (let i = 0; i < sortArray.length; i++) {
        if (sortArray[i]) {
          this.filterProduct.push(sortArray[i])
        }
      }
      this.products = this.filterProduct
      this.setPages()
    },
    clearFilters () {
      // console.log('clearFilters()')
      this.clearFilter = false
      $('#clear-filter').fadeOut('slow')
      this.filterProduct = []
      this.products = this.array
      // this.rangeFilterProduct = true;
      // this.rangeFilterProducts = false;
      const resetSlider = $('.js-range-slider').data('ionRangeSlider')
      resetSlider.reset()

      this.selectCountry = []
      this.selectBrand = []
      this.ua = []
      this.ru = []
      this.by = []
      this.pl = []
      this.paradyz = []
      this.tubadzin = []
      this.stargres = []
      this.cerrad = []

      this.setPages()
    },
    rangeSlider () {
      // console.log('rangeSlider()')
      const filteredArray = this.products.map(function (val) {
        return val.price
      })
      const minValue = Function.prototype.apply.bind(Math.min, null)
      this.minPrice = minValue(filteredArray)
      const maxValue = Function.prototype.apply.bind(Math.max, null)
      this.maxPrice = maxValue(filteredArray)

      $('.js-range-slider').ionRangeSlider({
        type: 'double',
        min: this.minPrice,
        max: this.maxPrice,
        from: this.minPrice,
        to: this.maxPrice,
        grid: true,
        step: 50,
        skin: 'big',
        onFinish: (data) => {
          this.data_from = data.from
          this.data_to = data.to
          this.changeRangeSlider(data.from, data.to)
        }
      })
    }
  },
  computed: {

    ...mapState([
      'dark',
      'store_showAllProduct',
      'store_showProduct'
    ]),
    ...mapGetters([
      'cartItemCount'
    ])

  },
  created () {
    // console.log('created()')
  },
  mounted () {
    if (getCookie('dark-theme') === 'on') {
      this.$store.commit('darks')
      $('#dark-theme-button').attr('checked', 'checked')
    }
    function getCookie (name) {
      const matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line
          '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
      ))
      return matches ? decodeURIComponent(matches[1]) : undefined
    }
    this.buy_product = this.$store.state.store_buy_product
    this.products = this.array

    $('#previous').attr('disabled', true)
    for (let i = 2; i <= 12; i++) {
      if (i % 3 === 0) {
        this.counts.push(i)
      }
    }
    this.rangeSlider()
    this.slider()
    this.scroll()
    this.loadCountry()
    this.loadBrand()
    this.setPages()
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

#page-home
  background: #ececec

  #lightSlider
    height: auto !important

  #nav
    background: #ececec
    //background: #ececec

  #main
    //background: #ececec
    margin-top: 80px
    position: relative

    .showCart, .showAllProduct
      min-height: 817px

    .showCart.box-shadow, .showAllProduct.box-shadow
      opacity: 0

    #lightSlider h6
      position: absolute
      bottom: 0
      display: block !important
      width: 150px
      font-size: 14px

    .lSSlideOuter .lSPager
      display: none !important

    .pagination .active
      color: red

    .filter
      //border: 2px solid #e1e1e1
      background: #e1e1e1
      color: #007bff

      .irs.irs--big.js-irs-0.irs-with-grid, .irs-handle.from, .irs-handle.to
        cursor: pointer

      .filter-item
        display: flex
        align-items: center
        margin: 10px 0

      input
        width: 25px
        height: 25px

      label
        cursor: pointer

    .sort
      background: #e1e1e1
      #clear-filter
        font-size: 12px

      .select_sort, .select_count
        cursor: pointer !important
        font-size: 12px

    .box-shadow
      box-shadow: 0.5em 0.5em 1em #8c8c8c
      background: #e1e1e1

      a.close
        position: absolute
        right: 15px
        top: 5px
        cursor: pointer
        z-index: 5
        width: 25px
        height: 25px

      .align-item
        display: flex
        align-items: center
        justify-content: center

      input, select
        cursor: pointer

      label
        cursor: pointer !important

      .boxes
        margin-top: 20px

    .product
      padding: 0 0 0 15px

      a.close
        position: absolute
        right: 0
        top: -10px
        cursor: pointer
        z-index: 5
        width: 25px
        height: 25px

      .scale
        overflow: hidden

      .scale img
        transition: 1s
        display: block

      .scale img:hover
        transform: scale(1.5)

      .product-img
        background: #e1e1e1

      figure
        margin: 0
        padding: 0 !important
        text-align: center
        cursor: pointer

      .product-info
        display: flex
        align-items: center
        justify-content: space-between
        flex-direction: column
        background: #e1e1e1
        height: 200px

        .rating-active
          color: orange !important

    button.page-link
      display: inline-block

    button.page-link
      font-size: 20px
      color: #29b3ed
      font-weight: 500
      padding: 8px 15px

    .offset
      width: 500px !important
      margin: 20px auto

    // Back to top
    .back-to-top
      position: absolute
      display: none
      right: 15px
      bottom: 15px
      z-index: 99999
      text-decoration: none

    .back-to-top i
      display: flex
      align-items: center
      justify-content: center
      font-size: 24px
      width: 40px
      height: 40px
      background: grey
      color: #fff
      transition: all 0.4s

    .back-to-top i:hover
      background: black
      color: #fff

      button.addToCart, button.submit
        position: relative
        box-shadow: 0 0 0 60px rgba(0, 0, 0, 0) inset, 0.1em 0.1em 0.2em #8c8c8c
        cursor: pointer

        &:active
          top: .1em
          left: .1em
          box-shadow: 0 0 0 60px rgba(0, 0, 0, 0.05) inset
.modal
  .modal-header, .modal-footer
    background: #e1e1e1

  .modal-body
    background: #ececec

//dark theme
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

//end dark theme
</style>
