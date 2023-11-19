// https://medium.com/@brettdewoody/inlining-svgs-in-eleventy-cffb1114e7b
eleventyConfig.addNunjucksAsyncShortcode('svgIcon', async (src, alt, sizes) => {
    let metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    })
    return metadata.svg[0].buffer.toString()
  })
