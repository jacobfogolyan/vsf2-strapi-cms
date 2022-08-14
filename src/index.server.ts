import { apiClientFactory } from '@vue-storefront/core'
import { getContent } from './api'
import type { StrapiOptions } from 'strapi-sdk-js'
import Strapi from 'strapi-sdk-js'

const setup = (options: StrapiOptions) => {
  const allOptions = {
    url: 'http://localhost:1337',
    prefix: '/api',
    axiosOptions: {},
  }
  const client = new Strapi(allOptions)
  return {
    client,
    config: {
      ...options,
    },
  }
}

const { createApiClient } = apiClientFactory({
  onCreate: setup,
  api: {
    getContent,
  },
})

export { createApiClient }
