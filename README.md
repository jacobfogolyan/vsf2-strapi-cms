# Strapi CMS v4 Vue Storefront Integartion / Nuxt

## Installation

```javascript
// ./middleware.config.js
module.exports = {
    integrations: {
        ...
        strapi: {
            location: "strapi-cms/server",
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
                'strapi-cms'
            ],
            prod: [
                ...,
                'strapi-cms'
            ]
        }
        }]
    ],
    modules: [
        ['strapi-cms/nuxt', { } ],    
    ]
```


# Usage

```javascript
// .vue component
import { useContent } from 'strapi-cms'

export default {
    setup() {
        onSSR(async () => {
          await searchContent({
            contentType: "blog-posts",
            find: true,
            sort: "Title"
          })
        });
    }
}
```