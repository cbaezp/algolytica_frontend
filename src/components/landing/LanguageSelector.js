import { useRouter } from "next/router";
export default function LanguageSelector() {
  let router = useRouter();
  return (
    <div className="flex items-center justify-between ml-5">
      <select
        id="language"
        name="language"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-12 text-gray-200 bg-[#0f131f] ring-1 ring-inset ring-cyan-300/50 focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6"
        value={router.locale}
        onChange={(e) => {
          router.push(router.asPath, router.asPath, {
            locale: e.target.value,
          });
        }}
      >
        {router.locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
    </div>
  );
}
