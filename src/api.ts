import { Logger } from '@vue-storefront/core'
import type { StrapiRequestParams, StrapiResponse } from 'strapi-sdk-js'
import Strapi from 'strapi-sdk-js'
import { contentSearchParams } from './types'

export const getContent = async (
  { client: Strapi }: { client: Strapi },
  {
    contentType,
    id,
    find = false,
    findOne = false,
    sort = 'Title',
    pagination,
    filters,
    locale,
  }: contentSearchParams & StrapiRequestParams,
) => {
  let method: Promise<StrapiResponse<any>>
  const params: StrapiRequestParams = {
    sort,
    pagination,
    filters,
    locale,
  }

  if (!contentType) {
    return
  }

  if (find && !id && !findOne) {
    method = Strapi.find(contentType, params)
  } else if (find && id) {
    method = Strapi.findOne(contentType, id, params)
  } else {
    Strapi.find(contentType, params)
  }

  try {
    const { data } = await method

    console.log(data)
    return data
  } catch (error) {
    Logger.warn('error', error)
    return []
  }
}
