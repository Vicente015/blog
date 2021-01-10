/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Vicente015 Blog',
    description: 'Pensamientos, programación y disparates de un astronauta',
    siteUrl: 'https://blog.vicente015.dev',
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        quality: 100,
        stripMetadata: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'src', 'content'),
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: '//embed.redditmedia.com/widgets/platform.js',
        charset: 'UTF-8',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.243 3.03693C9.50026 3.10138 9.72137 3.26539 9.85771 3.49287C9.99405 3.72035 10.0344 3.99267 9.97 4.24993L9.53 6.00693H12.47L13.03 3.76393C13.0611 3.63573 13.1173 3.51497 13.1954 3.40859C13.2734 3.30221 13.3717 3.21232 13.4846 3.1441C13.5975 3.07588 13.7228 3.03067 13.8533 3.01108C13.9837 2.9915 14.1168 2.99792 14.2447 3.02998C14.3727 3.06203 14.4931 3.1191 14.5989 3.19787C14.7047 3.27665 14.7939 3.37559 14.8613 3.48899C14.9287 3.60238 14.973 3.728 14.9917 3.8586C15.0103 3.98919 15.003 4.12219 14.97 4.24993L14.53 6.00693H17C17.2652 6.00693 17.5196 6.11228 17.7071 6.29982C17.8946 6.48736 18 6.74171 18 7.00693C18 7.27214 17.8946 7.5265 17.7071 7.71403C17.5196 7.90157 17.2652 8.00693 17 8.00693H14.03L13.03 12.0069H15C15.2652 12.0069 15.5196 12.1123 15.7071 12.2998C15.8946 12.4874 16 12.7417 16 13.0069C16 13.2721 15.8946 13.5265 15.7071 13.714C15.5196 13.9016 15.2652 14.0069 15 14.0069H12.53L11.97 16.2489C11.94 16.3783 11.8846 16.5003 11.8069 16.608C11.7292 16.7157 11.6309 16.8068 11.5177 16.8761C11.4044 16.9454 11.2785 16.9914 11.1473 17.0115C11.016 17.0316 10.8821 17.0254 10.7533 16.9932C10.6245 16.961 10.5034 16.9035 10.3971 16.824C10.2907 16.7445 10.2013 16.6446 10.134 16.5302C10.0666 16.4158 10.0228 16.2891 10.0049 16.1575C9.98707 16.026 9.9956 15.8922 10.03 15.7639L10.47 14.0069H7.53L6.97 16.2489C6.94001 16.3783 6.88457 16.5003 6.80691 16.608C6.72925 16.7157 6.63092 16.8068 6.51767 16.8761C6.40441 16.9454 6.2785 16.9914 6.14726 17.0115C6.01603 17.0316 5.88211 17.0254 5.75331 16.9932C5.62451 16.961 5.50341 16.9035 5.39707 16.824C5.29074 16.7445 5.2013 16.6446 5.13397 16.5302C5.06664 16.4158 5.02277 16.2891 5.00492 16.1575C4.98707 16.026 4.9956 15.8922 5.03 15.7639L5.47 14.0069H3C2.73478 14.0069 2.48043 13.9016 2.29289 13.714C2.10536 13.5265 2 13.2721 2 13.0069C2 12.7417 2.10536 12.4874 2.29289 12.2998C2.48043 12.1123 2.73478 12.0069 3 12.0069H5.97L6.97 8.00693H5C4.73478 8.00693 4.48043 7.90157 4.29289 7.71403C4.10536 7.5265 4 7.27214 4 7.00693C4 6.74171 4.10536 6.48736 4.29289 6.29982C4.48043 6.11228 4.73478 6.00693 5 6.00693H7.47L8.03 3.76393C8.09445 3.50667 8.25846 3.28555 8.48594 3.14922C8.71342 3.01288 8.98574 2.97249 9.243 3.03693ZM9.03 8.00693L8.03 12.0069H10.968L11.968 8.00693H9.031H9.03Z" fill="#FFCC66"/></svg>',
              className: 'linkSvg',
              maintainCase: false,
              removeAccents: false,
              isIconAfterHeader: true,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-abbr',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2000,
              quality: 100,
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://blog.vicente015.dev',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-color-function'), require('cssnano')()],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-XXXX-Y',
        // Puts tracking script in the head instead of the body
        head: true,
        // IP anonymization for GDPR compliance
        anonymize: true,
        // Disable analytics for users with `Do Not Track` enabled
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['/preview/**'],
        // Specifies what percentage of users should be tracked
        sampleRate: 100,
        // Determines how often site speed tracking beacons will be sent
        siteSpeedSampleRate: 10,
      },
    },
  ],
};
