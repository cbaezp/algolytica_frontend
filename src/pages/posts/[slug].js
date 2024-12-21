import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import path from "path";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

import Layout from "../../hocs/Layout.js";
// The page for each post
export default function Post({ frontmatter, content }) {
  const { title, author, category, date, bannerImage, tags, description } =
    frontmatter;

  return (
    <Layout>
      <main>
        <div className="bg-white py-32 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <p className="text-base font-semibold leading-7 text-gray-300">
              {date} | {category}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-6 text-xl leading-8">
              <p>{description}</p>
            </p>

            <figure className="mt-16">
              <img
                className="aspect-video rounded-xl bg-gray-50 object-cover"
                src={bannerImage}
                alt=""
              />
              {/* <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
              <InformationCircleIcon
                className="mt-0.5 h-5 w-5 flex-none text-gray-300"
                aria-hidden="true"
              />
              Faucibus commodo massa rhoncus, volutpat.
            </figcaption> */}
            </figure>
            <div className="mt-16 max-w-2xl">
              <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />

              {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Everything you need to get up and running
              </h2>
              <p className="mt-6">
                Purus morbi dignissim senectus mattis adipiscing. Amet, massa
                quam varius orci dapibus volutpat cras. In amet eu ridiculus leo
                sodales cursus tristique. Tincidunt sed tempus ut viverra
                ridiculus non molestie. Gravida quis fringilla amet eget dui
                tempor dignissim. Facilisis auctor venenatis varius nunc, congue
                erat ac. Cras fermentum convallis quam.
              </p>
              <p className="mt-8">
                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                Id dolor praesent donec est. Odio penatibus risus viverra tellus
                varius sit neque erat velit.
              </p> */}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  let paths = [];
  locales.forEach((locale) => {
    const postsDirectory = path.join("posts", locale);
    const files = fs.readdirSync(postsDirectory);
    // Generate a path for each file within the locale directory
    files.forEach((fileName) => {
      paths.push({
        params: { slug: fileName.replace(".md", "") },
        locale: locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug }, locale }) {
  const postsDirectory = path.join("posts", locale);
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileName = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileName);

  return {
    props: {
      frontmatter,
      content,
    },
  };
}
