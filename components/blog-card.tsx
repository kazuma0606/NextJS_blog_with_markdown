import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={post.coverImage || `/placeholder.svg?height=400&width=600`}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{formatDate(post.date)}</p>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}
