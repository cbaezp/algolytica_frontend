import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
export default function Access() {
  const { t } = useTranslation("dashboard");
  const categories = [
    {
      name: `${t("imageCards.card")}`,
      href: "/ev-pro",
      imageSrc:
        "https://images.unsplash.com/photo-1611000273610-f4fb9c7fd0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: `${t("imageCards.card1")}`,
      href: "/tracker-ev",
      imageSrc:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: `${t("imageCards.card2")}`,
      href: "/arbitrage-pro",
      imageSrc:
        "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: `${t("imageCards.card3")}`,
      href: "/tracker-arbitrage",
      imageSrc:
        "https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: `${t("imageCards.card4")}`,
      href: "/settings",
      imageSrc:
        "https://images.unsplash.com/photo-1545151414-8a948e1ea54f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
  ];
  return (
    <div className="bg-[#0f131f]">
      <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-2xl p-6 hover:opacity-70 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <Image
                        src={category.imageSrc}
                        alt=""
                        width="56"
                        height="80"
                        sizes="100vw"
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">
                      {category.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
