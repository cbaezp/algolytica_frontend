import Link from "next/link";
import clsx from "clsx";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 invisible lg:visible",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none invisible lg:visible",
};

const variantStyles = {
  solid: {
    slate:
      "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
    blue: "bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
    white:
      "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
    blue: "ring-cyan-200 text-cyan-400 hover:text-cyan-500 hover:bg-white hover:ring-cyan-300 active:bg-cyan-100 active:text-cyan-400 focus-visible:outline-blue-600 focus-visible:ring-cyan-300",
  },
};

export function Button({
  variant = "solid",
  color = "blue",
  className,
  href,
  ...props
}) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
}
