import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useActiveSports from "../hooks/useActiveSports";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownFilter({ setLeague, setIsLeagueActive }) {
  const activeLeagues = useActiveSports();

  const [selected, setSelected] = useState(activeLeagues[0]);

  const handleSelected = (league) => {
    setSelected(league);
    setLeague(league.name);
    setIsLeagueActive(league.is_active);
  };

  return (
    <Listbox value={selected} onChange={(e) => handleSelected(e)}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-cyan-600 bg-[#0F2D3D] py-2 pl-3 pr-10 text-left shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 sm:text-sm ">
              <span
                className={
                  selected.is_active
                    ? "block truncate text-gray-200"
                    : "block truncate text-gray-400"
                }
              >
                {selected.display_name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {activeLeagues.map((league, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white bg-cyan-600"
                          : league.is_active
                          ? "text-gray-900"
                          : "text-gray-400",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={league}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {league.display_name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-cyan-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
