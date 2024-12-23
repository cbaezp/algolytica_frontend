import useTranslation from "next-translate/useTranslation";
import { Container } from "./Container";

export function Faqs() {
  const { t } = useTranslation("index");
  const faqs = [
    [
      {
        question: `${t("FAQ1")}`,
        answer: `${t("FAQ1Text")}`,
      },

      {
        question: `${t("FAQ2")}`,
        answer: `${t("FAQ2Text")}`,
      },
      // {
      //   question: "?",
      //   answer: "Absolutely, I am happy to take your money in all forms.",
      // },
    ],
    [
      {
        question: `${t("FAQ3")}`,
        answer: `${t("FAQ3Text")}`,
      },
      {
        question: `${t("FAQ4")}`,
        answer: `${t("FAQ4Text")}`,
      },
      {
        question: `${t("FAQ5")}`,
        answer: `${t("FAQ5Text")}`,
      },
    ],
    [
      {
        question: `${t("FAQ6")}`,
        answer: `${t("FAQ6Text")}`,
      },
      {
        question: `${t("FAQ7")}`,
        answer: `${t("FAQ7Text")}`,
      },
      // {
      //   question: `${t("FAQ8")}`,
      //   answer: `${t("FAQ8Text")}`,
      // },
    ],
  ];
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-[#0f131f] py-20 sm:py-32 bg-gradient-to-t from-cyan-900 via-sky-900 to-[#0f131f]"
    >
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-white sm:text-4xl"
          >
            {t("FAQTitle")}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-200">
            {t("FAQSubtitle")}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-100">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-300">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
