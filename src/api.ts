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
    sort,
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
    Logger.warn('contentType must be specified, eg "blog-post" or "blog-posts"')
    return
  }

  if (find && findOne) {
    Logger.warn('Please choose a one serch method')
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
    return data
  } catch (error) {
    Logger.warn('error', error)
    return []
  }
}
