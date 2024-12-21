import {
  PlusIcon,
  ChartBarIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

const items = [
  {
    name: "Positive EV",
    description: "We’ll replace it with a new one",
    icon: PlusIcon,
    href: "/ev-pro",
  },
  {
    name: "Arbitrage",
    description: "Send it back for free",
    icon: TableCellsIcon,
    href: "/arbitrage-pro",
  },
  {
    name: "Analytics (soon)",
    description: "The shipping is on us",
    icon: ChartBarIcon,
    href: "#",
  },
];

export default function DashboardIcons() {
  return (
    <div className="bg-basketball-dark rounded-2xl">
      <h2 className="sr-only">Our items</h2>
      <div className="mx-auto max-w-7xl divide-y divide-cyan-500 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x lg:py-10">
        {items.map((object, objectIdx) => (
          <div
            key={objectIdx}
            className="py-8 lg:w-1/3 lg:flex-none lg:py-0 flex justify-center"
          >
            <a
              className="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8 hover:scale-110 group cursor-pointer"
              href={object.href}
            >
              <object.icon
                className="h-8 w-8 flex-shrink-0 text-white group-hover:text-cyan-500"
                aria-hidden="true"
              />
              <div className="ml-4 flex flex-auto flex-col-reverse ">
                <h3 className="font-medium text-gray-200 group-hover:text-cyan-500">
                  {object.name}
                </h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
