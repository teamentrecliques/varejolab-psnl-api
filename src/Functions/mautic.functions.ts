import axios from 'axios'

import { mautic as config } from '@config'

const $mautic = axios.create({
  baseURL: config.host,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${config.token}`
  }
})

interface MauticContact {
  name: string
  email: string
  phone: string
  ip: string
}
const createContact = (
  payload: MauticContact
): Promise<Record<string, any>> => {
  const { firstname, lastname } = ((): Record<string, string> => {
    const [firstname, lastname = ''] = payload.name.split(' ')
    return { firstname, lastname }
  })()

  const contact = {
    ...payload,
    firstname,
    lastname,

    lastActive: new Date(),
    overwriteWithBlank: true,
    // eslint-disable-next-line @typescript-eslint/camelcase
    preferred_locale: 'pt_BR',
    sourceapi: 'PSNL API',
    timezone: 'America/Sao_Paulo'
  }

  return $mautic.post('/contacts/new', contact)
}

export default { createContact }
