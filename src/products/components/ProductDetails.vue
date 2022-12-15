<template>
  <q-card class="product-details-card">
    <q-card-section class="row items-center q-py-none">
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <div v-if="pdImages.length <= 1" class="q-px-md q-pt-none">
      <q-img style="border-radius: 25px" :src="pdImages[0]?.src || EMPTY_IMG" />
    </div>
    <div v-else class="q-px-md q-pt-none">
      <q-carousel
        animated
        v-model="productDetailImageIdx"
        navigation
        infinite
        :autoplay="true"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide
          v-for="(pdImage, pdImageIdx) in pdImages"
          :key="pdImageIdx"
          :name="pdImageIdx"
          :img-src="pdImage.src"
          style="border-radius: 25px"
        />
      </q-carousel>
    </div>

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h5 ellipsis">
          {{ pdName }}
        </div>
        <div class="col-auto text-grey text-caption row no-wrap items-center">
          <q-icon name="timer" />
          30'
        </div>
      </div>
      <!-- <q-rating v-model="stars" :max="5" size="32px" /> -->
    </q-card-section>

    <q-card-section class="q-pt-none q-px-lg">
      <div class="text-subtitle2 text-grey">
        {{ pdCategories.map((category) => category.name).join(' - ') }}
      </div>
      <div class="text-caption text-grey">
        {{ pdDescription }}
      </div>
    </q-card-section>
    <!-- <q-separator /> -->
    <q-card-section class="row q-px-lg justify-left" style="color: orange">
      <b>S/. {{ roundDecimals(pdPrice) || '-:--' }}&emsp;</b>
      <div class="text-caption text-grey">
        {{ pdCurrentVariationOptionsText }}
      </div>
    </q-card-section>

    <q-separator spaced="md" />

    <template v-if="pdProductOptions.length > 0">
      <q-card-section
        class="q-pt-none"
        v-for="(variationOption, variationOptionIdx) in pdProductOptions"
        :key="variationOptionIdx"
      >
        <div class="q-pa-xs" style="max-width: 100%">
          <q-expansion-item
            class="shadow-1 overflow-hidden"
            style="border-radius: 30px"
            :icon="variationOption.icon"
            :label="variationOption.variation"
            header-class="bg-secondary text-white"
            expand-icon-class="text-white"
          >
            <q-card>
              <q-card-section class="q-pa-none">
                <q-option-group
                  :options="getVariationOptions(variationOption)"
                  type="radio"
                  color="secondary"
                  @update:model-value="(value: any) => {onUpdateCheckedOption(value, variationOption.variation) }"
                  v-model="pdCurrentVariationOptions[variationOptionIdx].option"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </q-card-section>
    </template>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { EMPTY_IMG } from 'src/shared/constants/images'
import { ICategory } from '../interfaces/ICategory.interface'
import { IProduct, IImage } from '../interfaces/IProduct.interface'
import { cloneObjRemovingRef, roundDecimals } from 'src/shared/utils'
import { IProductOptions, IVariationOption, IVariation, IAvailableVariation, IRadioGroupOption } from '../interfaces/IVariation.interface'

const props = defineProps<{
  product: IProduct | undefined
  // availableVariationOptions: IAvailableVariation[]
}>()

const pdName = ref('')
const pdDescription = ref('')
const pdCategories = ref<ICategory[]>([])
const pdPrice = ref('')
const pdImages = ref<IImage[]>([])
const productDetailImageIdx = ref(0)
const pdProductOptions = ref<IProductOptions[]>([])
const pdCurrentVariationOptions = ref<IVariationOption[]>([])
const pdSelectedVariationOption = ref<IVariationOption>({option: '', variation: ''})
const pdCurrentVariationOptionsText = ref<string>('')
const pdCurrentVariation = ref<IVariation>()
const availableVariationOptions = ref<IAvailableVariation[]>()

function getCurrentVariation(variationsValues: IVariationOption[]): IVariation {
  // const productVariations = pdVariations.value
  const productVariations = props.product?.variations || []
  const filteredVariation = productVariations.find((variation) =>
    someVariationOption(variation.variation_tuples, variationsValues),
  )
  return filteredVariation ?? {} as IVariation
}

function someVariationOption(
  variationTuples: IVariationOption[],
  variationOptionToSearch: IVariationOption[],
): boolean {
  return variationTuples.every(function (element) {
    return variationOptionToSearch.some(
      (e) => e.variation === element.variation && e.option === element.option,
    )
  })
}

function getVariationOptions(variationOption: IProductOptions): IRadioGroupOption[] {
  if(pdSelectedVariationOption.value?.variation == variationOption.variation){
    const rawVarOptions = props.product?.variation_options?.find(varOption => varOption.variation === variationOption.variation)
    const groupOptions: IRadioGroupOption[] = []
    rawVarOptions?.options?.forEach(vOption => {
      const groupOption: IRadioGroupOption = {
        value: vOption,
        label: vOption,
        disable: false
      }
      groupOptions.push(groupOption)
    })
    return groupOptions
  }else{
    const availableVariations = availableVariationOptions.value?.find(
      avo => avo.variation == pdSelectedVariationOption.value?.variation && avo.option == pdSelectedVariationOption.value.option
    ) || null
    const availableOptions = availableVariations?.available.find(
      availableVariation => availableVariation.variation == variationOption.variation
    )
    return availableOptions?.options || []
  }
}

function onUpdateCheckedOption(optionChecked: string, variationChecked: string) {
  pdSelectedVariationOption.value.option = optionChecked
  pdSelectedVariationOption.value.variation = variationChecked
  removeDisableCheckedOptions(optionChecked, variationChecked)
}

function removeDisableCheckedOptions(optionChecked: string, variationChecked: string): void {
  const availableVariations = availableVariationOptions.value?.find(
      avo => avo.option == optionChecked && avo.variation == variationChecked
    )?.available || []
  availableVariations.forEach(availableVariation => {
    const availableOptions = availableVariation?.options || []
    pdCurrentVariationOptions.value.forEach(currentVariationOptions => {
      if(currentVariationOptions.variation !== variationChecked){
        const hasToChangeOption = availableOptions.some(option => option.value === currentVariationOptions.option && option.disable)
        if(hasToChangeOption){
          const nextAvailable = availableOptions.find(option => !option.disable)
          currentVariationOptions.option = nextAvailable?.value || ''
        }
      }
    })
  })
}

onMounted(() => {
  pdName.value = props.product?.name || ''
  pdCategories.value = props.product?.categories  || []
  pdProductOptions.value = props.product?.variation_options ?? []
  if (props.product?.variations?.length) {
    pdCurrentVariationOptions.value = cloneObjRemovingRef(props.product.variations[0].variation_tuples)
    pdSelectedVariationOption.value = cloneObjRemovingRef(pdCurrentVariationOptions.value.slice(-1).pop())
    pdCurrentVariation.value = getCurrentVariation(pdCurrentVariationOptions.value)
    availableVariationOptions.value = props.product?.availableVariationOptions || []
    pdPrice.value = pdCurrentVariation.value.price?.toString() || ''
    pdImages.value = pdCurrentVariation.value.images || []
    pdDescription.value = pdCurrentVariation.value.description || ''
  } else {
    pdDescription.value = props.product?.description  || ''
    pdImages.value = props.product?.images || []
    pdPrice.value = props.product?.price?.toString()  || ''
  }
})

watch(
  () => pdCurrentVariationOptions.value,
  () => {
    let concatOptions = ''
    pdCurrentVariationOptions.value.forEach((variationOption) => {
      concatOptions = concatOptions.concat(variationOption.option + '  ')
    })
    pdCurrentVariationOptionsText.value = concatOptions
    pdCurrentVariation.value = getCurrentVariation(pdCurrentVariationOptions.value)
    console.info('variation found: ')
    console.info(pdCurrentVariation.value)
    pdPrice.value = pdCurrentVariation.value.price?.toString() || ''
    pdImages.value = pdCurrentVariation.value.images || []
    pdDescription.value = pdCurrentVariation.value.description || ''
  },
  { deep: true },
)
</script>
