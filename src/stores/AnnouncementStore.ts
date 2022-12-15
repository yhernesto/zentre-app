import { defineStore } from 'pinia';
import { IAnnouncement } from 'src/hub/interfaces/Announcement.interface'
import AnnouncementService from 'src/services/AnnouncementService'

export const useAnnouncementStore = defineStore('announcement', {
  state: () => ({
    announcements: [] as IAnnouncement[],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    fetchAnnouncements(type: string): void {
      if(this.announcements.length == 0){
        console.log('... Loading Announcements Data')
        AnnouncementService.getAnnouncements(type)
        .then(data => this.announcements = data.data)
        .catch(error => {console.log(error)})
      }else{
        console.log('Announcement data has already loaded')
      }
    },
  },
});
