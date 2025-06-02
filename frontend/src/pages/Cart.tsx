import { Link } from 'react-router-dom'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import useCartStore from '../store/cartStore'

export default function Cart() {
  const { items, removeItem, updateQuantity, getSubtotal, getShippingFee, getTotal } = useCartStore()

  const handleQuantityChange = (id: number, delta: number) => {
    const item = items.find(item => item.id === id)
    if (item) {
      updateQuantity(id, item.quantity + delta)
    }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫'
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Giỏ hàng</h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Các sản phẩm trong giỏ hàng
            </h2>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
                <Link
                  to="/"
                  className="mt-6 inline-block rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            ) : (
              <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link to={`/product/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                {item.name}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{item.color}</p>
                            {item.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{item.size}</p>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">{formatPrice(item.price)}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="mx-4 text-gray-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              disabled={item.quantity >= 10}
                              className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Xóa</span>
                              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Tổng đơn hàng
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Tạm tính</dt>
                <dd className="text-sm font-medium text-gray-900">{formatPrice(getSubtotal())}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">Phí vận chuyển</dt>
                <dd className="text-sm font-medium text-gray-900">{formatPrice(getShippingFee())}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Tổng cộng</dt>
                <dd className="text-base font-medium text-gray-900">{formatPrice(getTotal())}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                to="/checkout"
                className={`w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${
                  items.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700'
                }`}
                aria-disabled={items.length === 0}
                onClick={(e) => {
                  if (items.length === 0) {
                    e.preventDefault()
                  }
                }}
              >
                Thanh toán
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
} 