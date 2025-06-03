import { useState, useEffect } from 'react'
import {
  UserGroupIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

interface DashboardStat {
  name: string
  stat: string | number
  icon: any
  change: number
  changeColor: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStat[]>([
    {
      name: 'Tổng doanh thu',
      stat: '0₫',
      icon: CurrencyDollarIcon,
      change: 0,
      changeColor: 'text-green-600',
    },
    {
      name: 'Đơn hàng mới',
      stat: 0,
      icon: DocumentTextIcon,
      change: 0,
      changeColor: 'text-green-600',
    },
    {
      name: 'Sản phẩm',
      stat: 0,
      icon: ShoppingBagIcon,
      change: 0,
      changeColor: 'text-green-600',
    },
    {
      name: 'Người dùng mới',
      stat: 0,
      icon: UserGroupIcon,
      change: 0,
      changeColor: 'text-green-600',
    },
  ])

  useEffect(() => {
    // TODO: Fetch dashboard stats from API
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-black p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeColor}`}
              >
                {item.change > 0 ? '↑' : '↓'}
                {Math.abs(item.change)}%
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {/* TODO: Add charts and recent activities */}
    </div>
  )
}
