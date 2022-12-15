import axios from 'axios'
import { ICreateContact } from 'src/hub/interfaces/CreateContact.interface'
import { ICreateSurvey } from 'src/hub/interfaces/CreateSurvey.interface'

const apiContact = axios.create({
  baseURL: 'http://localhost:3000/contact/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    tenancy: 'dev',
  },
})

export default {
  createSurvey(createSurvey: ICreateSurvey) {
    try {
      return apiContact.post('app/survey', createSurvey)
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  createContact(createContact: ICreateContact) {
    try {
      return apiContact.post('app/contact', createContact)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
