import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Disclosure, Menu, Transition, Popover } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = new useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(logout());
    router.push("/");
  };
  const userNavigation = [{ name: "Login", href: "/login", onclick: "" }];

  const navigation = [
    {
      name: `${t("Features")}`,
      href: "/#features",
      current: false,
      mobileOnly: false,
    },
    {
      name: `${t("Pricing")}`,
      href: "/#pricing",
      current: false,
      mobileOnly: false,
    },
    {
      name: `${t("Articles")}`,
      href: "/#posts",
      current: false,
      mobileOnly: false,
    },
    { name: `${t("FAQ")}`, href: "/#faq", current: false, mobileOnly: false },
    {
      name: `${t("Contact")}`,
      href: "/#contact",
      current: false,
      mobileOnly: false,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-[#0f131f]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-black">
              <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={"/images/Logo.svg"}
                      width={149.6}
                      height="0"
                      sizes="100vw"
                      className="w h-auto"
                      alt={"logo-Algolytica"}
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map(
                        (item) =>
                          !item.mobileOnly && (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-black hover:text-cyan-500",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    {router.pathname !== "/subscribe" && (
                      <div>
                        <Link
                          className="flex max-w-xs items-center focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-white hover:bg-black hover:text-cyan-500 text-sm font-medium p-2 rounded-md border border-cyan-500"
                          href="/login"
                        >
                          Login <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-b border-gray-700 md:hidden">
            <div className="space-y-1 px-2 py-3 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={item.onclick}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
