<template>
  <q-btn-dropdown :label="openingHoursLabel" outline dense>
    <q-list>
      <q-item v-ripple v-for="(openingHour, idx) in openingHoursByDay" :key="idx">
        <q-item-section>
          {{ openingHour.day + ': ' + openingHour.fromHour + ' - ' + openingHour.toHour }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { IClientOpeningHour } from 'src/hub/interfaces/Client.interface'
import { isCurrentTimeBetween } from 'src/shared/timeUtils'
import { onMounted, ref } from 'vue'

interface IOpeningHour {
  day: string
  fromHour: string
  toHour: string
}

// interface IOpeningHours {
//   isOpen: boolean
//   closeAt: string
//   openingHours: IOpeningHour[]
// }

const props = defineProps<{
  rawOpeningHours: IClientOpeningHour[] | undefined
}>()

// const openingHours = ref<IOpeningHours>()
const openingHoursLabel = ref('')
const openingHoursByDay = ref<IOpeningHour[]>([])

// const isOpen = ref(false)
// const closeAt = ref('')

onMounted(() => {
  let isOpen = false
  let closeAt = ''
  const currentDate = new Date()
  // const openingHoursByDay: IOpeningHour[] = []
  props.rawOpeningHours?.forEach((rawOpeningHour) => {
    const openingHour = openingHoursToReadable(rawOpeningHour)
    if (currentDate.getDay() == rawOpeningHour.weekDay) {
      isOpen = isCurrentTimeBetween(rawOpeningHour.fromHour, rawOpeningHour.toHour)
      closeAt = rawOpeningHour.toHour
    }
    openingHoursByDay.value.push(openingHour)
  })
  if(isOpen){
    openingHoursLabel.value = 'Open - Closes at: ' + closeAt
  }else{
    openingHoursLabel.value = 'Is Closes'
  }
  // openingHours.value = {
  //   isOpen: isOpen,
  //   closeAt: closeAt,
  //   openingHours: openingHoursByDay,
  // }
})

function openingHoursToReadable(rawOpeningHour: IClientOpeningHour): IOpeningHour {
  const openingHour: IOpeningHour = {
    day: 'WD-' + rawOpeningHour.weekDay,
    fromHour: rawOpeningHour.fromHour,
    toHour: rawOpeningHour.toHour,
  }
  return openingHour
}
</script>
