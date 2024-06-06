import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../images/shopitLogo.png";
import { useNavigate } from "react-router-dom";
import { _logOutUser } from "../api/authAPI";

const navigation = [
  { name: "Account", href: "./my-account" },
  { name: "Cart", href: "./my-cart" },
  { name: "Store", href: "./store-page" },
  { name: "Add Listing", href: "./list-item" },
];

function LoggedInHeader({ refresh }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-theBlue">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <button
            onClick={() => {
              navigate("./store-page");
            }}
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">Your Company</span>
            <img className="h-16 w-auto" src={logo} alt="shoit-logo" />
          </button>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-theYellow"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.href);
                setMobileMenuOpen(false);
              }}
              className="text-sm font-semibold leading-6 text-theYellow"
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => {
              _logOutUser();
              refresh();
              navigate("../store-page");
              setMobileMenuOpen(false);
            }}
            className="text-sm font-semibold leading-6 text-white"
          >
            Log out <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={logo} alt="shopit-logo" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="py-6">
                <button
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => {
                    _logOutUser();
                    refresh();
                    navigate("../store-page");
                    setMobileMenuOpen(false);
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
export default LoggedInHeader;
