import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BlogPost } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa6";

async function Blogsidebar() {
    const blogs = await client.fetch(`
            *[ _type == "foodBlog"]{
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
  return (
    <div>
      <aside className="w-full md:w-48 lg:w-80 lg:p-6 p-3 space-y-8 hidden md:flex flex-col">
      <div className="flex flex-col items-center text-center border-2 p-2">
        <div className="relative w-24 h-24 mb-4">
          <Image 
            src="/author.png"
            alt="Prince Walter"
            className="rounded-full"
            fill
          />
        </div>
        <h3 className="lg:text-xl text-lg font-semibold mb-2 openSans">Prince Walter</h3>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="w-4 h-4 fill-yellow-400 text-yellow-400" 
            />
          ))}
        </div>
        <p className="lg:text-sm text-[10px] text-gray-600 mb-2">Blogger/Photographer</p>
        <p className="lg:text-sm text-[10px] text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </p>
        <div className="flex lg:gap-4 gap-2 text-gray-600">
          <a href="#" className="hover:text-orange-500">
            <span className="sr-only">Facebook</span>
            <svg className="lg:w-5 w-3 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/></svg>
          </a>
          <a href="#" className="hover:text-orange-500">
            <span className="sr-only">Twitter</span>
            <svg className="lg:w-5 w-3 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
          <a href="#" className="hover:text-orange-500">
            <span className="sr-only">Instagram</span>
            <svg className="lg:w-5 w-3 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
          </a>
        </div>
      </div>

      <div className="border-2 p-2">
        <h3 className="lg:text-lg text-sm font-semibold mb-4 openSans ">Recent Post</h3>
        <div className="lg:space-y-4 space-y-2">
          {blogs.map((blog:BlogPost) => (
            <Link href="#" key={blog._id} className="flex gap-3 group pb-2 border-b">
              <div className="relative lg:w-20 w-10 lg:h-20 h-10 flex-shrink-0">
                <Image
                  src={urlFor(blog.images[0]).url()}
                  alt="Recent post"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                
                <p className="lg:text-sm text-[10px] text-gray-500">{new Date(blog._createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    })}
                </p>
                <h4 className="font-normal lg:text-lg text-[10px] group-hover:text-primYellow transition-colors duration-200">
                  {blog.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-2 p-2">
        <h3 className="lg:text-lg text-sm font-semibold mb-4 openSans">Filter By Menu</h3>
        <div className="lg:space-y-3 space-y-1">
          {[
            { name: 'Italian', count: 23 },
            { name: 'Burger Food', count: 45 },
            { name: 'Pizza', count: 14 },
            { name: 'Fresh Foods', count: 28 },
            { name: 'Soup', count: 15 }
          ].map((category) => (
            <div key={category.name} className="flex justify-between items-center group cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="relative lg:w-12 w-8 lg:h-12 h-8">
                  <Image
                    src="/img2.png"
                    alt={category.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <span className="group-hover:text-primYellow lg:text-lg text-[10px] transition-colors duration-200">{category.name}</span>
              </div>
              <span className="text-gray-500 lg:text-lg text-[10px]">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 p-2">
        <h3 className="lg:text-lg text-sm font-semibold openSans mb-4">Popular Tags</h3>
        <div className="flex inter flex-wrap gap-2">
          {['Breakfast', 'Fresh', 'Vegetable', 'Chicken', 'Food', 'Lunch', 'Dinner', 'Pizza'].map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full lg:text-sm text-[10px] hover:bg-primYellow hover:text-white cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="border-2 p-2">
        <h3 className="lg:text-lg text-sm font-semibold mb-4 openSans">Photo Gallery</h3>
        <div className="grid grid-cols-3 gap-2">
          {blogs.map((blog:BlogPost) => (
            <div key={blog._id} className="relative aspect-square">
              <Image
                src={urlFor(blog.images[1]).url()}
                alt={`Gallery photo ${blog}`}
                fill
                className="object-cover rounded-lg hover:opacity-80 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 p-2">
        <h3 className="lg:text-lg text-sm font-semibold mb-4 openSans">Follow Us</h3>
        <div className="flex lg:gap-4 gap-2">
          <FaInstagram/>
          <FaFacebook/>
          <FaTwitter/>
          <FaPinterest/>
          <FaYoutube/>
        </div>
      </div>
    </aside>
    </div>
  )
}

export default Blogsidebar
