import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Simple Online Weight Tracker - Daily Weight Log with CSV Export`,
    description: `Free online weight tracker for simple daily weight logging. Track your weight log with beautiful charts and CSV export.`,
    siteUrl: `https://bodyweighttracker.com`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap"
  ]
};

export default config;
