import { Logger } from '@vue-storefront/core'
import type { StrapiResponse, StrapiRequestParams } from 'strapi-sdk-js'
import Strapi from 'strapi-sdk-js'
import { searchParams } from './types'

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
    populate = "deep" // check out https://market.strapi.io/plugins/strapi-plugin-populate-deep
  }: searchParams,
) => {
  let method: Promise<StrapiResponse<any>>

  const params: StrapiRequestParams = {
    sort,
    pagination,
    filters,
    locale,
    populate
  }

  if (!contentType) {
    Logger.error('contentType must be specified, eg "blog-post" or "blog-posts"')
    return
  }

  if (find && findOne) {
    Logger.error('Please specify only one method `find` or `findOne`')
    return
  }

  if (!find && !findOne) {
    Logger.error('Please select a search method `find` or `findOne`')
    return
  }

  if (find && id) {
    Logger.warn('`id` will be ignored in this case as it can only be used when searching using `findOne`')
  }

  if (find && !id && !findOne) {
    method = Strapi.find(contentType, params)
  } else if (findOne && id) {
    method = Strapi.findOne(contentType, id, params)
  } else {
    Strapi.find(contentType, params)
  }

  try {
    const { data } = await method
    return Array.isArray(data) ? data : [data]
  } catch (error) {
    Logger.error('error', error)
    throw error
  }
}
