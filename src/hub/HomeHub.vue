<template>
  <q-page class="items-center justify-center col-12 col-md-10 col-lg-8">
  <!-- <q-page class="items-center justify-center"> -->
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6 q-pt-none">
        <q-card square flat>
          <q-responsive :ratio="$q.screen.lt.md ? 16/7 : 16/5" class="col">
            <q-img :src="client?.cover || 'https://cdn.quasar.dev/img/parallax2.jpg'"/>
          </q-responsive>
          <q-card-section>
            <q-avatar :size="$q.screen.lt.md ? '125px' : '175px'" class="absolute"
              style="top: 0; left: 25px; transform: translateY(-50%);">
              <img :src="client?.logo || 'https://cdn.quasar.dev/img/avatar.png'">
            </q-avatar>
            <div class="row no-wrap">
              <div class="col-md-6" style="width: 40%;">
              </div>
              <div class="col-md-4 text-h5 ellipsis">
                {{client.name || 'Your Business Name'}}
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row justify-center text-caption text-grey">
              {{client?.description || ''}}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- CONTACT -->
    <div class="row justify-center q-gutter-md" v-if="appStores?.length == 1">
      <q-card-section v-if="appStores[0]?.phones">
        <p>{{appStores[0]?.address}} <br/>
          <b>Tlf:</b> {{appStores[0]?.phones[0]?.countryCode + ' ' + appStores[0]?.phones[0]?.phone || '--'}}
        </p>
      </q-card-section>
    </div>

    <!-- ANNOUNCEMENTS -->
    <div class="row justify-center" v-if="announcements?.length">
      <div class="col-12 col-md-8 col-lg-6 q-pt-md">
        <q-carousel
            arrows
            animated
            infinite
            :autoplay="autoplay"
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
            height="250px"
            class="shadow-2 rounded-borders"
          >
            <q-carousel-slide v-for="announcement in announcements" :key="announcement.id" :name="announcement.id" :img-src="announcement.image" @click="announcementRedirect(announcement.url)">
              <div class="absolute-center custom-caption" v-if="announcement.title">
                <div class="text-h4">{{announcement.title}}</div>
                <div class="text-subtitle1">{{announcement.description}}</div>
              </div>
            </q-carousel-slide>
          </q-carousel>
      </div>
    </div>

    <!-- SNS -->
    <div class="row justify-center">
      <div class="col-11 col-md-8 col-lg-6 q-pt-lg">
        <q-list padding>
          <q-item v-ripple v-for="(sns,idx) in client.sns" :key="idx">
            <q-item-section>
              <button-hub
              :icon="SNS_DEFAULT_VALUES.find(v => v.code == sns.code)?.values.icon"
              :url="sns.url"
              :name="SNS_DEFAULT_VALUES.find(v => v.code == sns?.code)?.values.name"
              ></button-hub>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- BUTTONS -->
    <Suspense>
      <div class="row justify-center" v-if="client?.apps">
        <div class="col-11 col-md-8 col-lg-6 q-pt-md">
          <div class="row q-pt-md">
            <q-btn class="shadow-5" outline rounded push style="width:100%; background: transparent;" color="primary"
              @click="test()">
              <div class="row q-py-md">
                {{client?.apps[0]?.name}}
              </div>
            </q-btn>
          </div>
        </div>
      </div>
    </Suspense>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ButtonHub from 'src/hub/components/ButtonHub.vue'
import { SNS_DEFAULT_VALUES } from 'src/shared/constants/sns'
import { storeToRefs } from 'pinia'
import { useClientStore } from 'src/stores/ClientStore'
import { useAnnouncementStore } from 'src/stores/AnnouncementStore'
import { useAppStoreStore } from 'src/stores/AppStore'

const autoplay = ref(true)
const slide = ref(1)
const clientStore = useClientStore();
const announcementStore = useAnnouncementStore();
const appStoreStore = useAppStoreStore();
const {client} = storeToRefs(clientStore);
const {announcements} = storeToRefs(announcementStore);
const {appStores} = storeToRefs(appStoreStore);

onMounted(async() => {
  clientStore.fetchClient()
  announcementStore.fetchAnnouncements('HOME')
  appStoreStore.fetchAppStores()
})

function announcementRedirect(url: string | undefined) {
  if(url){
    console.log('redirect to ' + url)
    window.open(url)
  }
}

function test() {
  console.log(client.value)
  console.info('*********')
  console.log(appStores.value)
}
</script>

<style scoped>
/* https://codepen.io/chancesq/pen/MWKREVg */
</style>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 10px
  color: white
  background-color: rgba(0, 0, 0, .4)
</style>
