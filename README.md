# Strapi CMS v4 Vue Storefront Integration / Nuxt
<img src="https://seeklogo.com/images/V/vue-storefront-logo-CAF7181087-seeklogo.com.png" alt="vsf logo" width="100px" height="100px" />
<p style="font-size: 100px; display: inline; margin: 0 20px; line-height: 200px; height: 200px;">+</p>
<img src="https://cdn.worldvectorlogo.com/logos/strapi-2.svg" alt="strapi logo" width="100px" height="100px" />

## Steps
1. VSF Installation Steps
2. Strapi Installation
## VSF Installation

:rocket:

1. `yarn add vsf2-strapi-cms`
2. add confiuguration to middelware.config.js
```javascript
// ./middleware.config.js
module.exports = {
    integrations: {
        ...
        strapi: {
            location: "vsf2-strapi-cms/server",
            configuration: {
                url: 'http://localhost:1337',
                prefix: '/api',
                axiosOptions: {},
            }
        }
        ...
    }
}
```
3. add vsf2-strapi-cms to build modules
```javascript
// nuxt.config.js
    buildModules: [
      ['@vue-storefront/nuxt', {
        useRawSource: {
            dev: [
              '@vue-storefront/core',
                ...,
                'vsf2-strapi-cms'
            ],
            prod: [
                '@vue-storefront/core',
                ...,
                'vsf2-strapi-cms'
            ]
        }
      }]
    ],
    modules: [
      ['vsf2-strapi-cms/nuxt', {
        imageHost: 'http://localhost:1337/'
      } ],    
    ]
```

4. add cms components to `nuxt.config.js`, see [docs](https://nuxtjs.org/docs/configuration-glossary/configuration-components/)

```javascript
export default {
  ...
  components: ['~/components/cms'],
  ...
}
```


# Usage

```javascript
// .vue component
import { useContent } from 'vsf2-strapi-cms'
import { onSSR } from '@vue-storefront/core'

export default {
    setup() {
        const { search: searchContent, loading, content, error } = useContent()

        onSSR(async () => { // or `useFetch` in nuxt composition api
          await searchContent({
            contentType: "blog-posts",
            find: true,
            sort: "Title"
          })
        });

        return {
            loading,
            content,
            error
        }
    }
}
```

# Strapi Installation

## Installing Strapi Models

These instructions are to be followed in your strapi cms codebase.

1. Copy contents of `api` folder to existing `./src/api` folder. If the `api` folder doesn't exist create it.
2. Copy over component folder. create component folder it one doesn't exist already. 
3. `yarn add strapi-plugin-populate-deep` see https://market.strapi.io/plugins/strapi-plugin-populate-deep this package was needed so strapi would return content array in Dynamic Zones. This package returns all fields and media objects
