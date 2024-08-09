// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SHARE_URL || "https://letsworkwise.com/",
  generateRobotsTxt: true, // (optional) Generate a robots.txt file
  priority: 1.0,
  generateIndexSitemap: "false", // (optional) Filename for generated sitemap
  // Additional options can be added here
};
