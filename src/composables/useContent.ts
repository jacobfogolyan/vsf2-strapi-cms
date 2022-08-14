import { useContentFactory, UseContent, Context } from '@vue-storefront/core'
import { contentSearchParams } from '../types'

const search = async (
  context: Context,
  params: contentSearchParams,
): Promise<{}> => {
  return await context.$strapi.api.getContent(params)
}
const useContent: (cacheId: string) => UseContent<any, contentSearchParams> =
  useContentFactory<any, contentSearchParams>({ search })

export { useContent }
