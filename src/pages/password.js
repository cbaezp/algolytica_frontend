import { Fragment, useState } from "react";
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

const subNavigation = [
  {
    name: "My Account",
    href: "/myaccount",
    icon: UserCircleIcon,
    current: false,
  },
  { name: "Settings", href: "/settings", icon: CogIcon, current: false },
  { name: "Password", href: "/password", icon: KeyIcon, current: true },
  //   { name: "Notifications", href: "#", icon: BellIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PasswordUpdate() {
  const user = useSelector((state) => state.auth.user);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);
  const [updateError, setUpdateError] = useState(undefined);

  const updatePasswordRequest = async (passwordDetails) => {
    const response = await fetch("/api/account/password/", {
      method: "POST",
      body: JSON.stringify(passwordDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      setSuccessfullyUpdated(true);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setUpdateError(undefined);
    } else {
      setUpdateError(data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordDetails = {
      current: password,
      new: newPassword,
      cofirmation: confirmPassword,
    };
    updatePasswordRequest(passwordDetails);
  };

  return (
    <LayoutLogged title={"Account Password"} content={"Account Password"}>
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
                    Password
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
                {user.social_provider ? (
                  <div className="lg:col-span-9 flex items-center justify-center py-12">
                    <p className="text-white text-center text-lg">
                      You signed up through {user.social_provider}, so you must visit {user.social_provider} to update your password.
                    </p>
                  </div>
                ) : (

                  <form
                    className="divide-y divide-cyan-500/30 lg:col-span-9"
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    {/* Account Details */}
                    <div className="divide-y divide-cyan-500/30 pt-6">
                      <div className="px-4 sm:px-6">
                        <div>
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-cyan-300">
                              Change my password
                            </h3>
                          </div>
                          <div className="mt-5 border-t border-cyan-500/30">
                            <label className="text-gray-100 text-md">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                              name="password"
                              minLength="8"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <label className="text-gray-100 text-md">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                              name="newPassword"
                              minLength="8"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                            <label className="text-gray-100 text-md">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="block w-full rounded-lg border-cyan-300/50 py-2 px-4 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-[#0f131f] mb-3 mt-2"
                              name="confirmPassword"
                              minLength="8"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />

                            {updateError && (
                              <ul className="list-disc list-inside">
                                {Object.entries(updateError.error).map(
                                  ([key, value]) =>
                                    value.length > 0 && (
                                      <li
                                        key={key}
                                        className="text-sm text-gray-200"
                                      >
                                        {value}
                                      </li>
                                    )
                                )}
                              </ul>
                            )}
                            {successfullyUpdated ? (
                              <span className="items-center flex justify-center text-green-500 mb-2">
                                Password successfully updated!
                              </span>
                            ) : (
                              <button
                                type="submit"
                                className="w-full text-center py-2 rounded-xl bg-cyan-500 text-white hover:bg-green-dark focus:outline-none hover:bg-white hover:text-cyan-500 mt-6 disabled:bg-[#0f131f] disabled:text-gray-800"
                              >
                                Send
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </LayoutLogged>
  );
}
