import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const collections = [
  { name: 'NON STANDARD', href: '/collections/non-standard' },
  { name: 'SUPERTRAMP', href: '/collections/supertramp' },
  { name: 'lazy*think', href: '/collections/lazy-think' },
  { name: 'freefall', href: '/collections/freefall' },
  { name: 'rebel', href: '/collections/rebel' },
]

const categories = [
  { name: 'Bestseller', href: '/category/bestseller' },
  { name: 'Tất cả sản phẩm', href: '/category/all' },
  { name: 'Áo khoác', href: '/category/jackets' },
  { name: 'Áo thun', href: '/category/t-shirts' },
  { name: 'Áo sơmi', href: '/category/shirts' },
  { name: 'Quần', href: '/category/pants' },
  { name: 'Phụ kiện', href: '/category/accessories' },
  { name: 'Giảm giá', href: '/category/sale' },
]

const stores = [
  { name: 'Giới thiệu', href: '/about' },
  { name: 'Vị trí', href: '/locations' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-black text-white z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 text-2xl font-bold hover:text-gray-300 transition-colors">
            ABYSSWEAR
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 hover:text-gray-300 transition-colors">
              Bộ sưu tập
              <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-black p-2 shadow-lg ring-1 ring-gray-900/5">
                {collections.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 hover:bg-gray-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </Popover.Panel>
            </Transition>
          </Popover>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 hover:text-gray-300 transition-colors">
              Danh mục
              <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-black p-2 shadow-lg ring-1 ring-gray-900/5">
                {categories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 hover:bg-gray-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link to="/outlet" className="text-sm font-semibold leading-6 hover:text-gray-300 transition-colors">
            OUTLET
          </Link>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 hover:text-gray-300 transition-colors">
              Cửa hàng
              <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-black p-2 shadow-lg ring-1 ring-gray-900/5">
                {stores.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 hover:bg-gray-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link to="/careers" className="text-sm font-semibold leading-6 hover:text-gray-300 transition-colors">
            Tuyển dụng
          </Link>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <Link 
            to="/cart" 
            className="group -m-2.5 p-2.5 text-white hover:text-gray-300 transition-colors"
          >
            <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link 
            to="/login" 
            className="group -m-2.5 p-2.5 text-white hover:text-gray-300 transition-colors"
          >
            <UserIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5 text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>
              ABYSSWEAR
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-800">
                        Bộ sưu tập
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {collections.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-800"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-800">
                        Danh mục
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {categories.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-800"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to="/outlet"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  OUTLET
                </Link>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-800">
                        Cửa hàng
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {stores.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 hover:bg-gray-800"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to="/careers"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tuyển dụng
                </Link>
              </div>
              <div className="py-6">
                <div className="flex items-center gap-x-6">
                  <Link
                    to="/cart"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Giỏ hàng
                  </Link>
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
} 