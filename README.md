# Strapi CMS v4 Vue Storefront Integration / Nuxt

## Installation

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

```javascript
// nuxt.config.js
    buildModules: [
        ['@vue-storefront/nuxt', {
        useRawSource: {
            dev: [
                ...,
                'vsf2-strapi-cms'
            ],
            prod: [
                ...,
                'vsf2-strapi-cms'
            ]
        }
        }]
    ],
    modules: [
        ['vsf2-strapi-cms/nuxt', { } ],    
    ]
```


# Usage

```javascript
// .vue component
import { useContent } from 'vsf2-strapi-cms'

export default {
    setup() {
        const { search: searchContent, loading, content } = useContent()

        onSSR(async () => {
          await searchContent({
            contentType: "blog-posts",
            find: true,
            sort: "Title"
          })
        });

        return {
            loading,
            content
        }
    }
}
```