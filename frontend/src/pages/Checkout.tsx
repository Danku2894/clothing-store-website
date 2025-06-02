import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const paymentMethods = [
  { id: 'cod', title: 'Thanh toán khi nhận hàng (COD)', description: 'Thanh toán bằng tiền mặt khi nhận hàng' },
  { id: 'momo', title: 'Ví MoMo', description: 'Thanh toán qua ví điện tử MoMo' },
  { id: 'vnpay', title: 'VNPay', description: 'Thanh toán qua cổng thanh toán VNPay' },
]

const deliveryMethods = [
  { id: 'standard', title: 'Giao hàng tiêu chuẩn', turnaround: '3-5 ngày', price: '30,000₫' },
  { id: 'express', title: 'Giao hàng nhanh', turnaround: '1-2 ngày', price: '50,000₫' },
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  district: string
  ward: string
  note: string
}

export default function Checkout() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0])
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement checkout logic
    console.log('Checkout:', {
      ...formData,
      paymentMethod: selectedPaymentMethod,
      deliveryMethod: selectedDeliveryMethod,
    })
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Thanh toán</h2>

        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={handleSubmit}>
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Thông tin giao hàng</h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Họ
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Tên
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Tỉnh/Thành phố
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                    Quận/Huyện
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="district"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ward" className="block text-sm font-medium text-gray-700">
                    Phường/Xã
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="ward"
                      name="ward"
                      required
                      value={formData.ward}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                    Ghi chú
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="note"
                      name="note"
                      rows={3}
                      value={formData.note}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery method */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                <RadioGroup.Label className="text-lg font-medium text-gray-900">Phương thức vận chuyển</RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      className={({ checked, active }) =>
                        `${
                          checked ? 'border-transparent' : 'border-gray-300'
                        } ${
                          active ? 'ring-2 ring-primary-500' : ''
                        } relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none`
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <span
                              className={`${
                                active ? 'border' : 'border-2'
                              } pointer-events-none absolute -inset-px rounded-lg border-primary-500`}
                              aria-hidden="true"
                            />
                          ) : null}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment method */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup value={selectedPaymentMethod} onChange={setSelectedPaymentMethod}>
                <RadioGroup.Label className="text-lg font-medium text-gray-900">Phương thức thanh toán</RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6">
                  {paymentMethods.map((paymentMethod) => (
                    <RadioGroup.Option
                      key={paymentMethod.id}
                      value={paymentMethod}
                      className={({ checked, active }) =>
                        `${
                          checked ? 'border-transparent' : 'border-gray-300'
                        } ${
                          active ? 'ring-2 ring-primary-500' : ''
                        } relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none`
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                {paymentMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description as="span" className="mt-1 text-sm text-gray-500">
                                {paymentMethod.description}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <span
                              className={`${
                                active ? 'border' : 'border-2'
                              } pointer-events-none absolute -inset-px rounded-lg border-primary-500`}
                              aria-hidden="true"
                            />
                          ) : null}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Đơn hàng của bạn</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {/* TODO: Display cart items */}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Tạm tính</dt>
                  <dd className="text-sm font-medium text-gray-900">1,240,000₫</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Phí vận chuyển</dt>
                  <dd className="text-sm font-medium text-gray-900">30,000₫</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Tổng cộng</dt>
                  <dd className="text-base font-medium text-gray-900">1,270,000₫</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Xác nhận đặt hàng
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 