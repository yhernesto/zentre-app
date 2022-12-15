<template>
  <q-page class="items-center justify-center col-12 col-md-10 col-lg-8">
    <!-- <q-page class="items-center justify-center"> -->
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6 q-pt-none">
        <q-card square flat>
          <q-responsive :ratio="$q.screen.lt.md ? 16 / 6 : 16 / 5" class="col">
            <q-img
              :src="
                client.cover ||
                'https://storage.googleapis.com/appeiron_pay/form/client_wallpaper.jpg'
              "
            />
          </q-responsive>
          <q-card-section>
            <q-avatar
              :size="$q.screen.lt.md ? '125px' : '160px'"
              class="absolute"
              style="top: 0; left: 25px; transform: translateY(-50%)"
            >
              <img
                :src="
                  client.logo || 'https://storage.googleapis.com/appeiron_pay/form/client_logo.jpg'
                "
              />
            </q-avatar>
            <div class="row no-wrap">
              <div class="col-md-6" style="width: 40%"></div>
              <div class="col-md-4 text-h5 ellipsis">
                {{ client.name || 'Zentre' }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-12 col-md-7 col-lg-5">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          :breakpoint="0"
        >
          <q-tab name="place" label="Ubícanos" />
          <q-tab name="send" label="Contáctanos" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="place">
            <div class="q-pa-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3496778625436!2d-77.03657248505674!3d-12.088196845964218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9fa30087a19%3A0xd070e10fb34f922c!2sJir%C3%B3n%20Pedro%20Conde%20178%2C%20Lince%2015046!5e0!3m2!1ses-419!2spe!4v1662340630551!5m2!1ses-419!2spe"
                width="100%"
                height="425"
                style="border: 0; border-radius: 25px"
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              >
              </iframe>
            </div>

            <div class="col-12 col-md-7 col-lg-5">
              <q-card v-if="appStores.length == 1">
                <q-card-section align="center" v-if="appStores[0]?.address">
                  <q-icon name="map" size="3em" /> {{ appStores[0]?.address }}
                  <div align="center" v-if="appStores[0]?.phones">
                    <b>Tlf:</b>
                    {{ appStores[0]?.phones?.[0].countryCode + ' ' + appStores[0]?.phones?.[0].phone || '--' }}
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section align="center">
                  <OpeningHours :raw-opening-hours="appStores[0]?.openingHours"></OpeningHours>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="send">
            <div class="q-pa-sm">
              <q-card class="q-pa-sm">
                <q-card-section>
                  <div class="text-h5 q-mt-sm q-mb-xs">
                    ¿Cuál ha sido tu experiencia con nosotros?
                  </div>
                </q-card-section>
                <q-form @submit="surveySubmit" class="q-gutter-sm">
                  <q-rating
                    name="quality"
                    v-model="surveyQuality"
                    max="5"
                    size="3.5em"
                    color="secondary"
                    icon="star_border"
                    icon-selected="star"
                    no-dimming
                  />
                  <q-input v-model="surveyComment" autogrow placeholder="Tu opinión" />
                  <div class="row justify-end">
                    <q-btn label="Enviar" type="submit" color="primary" />
                  </div>
                </q-form>
              </q-card>
              <q-card class="q-pa-sm q-mt-lg">
                <q-card-section>
                  <div class="text-h5 q-mt-sm q-mb-xs">Envíanos un mensaje</div>
                  <div class="text-caption text-grey">¿Cómo te podemos ayudar hoy?</div>
                </q-card-section>
                <q-form
                  @submit="contactSubmit"
                  class="q-gutter-md"
                  autocorrect="off"
                  autocapitalize="off"
                  autocomplete="off"
                  spellcheck="false"
                >
                  <q-input
                    v-model="contactName"
                    label="Nombre completo *"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Necesitamos tu nombre']"
                  />
                  <div class="row q-py-md">
                    ¿Cómo nos podemos contactar?
                    <div class="col-12">
                      <q-radio left-label v-model="userContactType" val="EML" label="Email" />
                      <q-radio left-label v-model="userContactType" val="PHO" label="Teléfono" />
                    </div>
                    <div class="col-12">
                      <q-input
                        v-if="userContactType === 'email'"
                        type="email"
                        dense
                        v-model="userContact"
                        label="Tu email *"
                        :rules="[
                          (val) =>
                            (val && val.length > 0 && validateEmail(val)) ||
                            'Necesitamos una forma de contactarnos',
                        ]"
                      />
                      <q-input
                        v-else
                        type="tel"
                        dense
                        v-model="userContact"
                        label="Tu teléfono *"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Necesitamos una forma de contactarnos',
                        ]"
                      />
                    </div>
                  </div>
                  <q-input
                    v-model="contactMessage"
                    label="Mensaje *"
                    autogrow
                    placeholder="Tu mensaje"
                    :rules="[(val) => (val && val.length > 0) || 'Déjanos un mensaje']"
                  />
                  <div class="row justify-end">
                    <q-btn label="Enviar" type="submit" color="primary" />
                  </div>
                </q-form>
              </q-card>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientStore } from 'src/stores/ClientStore'
import { ref } from 'vue'
import { validateEmail } from 'src/shared/utils'
import OpeningHours from './components/OpeningHours.vue'
import ContactService from 'src/services/ContactService'
import { useQuasar } from 'quasar'
import { useAppStoreStore } from 'src/stores/AppStore'

const clientStore = useClientStore()
clientStore.fetchClient()
const { client } = storeToRefs(clientStore)
const appStoreStore = useAppStoreStore()
appStoreStore.fetchAppStores()
const { appStores } = storeToRefs(appStoreStore)
const tab = ref('place')
const surveyQuality = ref(3)
const surveyComment = ref('')
const contactName = ref('')
const userContactType = ref('email')
const userContact = ref('')
const contactMessage = ref('')

const $q = useQuasar()

function showNotification() {
  $q.notify({
    message: 'Survey has been send it.',
    color: 'primary',
    position: 'top',
  })
}

async function surveySubmit(evt: any) {
  const formData = new FormData(evt.target)
  const data: unknown[] = []
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (const [name, value] of formData.entries()) {
    data.push({ name, value })
  }
  const survey = {
    storeId: appStores.value[0].id,
    rate: surveyQuality.value,
    comment: surveyComment.value,
  }
  try {
    await ContactService.createSurvey(survey)
    showNotification()
    goHome(2000)
  } catch (err) {
    throw err
  }
}

async function contactSubmit() {
  console.log('contactName: ' + contactName.value)
  console.log('userContactType: ' + userContactType.value)
  console.log('userContact: ' + userContact.value)
  console.log('contactMessage: ' + contactMessage.value)
  const contact = {
    storeId: appStores.value[0].id,
    userName: contactName.value,
    contactType: Number(userContactType.value),
    contact: userContact.value,
    message: contactMessage.value,
  }
  try {
    await ContactService.createContact(contact)
    showNotification()
    goHome(2000)
  } catch (err) {
    throw err
  }
}

function goHome(timeout?: number) {
  if (timeout) {
    setTimeout(function () {
      window.location.href = '/'
    }, timeout)
  } else {
    window.location.href = '/'
  }
}
</script>
