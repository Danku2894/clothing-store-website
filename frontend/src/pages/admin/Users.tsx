import { useState } from 'react'
import {
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline'

type UserRole = 'USER' | 'STAFF' | 'ADMIN'
type UserStatus = 'ACTIVE' | 'LOCKED' | 'INACTIVE'

interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  status: UserStatus
  createdAt: string
  lastLogin: string
}

// Sample data - will be replaced with API call
const sampleUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    fullName: 'John Doe',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2025-05-01',
    lastLogin: '2025-06-03'
  },
  {
    id: '2',
    email: 'jane@example.com',
    fullName: 'Jane Smith',
    role: 'STAFF',
    status: 'ACTIVE',
    createdAt: '2025-05-15',
    lastLogin: '2025-06-02'
  }
]

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-purple-100 text-purple-800'
    case 'STAFF':
      return 'bg-blue-100 text-blue-800'
    case 'USER':
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusColor = (status: UserStatus) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800'
    case 'LOCKED':
      return 'bg-red-100 text-red-800'
    case 'INACTIVE':
      return 'bg-yellow-100 text-yellow-800'
  }
}

export default function Users() {
  const [users, setUsers] = useState<User[]>(sampleUsers)

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE'
        }
      }
      return user
    }))
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý người dùng</h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách tất cả người dùng trong hệ thống
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Thêm người dùng
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Họ tên
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Vai trò
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Đăng nhập cuối
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      {user.fullName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.createdAt}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className="rounded-full p-1 hover:bg-gray-100"
                          title={user.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                        >
                          {user.status === 'ACTIVE' ? (
                            <LockOpenIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <LockClosedIcon className="h-5 w-5 text-red-500" />
                          )}
                        </button>
                        <button
                          className="rounded-full p-1 hover:bg-gray-100"
                          title="Chỉnh sửa"
                        >
                          <PencilIcon className="h-5 w-5 text-blue-500" />
                        </button>
                        <button
                          className="rounded-full p-1 hover:bg-gray-100"
                          title="Xóa"
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add pagination here later */}
    </div>
  )
}