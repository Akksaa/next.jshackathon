import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MessageCircle, User } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const BlogDetail = async ({params}:{params:{slug:string}}) => {
    const blog = await client.fetch(`
    *[ _type == "foodBlog" && slug.current == "${params.slug}"][0]{
        _id,
        quote,
        author,
        _createdAt,
        title,
        images[] {asset -> {url}},
        description1,
        description2,
        slug
        }
    `);
    console.log(blog)
  return (
    <article 
    key={blog._id}
    className="max-w-4xl mx-auto px-4 py-8">
    
      <div className="relative w-full h-[520px] mb-4">
        <Image
          src={urlFor(blog.images[0]).url()}
          alt="Blog featured image"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 text-[16px] text-gray-600 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primYellow" />
            <span>{new Date(blog._createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
                })}
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <MessageCircle className="w-4 h-4 text-primYellow" />
            <span>3</span>
          </div>
          <div className="flex items-center gap-2 ">
            <User className="w-4 h-4 text-primYellow" />
            <span>{blog.author}</span>
          </div>
        </div>
        <h1 className="text-[18px] md:text-[24px] font-bold mb-4 openSans">
          {blog.title}
        </h1>
      </div>

      <div className="prose max-w-none font-normal text-[16px] inter text-zinc-800 mb-8">
        <p className="mb-4">
          {blog.description1}
        </p>

        <blockquote className="bg-primYellow p-6 my-8 openSans">
          <p className="text-[24px] text-white">
            {blog.quote}
          </p>
        </blockquote>

        <p className="mb-4">
          {blog.description2}
        </p>

        <div className="relative w-full h-[300px] my-8">
          <Image
            src={urlFor(blog.images[1]).url()}
            alt="Secondary blog image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-8 pb-8 border-b">
        <span className="font-semibold openSans">Tags:</span>
        {['Restaurant', 'Dinner', 'Pizza', 'Yummy'].map((tag) => (
          <Link
            key={tag}
            href={`/tag/${tag.toLowerCase()}`}
            className="text-gray-600 inter hover:text-primYellow"
          >
            {tag}
          </Link>
        ))}
      </div>


      <section>
        <h2 className="lg:text-2xl text-lg font-bold mb-6 openSans">Post a comment</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 inter">
            <div>
              <label htmlFor="name" className="block mb-2 text-[12px] lg:text-[16px]">Name*</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border focus:ring-1 outline-none focus:ring-primYellow focus:border-primYellow"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-[12px] lg:text-[16px]">Email*</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border focus:ring-1 outline-none focus:ring-primYellow focus:border-primYellow"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block mb-2 text-[12px] lg:text-[16px]">Write a comment</label>
            <textarea
              id="comment"
              rows={6}
              className="w-full px-4 py-2 border focus:ring-1 outline-none focus:ring-primYellow focus:border-primYellow"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primYellow inter text-white px-6 py-3 text-[12px] lg:text-[16px] hover:bg-amber-400 transition-colors"
          >
            Post a comment
          </button>
        </form>
      </section>
    </article>
  );
};

export default BlogDetail;