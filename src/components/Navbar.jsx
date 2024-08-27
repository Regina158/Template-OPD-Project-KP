import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FiMoon, FiSun } from "react-icons/fi";
import useThemeSwitcher from "../hooks/useThemeSwitcher ";
import logoLight from "/TPI-Logo.png";
import logoDark from "/TPI-Logo.png";
import { getNavbar } from "../fetch/api";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTheme, toggleTheme] = useThemeSwitcher();
  const [navbar, setNavbar] = useState([]);
  const [nunkerData, setNunkerData] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const dataNavbar = await getNavbar();
        setNavbar(dataNavbar);
      } catch (error) {
        console.log("Failed to fetch navbar data");
      }
    };

    fetchNavbar();
  }, []);
  useEffect(() => {
    const fetchDataOpdNavbar = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_LINK_API}/api/getOPDInfo`,
          {
            kunker: import.meta.env.VITE_APP_OPD_ID,
          }
        );

        setNunkerData(response.data.unker);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataOpdNavbar();
  }, []);

  const formatMenuName = (name) => {
    return name.toLowerCase().replace(/\s+/g, "_");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`fixed z-10 w-full transition-all duration-300 shadow ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-md"
            : "bg-white dark:bg-gray-900"
        }`}
      >
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-full items-center justify-between p-4 lg:px-8"
        >
          <div className="flex lg:flex-1 items-center">
            <a href="/" className="flex items-center -m-1.5 p-1.5">
              <img
                src={activeTheme === "dark" ? logoDark : logoLight}
                alt="Logo"
                className="w-10 h-auto"
              />
              {nunkerData && (
                <p className="ml-2 text-base font-medium text-gray-900 dark:text-white">
                  {nunkerData.nunker}
                </p>
              )}
            </a>
          </div>
          <div className="flex items-center justify-between space-x-4 sm:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Theme Switcher"
              className="bg-gray-200 dark:bg-gray-700 py-2 px-3 rounded-full shadow-sm cursor-pointer"
            >
              {activeTheme === "dark" ? (
                <FiSun className="text-yellow-500" />
              ) : (
                <FiMoon className="text-gray-950" />
              )}
            </button>

            <a
              href="https://icms.tanjungpinangkota.go.id/login"
              target="_blank"
              className="-mx-3 block rounded-full px-6 py-2.5 text-sm font-semibold leading-6 text-white bg-blue-500 "
            >
              Login
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--color-text)] lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-6">
            <div className="flex space-x-4">
              {navbar.slice(0, 6).map((item) => (
                <Popover key={item.nama_menu} className="relative">
                  <PopoverButton className="flex text-xs hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-md focus:outline-none items-center gap-x-1 font-semibold leading-6 text-[var(--color-text)]">
                    <Link
                      to={
                        item.route && item.id_post
                          ? `/pages/${item.route}/${item.id_post}`
                          : `/${formatMenuName(item.nama_menu)}`
                      }
                    >
                      {item.nama_menu}
                    </Link>

                    {item.submenu && item.submenu.length > 0 && (
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="h-4 w-4 flex-none text-[var(--color-text)]"
                      />
                    )}
                  </PopoverButton>
                  {item.submenu && item.submenu.length > 0 && (
                    <PopoverPanel
                      transition
                      className="absolute left-0 top-full z-10 mt-3 max-w-xs overflow-hidden rounded-lg bg-[var(--color-bg)] shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="p-4">
                        {item.submenu.map((subItem) => (
                          <Disclosure
                            key={subItem.nama_menu}
                            as="div"
                            className="group relative flex flex-col"
                          >
                            <DisclosureButton className="flex items-center gap-x-4 rounded-lg py-2 px-3 text-sm font-semibold leading-7 text-[var(--color-text)] hover:bg-gray-50 dark:hover:bg-gray-800">
                              <Link
                                to={
                                  subItem.route && subItem.id_post
                                    ? `/pages/${subItem.route}/${subItem.id_post}`
                                    : `/${formatMenuName(subItem.nama_menu)}`
                                }
                              >
                                {subItem.nama_menu}
                              </Link>
                              {subItem.submenu &&
                                subItem.submenu.length > 0 && (
                                  <ChevronDownIcon
                                    aria-hidden="true"
                                    className="h-4 w-4 flex-none text-[var(--color-text)]"
                                  />
                                )}
                            </DisclosureButton>
                            {subItem.submenu && subItem.submenu.length > 0 && (
                              <DisclosurePanel className="mt-2 space-y-2 pl-6">
                                {subItem.submenu.map((subSubItem) => (
                                  <a
                                    key={subSubItem.nama_menu}
                                    href={`/pages/${subSubItem.route}/${subSubItem.id_post}`}
                                    className="block rounded-lg py-2 px-4 text-sm font-semibold leading-7 text-[var(--color-text)] hover:bg-gray-50 dark:hover:bg-gray-800"
                                  >
                                    {subSubItem.nama_menu}
                                  </a>
                                ))}
                              </DisclosurePanel>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                    </PopoverPanel>
                  )}
                </Popover>
              ))}
            </div>
            <Popover className="relative">
              <PopoverButton className="flex text-xs hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-md focus:outline-none items-center gap-x-1 font-semibold leading-6 text-[var(--color-text)]">
                More
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-4 w-4 flex-none text-[var(--color-text)]"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute  left-0  top-full z-10 mt-3 max-w-xs overflow-hidden rounded-lg bg-[var(--color-bg)] shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {navbar.slice(6).map((item) => (
                    <Disclosure
                      key={item.nama_menu}
                      as="div"
                      className="group  relative flex flex-col"
                    >
                      <DisclosureButton className="flex text-start items-center gap-x-4 rounded-lg py-2 px-3 text-sm font-semibold leading-7 text-[var(--color-text)] hover:bg-gray-50 dark:hover:bg-gray-800">
                        <Link
                          to={
                            item.route && item.id_post
                              ? `/pages/${item.route}/${item.id_post}`
                              : `/${formatMenuName(item.nama_menu)}`
                          }
                        >
                          {item.nama_menu}
                        </Link>
                        {item.submenu && item.submenu.length > 0 && (
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="h-4 w-4 flex-none text-[var(--color-text)]"
                          />
                        )}
                      </DisclosureButton>
                      {item.submenu && item.submenu.length > 0 && (
                        <DisclosurePanel className="mt-2 space-y-2 pl-6">
                          {item.submenu.map((subItem) => (
                            <a
                              key={subItem.nama_menu}
                              href={`/pages/${subItem.route}/${subItem.id_post}`}
                              className="block rounded-lg py-2 px-4 text-sm font-semibold leading-7 text-[var(--color-text)] hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              {subItem.nama_menu}
                            </a>
                          ))}
                        </DisclosurePanel>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <button
              onClick={toggleTheme}
              aria-label="Theme Switcher"
              className="bg-gray-200 dark:bg-gray-700 py-2 px-3 rounded-full shadow-sm cursor-pointer"
            >
              {activeTheme === "dark" ? (
                <FiSun className="text-yellow-500 " />
              ) : (
                <FiMoon className="text-gray-950" />
              )}
            </button>
            <a
              href="https://icms.tanjungpinangkota.go.id/login"
              target="_blank"
              className="text-sm bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 font-semibold leading-6"
            >
              Login
            </a>
          </PopoverGroup>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[var(--color-bg)] px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <img
                  src={activeTheme === "dark" ? logoDark : logoLight}
                  alt="Logo"
                  className="w-[250px] h-[40px]"
                />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-[var(--color-text)]"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navbar.map((item) => (
                    <Disclosure key={item.nama_menu} as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-[var(--color-text)] hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-300">
                        <Link
                          to={
                            item.route && item.id_post
                              ? `/pages/${item.route}/${item.id_post}`
                              : `/${formatMenuName(item.nama_menu)}`
                          }
                        >
                          {item.nama_menu}
                        </Link>
                        {item.submenu && item.submenu.length > 0 && (
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                          />
                        )}
                      </DisclosureButton>
                      {item.submenu && item.submenu.length > 0 && (
                        <DisclosurePanel className="mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <DisclosureButton
                              key={subItem.nama_menu}
                              as="a"
                              href={`/pages/${subItem.route}/${subItem.id_post}`}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-[var(--color-text)] hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                              {subItem.nama_menu}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      )}
                    </Disclosure>
                  ))}
                </div>
                <div className="py-6">
                  <button
                    onClick={toggleTheme}
                    aria-label="Theme Switcher"
                    className="bg-gray-200 dark:bg-gray-700 py-2 px-3 rounded-full shadow-sm cursor-pointer"
                  >
                    {activeTheme === "dark" ? (
                      <FiSun className="text-yellow-500" />
                    ) : (
                      <FiMoon className="text-gray-950" />
                    )}
                  </button>
                  <a
                    href="https://icms.tanjungpinangkota.go.id/login"
                    target="_blank"
                    className="text-sm bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 font-semibold leading-6"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
