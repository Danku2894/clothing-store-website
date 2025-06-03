import { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  UsersIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import useAuthStore from '../../store/authStore'
import { toast } from 'react-hot-toast'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Squares2X2Icon },
  { name: 'Sản phẩm', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Đơn hàng', href: '/admin/orders', icon: ClipboardDocumentListIcon },
  { name: 'Người dùng', href: '/admin/users', icon: UsersIcon },
]

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    toast.success('Đã đăng xuất thành công')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-black transform transition-transform duration-200 ease-in-out">
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 shrink-0 items-center px-6">
            <Link to="/admin" className="text-2xl font-bold text-white">
              Admin Panel
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout button */}
          <div className="shrink-0 px-4 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 hover:bg-gray-800"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
