import { Fragment, useState } from "react";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import LayoutLogged from "../hocs/LayoutLogged";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import NavbarLogged from "../components/NavbarLogged";
import Link from "next/link";
const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Jobs", href: "#", current: false },
  { name: "Applicants", href: "#", current: false },
  { name: "Company", href: "#", current: false },
];
const subNavigation = [
  { name: "My Account", href: "#", icon: UserCircleIcon, current: true },
  { name: "Settings", href: "/settings", icon: CogIcon, current: false },
  { name: "Password", href: "/password", icon: KeyIcon, current: false },
  //   { name: "Notifications", href: "#", icon: BellIcon, current: false },
  {
    name: "Subscription",
    href: "https://billing.stripe.com/p/login/6oEeXuclVdg8f2EaEE",
    icon: CreditCardIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <LayoutLogged title={"My Acccount"} content={"Account settings"}>
        <div className="mb">
          <Disclosure
            as="div"
            className="relative overflow-hidden bg-[#0F2D3D] pb-32"
          >
            {({ open }) => (
              <>
                <div
                  aria-hidden="true"
                  className={classNames(
                    open ? "bottom-0" : "inset-y-0",
                    "absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0"
                  )}
                >
                  <div className="absolute inset-0 flex">
                    <div
                      className="h-full w-1/2"
                      style={{ backgroundColor: "#0F2D3D" }}
                    />
                    <div
                      className="h-full w-1/2"
                      style={{ backgroundColor: "#0F2D3D" }}
                    />
                  </div>
                  <div className="relative flex justify-center">
                    <svg
                      className="flex-shrink-0"
                      width={1750}
                      height={308}
                      viewBox="0 0 1750 308"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                        fill="#0F2D3D"
                      />
                      <path
                        d="M1465.84 308L16.816 0H1750v308h-284.16z"
                        fill="#0F2D3D"
                      />
                      <path
                        d="M1733.19 0L284.161 308H0V0h1733.19z"
                        fill="#0F2D3D"
                      />
                      <path
                        d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                        fill="#0F2D3D"
                      />
                    </svg>
                  </div>
                </div>
                <header className="relative py-10">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center border-b border-cyan-500/30">
                    <h1 className="text-2xl font-medium tracking-tight text-white mb-3">
                      My Account
                    </h1>
                  </div>
                </header>
              </>
            )}
          </Disclosure>

          <main className="relative -mt-32 bg-[#0F2D3D]">
            <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
              <div className="overflow-hidden rounded-lg bg-[#0F2D3D] shadow">
                <div className="divide-y divide-cyan-500/30 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                  <aside className="py-6 lg:col-span-3">
                    <nav className="space-y-1">
                      {subNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-cyan-900 border-cyan-500 text-white hover:bg-cyan-50 hover:text-cyan-700"
                              : "border-transparent text-cyan-500/30 hover:bg-cyan-500 hover:text-white",
                            "group px-3 py-2 flex items-center text-sm font-medium rounded-lg mr-4"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white group-hover:text-cyan-500"
                                : "text-cyan-500/30 group-hover:text-white",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </a>
                      ))}
                    </nav>
                  </aside>

                  <form
                    className="divide-y divide-cyan-500/30 lg:col-span-9"
                    action="#"
                    method="POST"
                  >
                    {/* Account Details */}
                    <div className="divide-y divide-cyan-500/30 pt-6">
                      <div className="px-4 sm:px-6">
                        <div>
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-cyan-300">
                              Account Details
                            </h3>
                          </div>
                          <div className="mt-5 border-t border-cyan-500/30">
                            <dl className="sm:divide-y sm:divide-cyan-500/30">
                              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                <dt className="text-sm font-medium text-gray-300">
                                  Username
                                </dt>
                                <dd className="mt-1 text-sm text-gray-200 sm:col-span-2 sm:mt-0">
                                  {user.username}
                                </dd>
                              </div>
                              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                <dt className="text-sm font-medium text-gray-300">
                                  Email
                                </dt>
                                <dd className="mt-1 text-sm text-gray-200 sm:col-span-2 sm:mt-0">
                                  {user.email}
                                </dd>
                              </div>
                              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                <dt className="text-sm font-medium text-gray-300">
                                  Subscription Status
                                </dt>
                                <dd className="mt-1 text-sm text-gray-200 sm:col-span-2 sm:mt-0">
                                  <span
                                    className={
                                      user.stripe_customer_plan == "pro"
                                        ? "text-white bg-cyan-500 text-semibold p-1 rounded-md"
                                        : "text-gray-200"
                                    }
                                  >
                                    Active - FREE :)
                                  </span>
                                </dd>
                              </div>
                              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                <dt className="text-sm font-medium text-gray-300">
                                  Password
                                </dt>
                                <dd className="mt-1 text-sm text-gray-200 sm:col-span-2 sm:mt-0">
                                  <Link
                                    href={"/password"}
                                    className=" hover:text-cyan-500"
                                  >
                                    Change password
                                  </Link>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutLogged>
      <Footer />
    </>
  );
}
