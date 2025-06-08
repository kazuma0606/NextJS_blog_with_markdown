export interface BlogPost {
  id: string
  title: string
  slug: string
  date: string
  summary: string
  content?: string
  coverImage?: string
  author?: {
    name: string
    avatar?: string
  }
}
