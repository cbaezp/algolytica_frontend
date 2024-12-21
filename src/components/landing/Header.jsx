import React, { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import LanguageSelector from "./LanguageSelector";

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-400"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  let { t } = useTranslation();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
        onClick={() => setOpenMobileMenu(!openMobileMenu)}
      >
        {({ open }) => <MobileNavIcon open={openMobileMenu} />}
      </Popover.Button>
      {openMobileMenu && (
        <Transition.Root>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-[#0f131f] p-4 text-lg tracking-tight text-gray-200 shadow-xl ring-1 ring-slate-900/5"
            >
              <MobileNavLink href="#features">
                {t("common:Features")}
              </MobileNavLink>
              <MobileNavLink href="#pricing">
                {t("common:Features")}
              </MobileNavLink>
              <MobileNavLink href="/blog">{t("common:Articles")}</MobileNavLink>
              <MobileNavLink href="#faq">{t("common:Features")}</MobileNavLink>
              <MobileNavLink href="#contact">
                {t("common:Features")}
              </MobileNavLink>
              <hr className="m-2 border-slate-300/40" />
              <MobileNavLink href="/login">Login</MobileNavLink>
              <MobileNavLink href="/register">
                {t("common:Register")}
              </MobileNavLink>
            </Popover.Panel>
          </Transition.Child>
        </Transition.Root>
      )}
    </Popover>
  );
}

export function Header() {
  let { t } = useTranslation();
  let router = useRouter();
  return (
    <header className="py-10 bg-[#0f131f]">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Image src={"/images/Logo.svg"} width={149.6} height={32.01} />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">{t("common:Features")}</NavLink>
              <NavLink href="#pricing">{t("common:Pricing")}</NavLink>
              <NavLink href="/blog">{t("common:Articles")}</NavLink>
              <NavLink href="#faq">{t("common:FAQ")}</NavLink>
              <NavLink href="#contact">{t("common:Contact")}</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-1">
            <div className="hidden md:block">
              <NavLink href="/login">Login</NavLink>
            </div>
            <Button href="/register" color="blue" variant="outline">
              <span>
                {t("common:Get Started")}{" "}
                <span className="hidden lg:inline">
                  {t("common:Get Started word")}
                </span>
              </span>
            </Button>

            <LanguageSelector />

            {/* Mobile Navigation */}

            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
