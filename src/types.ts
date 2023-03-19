import type { StrapiRequestParams, StrapiBaseRequestParams } from 'strapi-sdk-js'

export interface contentSearchParams {
  contentType: string
  id?: number | string
  find?: boolean
  findOne?: boolean
}

export type searchParams = contentSearchParams & StrapiRequestParams & StrapiBaseRequestParams
