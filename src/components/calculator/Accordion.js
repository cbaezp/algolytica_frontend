import { MinusIcon, PlusIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Collapse } from "react-collapse";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
export default function Accordion({ open, toggle, title, description, link }) {
  const { t } = useTranslation("ev");
  return (
    <div className="pl-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <p
          className={
            open
              ? "text-gray-500 text-sm hover:text-gray-500"
              : "text-gray-400 text-sm hover:text-cyan-500"
          }
        >
          {title}
        </p>
        <div className="pr-4 hover:text-cyan-500">
          {open ? (
            <MinusIcon className="h-4 w-4 text-cyan-600" />
          ) : (
            <PlusIcon className="h-4 w-4 text-gray-500 hover:text-cyan-500" />
          )}
        </div>
      </div>
      <Collapse isOpened={open}>
        <div className="text-sm pt-1 text-gray-500 flex">
          <Link href={link} className="cursor-pointer hover:text-cyan-500">
            {description}
          </Link>
        </div>
      </Collapse>
    </div>
  );
}
