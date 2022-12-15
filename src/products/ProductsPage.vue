<template>
  <q-page class="items-center justify-center col-12 col-md-10 col-lg-8">
    <!-- <q-page class="items-center justify-center"> -->
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6 q-pt-none">
        <q-card square flat>
          <q-responsive :ratio="scrollTopOffset ? 16 / 4 : 16 / 5" class="col">
          <!-- <q-responsive :ratio="16 / 4" class="col"> -->
            <q-img
              :src="
                client.cover ||
                'https://storage.googleapis.com/appeiron_pay/form/client_wallpaper.jpg'
              "
            />
          </q-responsive>
          <q-card-section>
            <q-avatar
              :size="$q.screen.lt.md ? (scrollTopOffset ? '90px' : '125px') : '150px'"
              class="absolute"
              style="top: 0; left: 25px; transform: translateY(-50%)"
            >
            <!-- <q-avatar
              :size="$q.screen.lt.md ? '100px' : '150px'"
              class="absolute"
              style="top: 0; left: 25px; transform: translateY(-50%)"
            > -->
              <img
                :src="
                  client.logo || 'https://storage.googleapis.com/appeiron_pay/form/client_logo.jpg'
                "
              />
            </q-avatar>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-6 text-h5 ellipsis text-center">
                {{ client.name || 'Zentre' }}
              </div>
              <div v-if="scrollTopOffset" class="col-3 text-center">
                <q-btn
                  round
                  dense
                  icon="search"
                  color="primary"
                  transition-show="scale"
                  transition-hide="scale"
                  @click="moveScroll()"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- SEARCH -->
    <div v-if="!scrollTopOffset" class="row justify-center">
    <!-- <div class="row justify-center"> -->
      <div class="col-10 col-md-5 col-lg-4 q-pt-md">
        <q-input
          dense
          rounded
          outlined
          v-model="textToSearch"
          label="Buscar"
          transition-show="scale"
          transition-hide="scale"
        >
          <template v-slot:hint> Buscar </template>
          <template v-slot:append>
            <q-btn round dense flat icon="search" color="primary" />
          </template>
        </q-input>
      </div>
    </div>
    <!-- CATEGORIES -->
    <div class="row justify-center">
      <div class="col-11 col-md-7 col-lg-5 q-pt-md">
        <q-scroll-area
          :thumb-style="thumbStyle"
          style="height: 42px; max-width: 100%"
          :visible="false"
        >
          <div class="row no-wrap">
            <q-chip
              square
              v-for="(category, idx) in categories"
              :class="category.state ? 'inset-shadow' : ''"
              :outline="!category.state"
              v-model:selected="category.state"
              color="primary"
              text-color="white"
              :key="idx"
            >
              {{ category.name }}
            </q-chip>
          </div>
        </q-scroll-area>
      </div>
    </div>

    <!-- PRODUCT LISTS -->
    <div class="row justify-center">
      <div class="col-11 col-md-7 col-lg-5">
      <!-- <div class="q-py-xs q-px-md"> -->
        <q-scroll-area
          ref="scrollAreaRef"
          :thumb-style="thumbStyle"
          :style="scrollTopOffset ? 'height: 600px; max-width: 100%;' : 'height: 520px; max-width: 100%;'"
        >
          <q-list>
            <template v-for="(product, productIdx) in filteredProducts" :key="productIdx">
              <q-item clickable @click="openDescription(product.id)" v-ripple class="q-pa-xs rounded-borders">
                <div class="col-sm-12 col-md-7 col-lg-5">
                  <q-card flat>
                    <q-card-section horizontal>
                      <q-img
                        class="col-4"
                        :src="product.image?.src || EMPTY_IMG "
                        style="cursor: pointer"
                      >
                        <template v-slot:loading>
                          <q-spinner-gears color="white" />
                        </template>
                        <template v-slot:error>
                          <div class="absolute-full flex flex-center bg-negative text-white">
                            Cannot load image
                          </div>
                        </template>
                      </q-img>
                      <q-card-section
                        class="q-pt-none q-pr-sm"
                        style="cursor: pointer"
                      >
                        <div class="text-h6 q-mb-xs">
                          {{ product.name }}
                        </div>
                        <div ellipsis class="text-caption text-grey q-pb-md">
                          {{ product.short_description }}
                        </div>
                        <span class="q-ml-md q-mb-xs absolute-bottom" style="color: orange">
                          <template v-if="product.variation_min_price">
                            <b>Desde S/. {{ roundDecimals(product.variation_min_price) }}</b>
                          </template>
                          <template v-else>
                            <b>S/. {{ roundDecimals(product.price) }}</b>
                          </template>
                        </span>
                      </q-card-section>
                    </q-card-section>
                  </q-card>
                </div>
                <!-- <q-item-section>
                  <q-img
                    style="max-width: 90%"
                    class="rounded-borders"
                    :src="product.image?.src || EMPTY_IMG "
                  >
                    <template v-slot:loading>
                      <q-spinner-gears color="white" />
                    </template>
                    <template v-slot:error>
                      <div class="absolute-full flex flex-center bg-negative text-white">
                        Cannot load image
                      </div>
                    </template>
                  </q-img>
                </q-item-section>
                <q-item-section>
                  <div class="text-h6 q-mb-xs">
                    {{ product.name }}
                  </div>
                  <div ellipsis class="text-caption text-grey q-pb-md">
                    {{ product.short_description }}
                  </div>
                  <span class="q-mb-xs" style="color: orange">
                    <template v-if="product.variation_min_price">
                      <b>Desde S/. {{ roundDecimals(product.variation_min_price) }}</b>
                    </template>
                    <template v-else>
                      <b>S/. {{ roundDecimals(product.price) }}</b>
                    </template>
                  </span>
                </q-item-section> -->
              </q-item>
              <q-separator spaced="md" />
            </template>
          </q-list>
        </q-scroll-area>
      </div>
    </div>

    <!-- PRODUCT DETAILS DIALOG -->
    <q-dialog v-model="showProductDetails">
      <ProductDetails
        :product="productParam"
      ></ProductDetails>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { IProduct, ISimpleProduct } from 'src/products/interfaces/IProduct.interface'
import { storeToRefs } from 'pinia'
import { ICategory } from 'src/products/interfaces/ICategory.interface'
import { useClientStore } from 'src/stores/ClientStore'
import { EMPTY_IMG } from 'src/shared/constants/images'
import { roundDecimals } from 'src/shared/utils'
import ProductDetails from './components/ProductDetails.vue'
import { useProductsStore } from 'src/stores/ProductStore'
import ProductService from 'src/services/ProductService'
import { useCategoryStore } from 'src/stores/CategoryStore'

const productsStore = useProductsStore();
const clientStore = useClientStore()
const categoryStore = useCategoryStore()
const { products } = storeToRefs(productsStore);
const { client } = storeToRefs(clientStore)
const { categories } = storeToRefs(categoryStore)
const textToSearch = ref('')
const selection = computed(() => {
  return categories.value.filter((ele) => (ele.state ? ele.name : null))
})
const scrollAreaRef = ref()
const showProductDetails = ref(false)
const productParam = ref<IProduct>()
const scrollTopOffset = computed(() => {
  return scrollAreaRef.value?.getScrollPosition().top > 0
})
const filteredProducts = computed<ISimpleProduct[]>(() => {
  let filteredProducts = []
  const selectedCategories: ICategory[] = selection.value.filter((category) => category.state)
  if (selection.value.length == 0) {
    filteredProducts = products.value
  } else {
    filteredProducts = products.value.filter((product) =>
      hasSomeCategorySelected(product.categories, selectedCategories),
    )
  }
  if (textToSearch.value) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.includes(textToSearch.value),
    )
  }
  return filteredProducts
})

// const searchTimer = ref()
// watch(textToSearch, async (newTextToSearch, oldTextToSearch) => {
//   // if (newTextToSearch.indexOf('?') > -1) {
//   //   searching.value = 'Thinking...'
//   //   try {
//   //     const res = await fetch('https://yesno.wtf/api')   //
//   //     searching.value = (await res.json()).answer        //
//   //     console.log(searching)
//   //   } catch (error) {
//   //     searching.value = 'Error! Could not reach the API. ' + error
//   //   }
//   // }
//     clearTimeout(searchTimer.value)
//     searchTimer.value = setTimeout(() => {
//         if(textToSearch){
//           filteredProducts = []
//         }
//     }, 1500)
// })

function hasSomeCategorySelected(
  productCategories: ICategory[],
  selectedCategories: ICategory[],
): boolean {
  return productCategories.some((productCategory) =>
    selectedCategories.some((selectedCategory) => selectedCategory.name == productCategory.name),
  )
}

async function fetchProduct(productId: number): Promise<IProduct> {
  const product = await (await ProductService.getProductById(productId)).data
  return product
}

async function openDescription(productId: number) {
  if(productParam.value?.id != productId){
    const product = await fetchProduct(productId)
    productParam.value = product
  }
  showProductDetails.value = true
}

function moveScroll(): void {
  console.info('moving scroll because function')
  scrollAreaRef.value?.setScrollPosition('vertical', 0)
}

function printt(): void {
  console.log(products.value)
  console.log('*************')
  console.log(productParam.value)
}

onMounted(async() => {
  productsStore.fetchSimpleProducts(1)
  clientStore.fetchClient()
  categoryStore.fetchCategories()
})

watch(selection, () => {
  categories.value.sort((a, b) => {
    return a.state === b.state ? 0 : a.state ? -1 : 1
  })
})

const thumbStyle = {
  right: '2px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: '0.75',
}
</script>

<style scope>
  .q-card__section--horiz > div:not(:last-child),
  .q-card__section--horiz > img:not(:last-child) {
    border-radius: 25px;
  }

  .product-details-card {
    width: 100%;
    max-width: 300px;
  }
</style>
