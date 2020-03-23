import fs from 'fs'
import hbs from 'handlebars'
import path from 'path'

import { promisify } from 'util'

const baseTemplatePath = path.resolve(__dirname, '..', 'Templates')

interface GetTempalteParams {
  template: string
  context?: Record<string, any>
}
const get = async ({
  template,
  context = {}
}: GetTempalteParams): Promise<Record<string, string>> => {
  const htmlPath = path.join(baseTemplatePath, 'html', `${template}.html`)
  const textPath = path.join(baseTemplatePath, 'text', `${template}.txt`)

  const htmlRaw = (await promisify(fs.readFile)(htmlPath)).toString()
  const textRaw = (await promisify(fs.readFile)(textPath)).toString()

  const html = hbs.compile(htmlRaw)(context)
  const text = hbs.compile(textRaw)(context)

  return { html, text }
}

export default { get }
