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
import NavbarNotificationBell from "./NavbarNotificationBell";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavbarLogged = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = new useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(logout());
    router.push("/");
  };

  const navigation = [
    {
      name: `${t("loggedNavBar.dashboard")}`,
      href: "dashboard",
      current: false,
      mobileOnly: false,
    },
    {
      name: `${t("loggedNavBar.positiveEv")}`,
      href: "ev-pro",
      current: false,
      mobileOnly: false,
    },
    {
      name: `${t("loggedNavBar.arbitrage")}`,
      href: "arbitrage-pro",
      current: false,
      mobileOnly: false,
    },
    {
      name: `${t("loggedNavBar.blogs")}`,
      href: "blog",
      current: false,
      mobileOnly: false,
    },
    {
      name: `${t("loggedNavBar.trackerEvMobile")}`,
      href: "tracker-ev",
      current: false,
      mobileOnly: true,
    },
    {
      name: `${t("loggedNavBar.trackerArbMobile")}`,
      href: "tracker-arbitrage",
      current: false,
      mobileOnly: true,
    },
  ];

  const tracker = [
    {
      name: `${t("loggedNavBar.positiveEv")}`,
      description: `${t("loggedNavBar.trackerEv")}`,
      href: "tracker-ev",
    },
    {
      name: `${t("loggedNavBar.arbitrage")}`,
      description: `${t("loggedNavBar.trackerArb")}`,
      href: "tracker-arbitrage",
    },
  ];
  const userNavigation = [
    {
      name: `${t("loggedNavBar.myAccount")}`,
      href: "/myaccount",
      onclick: "",
    },
    { name: `${t("loggedNavBar.settings")}`, href: "/settings", onclick: "" },
    { name: `${t("loggedNavBar.logout")}`, href: "#", onclick: logoutHandler },
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
                      alt={"logo-odds73"}
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

                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={classNames(
                                open ? "text-white" : "text-gray-300 ",
                                "group inline-flex items-center rounded-md text-sm font-medium hover:text-white"
                              )}
                            >
                              <span className="ml-2">
                                {t("loggedNavBar.tracker")}
                              </span>
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "text-gray-600" : "text-gray-400",
                                  "ml-2 h-5 w-5 group-hover:text-cyan-500 group-hover:animate-bounce"
                                )}
                                aria-hidden="true"
                              />
                            </Popover.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ">
                                  <div className="relative grid gap-6 bg-[#0f131f] px-5 py-6 sm:gap-8 sm:p-8">
                                    {tracker.map((item) => (
                                      <a
                                        key={item.name}
                                        href={item.href}
                                        className="-m-3 block rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-700 "
                                      >
                                        <p className="text-sm font-medium text-gray-300">
                                          {item.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.description}
                                        </p>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6 ">
                    <NavbarNotificationBell />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800 ">
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon
                            className="h-8 w-8 text-[#155E7580] hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#0f131f] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-[#0f131f]" : "",
                                    "block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                                  )}
                                  onClick={item.onclick}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
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
              <div className="flex items-center px-5 justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserCircleIcon
                      className="h-10 w-10 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.username}
                    </div>
                  </div>
                </div>

                <NavbarNotificationBell />
              </div>
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

export default NavbarLogged;
