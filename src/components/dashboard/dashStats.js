import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

const stats = [
  {
    name: "Total Pending",
    stat: "71,897",
    previousStat: "70,946",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Pending DEV",
    stat: "58.16%",
    previousStat: "56.14%",
    change: "2.02%",
    changeType: "increase",
  },
  {
    name: "Pending ROI",
    stat: "24.57%",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardStats() {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-200  bg-[#155E75] rounded-t-2xl p-2 text-center">
        Last 30 days
      </h3>
      <dl className="grid grid-cols-1 divide-y divide-cyan-500/10 overflow-hidden rounded-b-2xl bg-login-bg shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-300">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-gray-300">
                {item.stat}
              </div>

              <div
                className={classNames(
                  item.changeType === "increase"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                  "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
