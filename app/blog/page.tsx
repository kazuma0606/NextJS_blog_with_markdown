import Link from "next/link"
import { getAllPostsMeta } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Blog"
}

export default function BlogPage() {
  const posts = getAllPostsMeta()
  return (
    <main className="container mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
            {post.summary && <p className="text-gray-700">{post.summary}</p>}
          </li>
        ))}
      </ul>
    </main>
  )
}
