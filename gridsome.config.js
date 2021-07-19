module.exports = {
  siteName: 'Affiliate list',
  icon: 'src/assets/logo.png',
  plugins: [
    { use: 'gridsome-plugin-typescript' },
    { use: 'gridsome-plugin-composition-api' },
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        base: process.env.AIRTABLE_BASE_ID,
        tables: [{ name: 'programs', typeName: 'Program' }]
      }
    }
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  }
}
