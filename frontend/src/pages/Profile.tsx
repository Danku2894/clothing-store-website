import { useState, Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { Link } from 'react-router-dom'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  district: string
  ward: string
}

interface Order {
  id: string
  date: string
  total: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: {
    id: number
    name: string
    price: string
    quantity: number
    size: string
    color: string
    imageSrc: string
  }[]
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusText = {
  pending: 'Chờ xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đang giao hàng',
  delivered: 'Đã giao hàng',
  cancelled: 'Đã hủy',
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Đường ABC',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
  })

  const [orders] = useState<Order[]>([
    {
      id: 'WU88191111',
      date: '2024-03-10',
      total: '990,000₫',
      status: 'delivered',
      items: [
        {
          id: 1,
          name: 'NON STANDARD LAYER ZIP HOODIE',
          price: '990,000₫',
          quantity: 1,
          size: 'L',
          color: 'Black',
          imageSrc: '/images/products/non-standard-layer-zip-hoodie.jpg',
        },
      ],
    },
    {
      id: 'WU88191112',
      date: '2024-03-15',
      total: '1,240,000₫',
      status: 'processing',
      items: [
        {
          id: 2,
          name: 'KANKO CAP',
          price: '250,000₫',
          quantity: 1,
          size: 'One Size',
          color: 'Black',
          imageSrc: '/images/products/kanko-cap.jpg',
        },
        {
          id: 3,
          name: 'BRICK LONG SLEEVE TEE',
          price: '990,000₫',
          quantity: 1,
          size: 'M',
          color: 'White',
          imageSrc: '/images/products/brick-long-sleeve.jpg',
        },
      ],
    },
  ])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    console.log('Update profile:', profile)
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tài khoản của tôi</h1>

        <Tab.Group as="div" className="mt-6">
          <Tab.List className="border-b border-gray-200">
            <div className="-mb-px flex space-x-8">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Thông tin cá nhân
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Lịch sử đơn hàng
              </Tab>
            </div>
          </Tab.List>

          <Tab.Panels as={Fragment}>
            <Tab.Panel className="pt-10">
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      Họ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
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
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
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
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
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
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
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
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
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
                        value={profile.district}
                        onChange={(e) => setProfile({ ...profile, district: e.target.value })}
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
                        value={profile.ward}
                        onChange={(e) => setProfile({ ...profile, ward: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Cập nhật thông tin
                  </button>
                </div>
              </form>
            </Tab.Panel>

            <Tab.Panel className="pt-10">
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Đơn hàng #{order.id}
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Đặt ngày {new Date(order.date).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <span
                            className={classNames(
                              statusColors[order.status],
                              'inline-flex rounded-full px-3 py-1 text-sm font-semibold'
                            )}
                          >
                            {statusText[order.status]}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                      </h3>
                                      <p className="ml-4">{item.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.color} - {item.size}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Số lượng: {item.quantity}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Tổng cộng</p>
                          <p>{order.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
} 