import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { capitalizeFirstLetter } from "../utilsFunc";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
export default function DetailsModal({
  openDetails,
  currentState,
  title,
  data,
  isSports = false,
}) {
  const [open, setOpen] = useState(currentState);
  const { t } = useTranslation("dashboard");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => openDetails(false)}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#0f131f] pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-1/5 sm:max-w-lg p-10">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">{t("sportList.close")}</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex justify-center">
                  <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-col items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-gray-200 mb-5"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <ul role="list" className="divide-y divide-gray-600">
                        {data.map((data, dataIdx) => (
                          <li
                            key={dataIdx}
                            className="py-4 flex justify-start items-center"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="min-w-0 flex-1">
                                {isSports ? (
                                  <div className="flex items-center">
                                    <Image
                                      className="mr-1"
                                      src={`/images/sports/${
                                        data.name.split("_")[0]
                                      }.svg`}
                                      alt={data.name.split("_")[0]}
                                      width="15"
                                      height="15"
                                    />
                                    <p className="truncate text-sm font-medium text-gray-400">
                                      {data.display_name}
                                    </p>{" "}
                                  </div>
                                ) : (
                                  <p className="truncate text-sm font-medium text-gray-400">
                                    {data.name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-7 sm:mt-4 flex justify-end">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-cyan-500/50  px-4 py-2 text-base font-medium text-cyan-500/50 shadow-sm hover:text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {t("sportList.close")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
