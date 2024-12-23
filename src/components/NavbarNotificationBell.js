import { BellIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const NavbarNotificationBell = () => {
  const [evNotification, setEvNotification] = useState([]);
  const [arbNotification, setArbNotification] = useState([]);

  useEffect(() => {
    const fetchEvNotifications = async () => {
      try {
        const res = await fetch("/api/content/ev-bets-notification/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        setEvNotification(data);
      } catch (err) {
        return err;
      }
    };

    const fetchArbNotifications = async () => {
      try {
        const res = await fetch("/api/content/arb-bets-notification/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        setArbNotification(data);
      } catch (err) {
        return err;
      }
    };
    fetchEvNotifications();
    fetchArbNotifications();
  }, []);

  const updatedEvNotification = evNotification.map(
    ({ id, status_updated_automatically_user_notfied }) => {
      return {
        id,
        status_updated_automatically_user_notfied: true,
      };
    }
  );

  const updatedArbNotification = arbNotification.map(
    ({ id, status_updated_automatically_user_notfied }) => {
      return {
        id,
        status_updated_automatically_user_notfied: true,
      };
    }
  );

  const handleUpdate = () => {


    //Update the ev-bets
    const updateEvBetStatus = async () => {
      const response = await fetch("/api/content/ev-bets-notification/", {
        method: "PATCH",
        body: JSON.stringify(updatedEvNotification),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    //Update the ev-bets
    const updateArbBetStatus = async () => {
      const response = await fetch("/api/content/arb-bets-notification/", {
        method: "PATCH",
        body: JSON.stringify(updatedArbNotification),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    // Call function to update bet
    updateEvBetStatus();
    updateArbBetStatus();
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <span className="relative inline-block">
          <Menu.Button
            type="button"
            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={handleUpdate}
          >
            <span className="sr-only ">View notifications</span>

            <BellIcon
              className="h-6 w-6 text-[#155E7580] hover:text-cyan-500 "
              aria-hidden="true"
            />
          </Menu.Button>
          {evNotification.length > 0 && (
            <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full bg-cyan-500 ring-2 ring-white animate-pulse"></span>
          )}
        </span>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="py-1">
              <span className="text-gray-700 font-bold block px-4 py-2 text-sm">
                Updates
              </span>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 font-bold"
                        : "text-gray-700 font-bold",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    +EV
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    {evNotification.map((notification, index) => (
                      <Menu.Item key={index} as="div">
                        <ul>
                          <li className="text-gray-700 block px-4 py-2 text-sm ">
                            {" "}
                            {notification.title}{" "}
                          </li>
                        </ul>
                      </Menu.Item>
                    ))}
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 font-bold"
                        : "text-gray-700 font-bold",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Arbitrage
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    {arbNotification.map((arbnotification, index) => (
                      <Menu.Item key={index} as="div">
                        <ul>
                          <li className="text-gray-700 block px-4 py-2 text-sm">
                            {" "}
                            {arbnotification.title}{" "}
                          </li>
                        </ul>
                      </Menu.Item>
                    ))}
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
export default NavbarNotificationBell;
