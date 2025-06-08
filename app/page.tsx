import BlogCard from "@/components/blog-card"
import Hero from "@/components/hero"
import { getAllPostsMeta } from "@/lib/posts"

export default function Home() {
  const posts = getAllPostsMeta().slice(0, 3)
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}
