module.exports = {
  siteName: 'Affiliate List',
  plugins: [
    { use: 'gridsome-plugin-typescript' },
    { use: 'gridsome-plugin-composition-api' },
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        base: process.env.AIRTABLE_BASE_ID,
        tables: [
          {
            name: 'programs',
            typeName: 'Program',
            links: [
              {
                fieldName: 'categories',
                typeName: 'Category'
              },
              {
                fieldName: 'affiliateNetwork',
                typeName: 'Network',
                linkToFirst: true
              }
            ]
          },
          {
            name: 'categories',
            typeName: 'Category',
            links: [
              {
                fieldName: 'programs',
                typeName: 'Program'
              }
            ]
          },
          {
            name: 'networks',
            typeName: 'Network'
          }
        ]
      }
    }
  ],
  templates: {
    Program: '/program/:slug/'
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  }
}
