import fs from 'fs'
import path from 'path'

export interface PostMeta {
  title: string
  date: string
  slug: string
  summary?: string
}

export interface Post extends PostMeta {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

function parseFrontMatter(file: string) {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/m.exec(file)
  let data: Record<string, string> = {}
  let content = file
  if (match) {
    const yaml = match[1]
    content = match[2]
    yaml.split(/\r?\n/).forEach((line) => {
      const idx = line.indexOf(':')
      if (idx !== -1) {
        const key = line.slice(0, idx).trim()
        const value = line.slice(idx + 1).trim()
        data[key] = value.replace(/^"|"$/g, '')
      }
    })
  }
  return { data, content }
}

function markdownToHtml(src: string) {
  return src
    .split(/\r?\n/) 
    .map((line) => {
      if (/^#\s+/.test(line)) {
        return `<h1>${line.replace(/^#\s+/, '')}</h1>`
      }
      if (/^##\s+/.test(line)) {
        return `<h2>${line.replace(/^##\s+/, '')}</h2>`
      }
      if (line.trim() === '') return ''
      return `<p>${line}</p>`
    })
    .join('\n')
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const file = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = parseFrontMatter(file)
  return {
    title: data.title || '',
    date: data.date || '',
    slug: data.slug || slug,
    summary: data.summary || '',
    content: markdownToHtml(content),
  }
}

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}
