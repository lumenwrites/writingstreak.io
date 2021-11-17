import sharp from 'sharp'
import { join } from 'path'
import { readFileSync, readdirSync, writeFileSync, lstatSync, existsSync, mkdirSync } from 'fs'
import { parseFrontmatter, renderMDX } from './mdx.mjs'
import config from '../../config.json'
const contentdir = config.contentdir
const imagedir = join(process.cwd(), './public/illustrations')

async function processImagesInsideFolder(folderPath, folderName, outputFolder) {
  for (const imageFileName of readdirSync(folderPath)) {
    const isImage = ['.jpg', '.jpeg', '.png'].some((ext) => imageFileName.includes(ext))
    if (!isImage) continue
    console.log('Processing Image:', imageFileName)
    const filePathNoExtension = imageFileName.split('.').slice(0, -1).join('.')
    // https://sharp.pixelplumbing.com/api-resize
    await sharp(`${folderPath}/${imageFileName}`)
      .resize(750 * 2, 500 * 2, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .webp({ lossless: true }) // quality: 95,
      // .withMetadata({ density: 144 })
      .toFile(`${outputFolder}/${filePathNoExtension}.webp`)
  }
}

function processAllImageFolders(contentTypeFolder) {
  // posts, courses, etc
  for (const folderName of readdirSync(contentTypeFolder)) {
    const folderPath = `${contentTypeFolder}/${folderName}`
    if (!lstatSync(folderPath).isDirectory()) continue // skip markdown files
    const outputFolder = `${imagedir}/${folderName}`
    if (!existsSync(outputFolder)) mkdirSync(outputFolder)
    console.log("Source Folder:", folderPath)
    console.log("Output Folder:", outputFolder)
    processImagesInsideFolder(folderPath, folderName, outputFolder)
  }
}

processAllImageFolders(`${contentdir}/posts`)
