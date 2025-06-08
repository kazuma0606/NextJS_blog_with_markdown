import { getAllPostsMeta, getPostBySlug } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

interface Params {
  slug: string
}

export async function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug)
  return (
    <main className="container mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{formatDate(post.date)}</p>
      <article
        className="prose prose-gray"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  )
}
