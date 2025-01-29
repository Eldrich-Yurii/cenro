"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function HeroNavBar() {

  // state management ng mobile view ng navbar
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // navbar
    <header className="bg-transparent absolute w-full z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* CENRO */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">CENRO</span>
            <p className="text-[24px] text-[#FFFFFF] font-black tracking-wide">CENRO PORTAL</p>
          </a>
        </div>
        {/* burger menu */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6 text-white" />
          </button>
        </div>
        {/* navlinks sa desktop view */}
        <div className="hidden lg:flex lg:gap-x-12">
          <a
            href="#"
            className="text-[18px] font-bold text-[#FFFFFF]  hover:text-red-200" 
          >
            Home
          </a>
          <a
            href="#"
            className="text-[18px] font-bold text-[#FFFFFF]   hover:text-red-200"
          >
            About
          </a>
          <a
            href="#"
            className="text-[18px] font-bold text-[#FFFFFF]  hover:text-red-200"
          >
            Contact Us
          </a>
          <a
            href="#"
            className="text-[18px] font-bold text-[#FFFFFF]  hover:text-red-200"
          >
            Announcements
          </a>
        </div>
        {/* CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-8">
          <a
            href="#"
            className="text-[16px] font-bold text-white border-white rounded-md border-2 px-4 py-1 hover:bg-red-700 hover:border-red-700"
          >
            Log in
          </a>
          <a
            href="#"
            className="text-[16px] font-bold text-[#FFFFFF] rounded-md bg-red-700 px-4 py-1 hover:bg-red-900"
          >
            Sign Up
          </a>
        </div>
      </nav>
      {/* mobile view navbar */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-red-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* CENRO */}
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">CENRO</span>
              <p className="text-white font-black tracking-wide">
                CENRO PORTAL
              </p>
            </a>
            {/* close button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          {/* mobile view links */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50 hover:text-red-700"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50 hover:text-red-700"
                >
                  About
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50 hover:text-red-700"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50 hover:text-red-700"
                >
                  Announcements
                </a>
              </div>
              {/* CTA */}
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-50 hover:color[red-700]"
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-50 hover:text-red-700"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
