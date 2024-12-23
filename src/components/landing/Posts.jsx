import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export function Posts() {
  let { t } = useTranslation("index");
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const currentLocale = locale || defaultLocale;

  const posts = [
    {
      title: `${t("articleTitle1")}`,
      href: `${locale}/blog`,
      category: { name: `${t("aticle")}`, href: "#" },
      description: `${t("articleDescription1")}`,
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      readingTime: "6 min",
      author: {
        name: "Algolytica",
        href: `${locale}/blog`,
        imageUrl:
          "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      },
    },
    {
      title: `${t("articleTitle2")}`,
      href: `${locale}/blog`,
      category: { name: `${t("aticle")}`, href: "#" },
      description: `${t("articleDescription2")}`,
      date: "Mar 10, 2020",
      datetime: "2020-03-10",
      imageUrl:
        "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      readingTime: "4 min",
      author: {
        name: "Algolytica",
        href: `${locale}/blog`,
        imageUrl:
          "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      },
    },
    {
      title: `${t("articleTitle3")}`,
      href: `${locale}/blog`,
      category: { name: `${t("aticle")}`, href: "#" },
      description: `${t("articleDescription3")}`,
      date: "Feb 12, 2020",
      datetime: "2020-02-12",
      imageUrl:
        "https://images.unsplash.com/photo-1617336234255-2183aedcafb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      readingTime: "11 min",
      author: {
        name: "Algolytica",
        href: `${locale}/blog`,
        imageUrl:
          "https://images.unsplash.com/photo-1580748163492-12ac3bea3aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      },
    },
  ];

  return (
    <section
      id="posts"
      aria-label="What our customers are saying"
      className="bg-[#0f131f]"
    >
      <div className="relative bg-[#0f131f] px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-[#0f131f] sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
              {t("articleSectionTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-400 sm:mt-4">
              {t("articleSectionSubtitle")}
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3 ">
            {posts.map((post) => (
              <div
                key={post.title}
                className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:scale-105 transition duration-300 ease-in-out transform hover:shadow-2xl cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={post.imageUrl}
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-[#141b2a] p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-cyan-600">
                      <a href={post.category.href} className="hover:underline">
                        {post.category.name}
                      </a>
                    </p>
                    <a href={post.href} className="mt-2 block">
                      <p className="text-xl font-semibold text-white">
                        {post.title}
                      </p>
                      <p className="mt-3 text-base text-gray-200">
                        {post.description}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
