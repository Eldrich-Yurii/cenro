"use client";

import AppRoutes from "../../routes/AppRoutes";
import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function HeroNavBar() {
  // state management ng mobile view ng navbar
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // navbar
    <div>
      <header className="fixed w-full z-20">
        <nav
          aria-label="Global"
          className={`flex  items-center justify-between transition-colors duration-300 lg:px-[4.5rem] lg:py-4 ${
            scrolled ? "bg-[#001A49] shadow-lg" : "bg-transparent"
          }`}
        >
          {/* CENRO */}
          <div className="flex lg:flex-1">
            <Link to="/"  className="-m-1.5 p-1.5">
              <span className="sr-only">CENRO</span>
              <p className="text-[24px] text-[#EBFADC] font-black tracking-wide">
                CENRO
              </p>
            </Link>
          </div>
          {/* burger menu */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6 text-[#EBFADC]" />
            </button>
          </div>
          {/* navlinks sa desktop view */}
          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href="/#home"
              className="text-[18px] font-bold text-[#EBFADC]  hover:text-[#C1111F]"
            >
              Home
            </a>
            <a
              href="/#about"
              className="text-[18px] font-bold text-[#EBFADC]   hover:text-[#C1111F]"
            >
              About
            </a>
            <a
              href="/#contact"
              className="text-[18px] font-bold text-[#EBFADC]  hover:text-[#C1111F]"
            >
              Contact Us
            </a>
            <Link
              to="/announcements"
              className="text-[18px] font-bold text-[#EBFADC]  hover:text-[#C1111F]"
            >
              Announcements
            </Link>
          </div>
          {/* CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-8">
            <Link
              to="/login"
              className="text-[16px] font-extrabold text-[#EBFADC] border-white rounded-md border-2 px-4 py-1 hover:bg-[#C1111F] hover:border-[#C1111F]"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-[16px] font-extrabold text-[#EBFADC] rounded-md bg-[#C1111F] px-4 py-1 hover:bg-red-800"
            >
              Sign Up
            </Link>
          </div>
        </nav>
        {/* mobile view navbar */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-red-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            {/* CENRO */}
            <div className="flex items-center justify-between">
              <a  className="-m-1.5 p-1.5">
                <span className="sr-only">CENRO</span>
                <h2 className="text-[#EBFADC] font-black tracking-wide">
                  CENRO
                </h2>
              </a>
              {/* close button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  aria-hidden="true"
                  className="size-6 text-[#EBFADC]"
                />
              </button>
            </div>
            {/* mobile view links */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-[#EBFADC]0/10">
                <div className="space-y-2 py-6">
                  <a
                    href="/#home"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[#EBFADC] hover:bg-[#EBFADC] hover:text-red-700"
                  >
                    Home
                  </a>
                  <a
                    href="/#about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[#EBFADC] hover:bg-[#EBFADC] hover:text-red-700"
                  >
                    About
                  </a>
                  <a
                    href="/#contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[#EBFADC] hover:bg-[#EBFADC] hover:text-red-700"
                  >
                    Contact Us
                  </a>
                  <Link
                    to="/announcements"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[#EBFADC] hover:bg-[#EBFADC] hover:text-red-700"
                  >
                    Announcements
                  </Link>
                </div>
                {/* CTA */}
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-[#EBFADC] hover:bg-[#EBFADC] hover:color[red-700]"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-[#EBFADC] hover:bg-[#EBFADC] hover:text-red-700"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <AppRoutes />
    </div>
  );
}
