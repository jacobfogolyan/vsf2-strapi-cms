import { apiClientFactory } from '@vue-storefront/core'
import * as api from './api'
import type { StrapiOptions } from 'strapi-sdk-js'
import Strapi from 'strapi-sdk-js'

const setup = (options: StrapiOptions) => {
  const client = new Strapi(options)
  return {
    client,
    config: {
      ...options,
    },
  }
}

const { createApiClient } = apiClientFactory({
  onCreate: setup,
  api,
})

export { createApiClient }
