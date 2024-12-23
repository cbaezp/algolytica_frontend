import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "../hocs/Layout";
const Blog = dynamic(() => import("../components/Blogs"), {
  ssr: false,
});

// The Blog Page Content
export default function Blogs({ posts }) {
  return (
    <Layout
      title={"Articles | Algolytica"}
      content={
        "From data-driven strategies to cutting-edge technology, stay ahead of the game with our comprehensive coverage of the intersection between sports and analytics."
      }
    >
      <Blog posts={posts} />
    </Layout>
  );
}
export async function getStaticProps({ locale }) {
  // Define the path for the language-specific posts directory
  const postsDirectory = `posts/${locale}`;

  // Check if the directory exists, if not, fall back to the default language
  const dirExists = fs.existsSync(postsDirectory);
  const dirPath = dirExists ? postsDirectory : `posts/en`;

  // get list of files from the posts folder of the current locale
  const files = fs.readdirSync(dirPath);

  // get frontmatter & slug from each post in the specific language folder
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`${dirPath}/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  // Return the pages static props with the posts retrieved from the correct locale
  return {
    props: {
      posts, // Make sure this variable is defined in the same scope
      locale,
    },
  };
}
