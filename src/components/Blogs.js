import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { useEffect } from "react";
export default function Blog({ posts }) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Crunching the Numbers: Insights into the World of Sports Analytics
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            From data-driven strategies to cutting-edge technology, stay ahead
            of the game with our comprehensive coverage of the intersection
            between sports and analytics.
          </p>
          <div className="mt-16 space-y-20 lg:mt-15 lg:space-y-20">
            {posts.map((post, id) => {
              //extract slug and frontmatter
              const { slug, frontmatter } = post;
              //extract frontmatter properties
              const {
                title,
                description,
                author,
                category,
                date,
                bannerImage,
                authorImage,
                tags,
              } = frontmatter;

              //JSX for individual blog listing
              return (
                <article
                  key={title}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      src={bannerImage}
                      alt="post-image"
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={date} className="text-gray-500">
                        {date}
                      </time>
                      <p className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">
                        {category}
                      </p>
                    </div>
                    <Link href={`/posts/${slug}`}>
                      <div className="group relative max-w-xl">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <span className="absolute inset-0" />

                          <h1>{title}</h1>
                        </h3>
                        <p className="mt-5 text-sm leading-6 text-gray-600">
                          {description}
                        </p>
                      </div>
                    </Link>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        <img
                          src={authorImage}
                          alt="author-image"
                          className="h-10 w-10 rounded-full bg-gray-700 p-1"
                        />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <span className="absolute inset-0" />
                            {author}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// //Generating the Static Props for the Blog Page
// export async function getStaticProps() {
//   // get list of files from the posts folder
//   const files = fs.readdirSync("posts");
//   console.log(files);

//   // get frontmatter & slug from each post
//   const posts = files.map((fileName) => {
//     const slug = fileName.replace(".md", "");
//     const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");

//     const { data: frontmatter } = matter(readFile);

//     return {
//       slug,
//       frontmatter,
//     };
//   });

//   // Return the pages static props
//   return {
//     props: {
//       posts,
//     },
//   };
// }
