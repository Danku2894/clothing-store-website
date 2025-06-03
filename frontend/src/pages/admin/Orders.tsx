import { useState, useEffect } from 'react'
import {
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import adminService from '../../services/adminService'
import type { AdminOrder, OrderStatus } from '../../types/admin'

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'PROCESSING':
      return 'bg-blue-100 text-blue-800'
    case 'SHIPPED':
      return 'bg-purple-100 text-purple-800'
    case 'DELIVERED':
      return 'bg-green-100 text-green-800'
    case 'CANCELLED':
      return 'bg-red-100 text-red-800'
  }
}

export default function Orders() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const fetchOrders = async () => {
    try {
      const response = await adminService.getOrders({
        page: currentPage,
        size: 10,
        sort: 'createdAt,desc'
      })
      setOrders(response.content)
      setTotalPages(response.totalPages)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Không thể tải danh sách đơn hàng')
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus)
      toast.success('Cập nhật trạng thái thành công')
      fetchOrders() // Refresh the list
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error('Không thể cập nhật trạng thái đơn hàng')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý đơn hàng</h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách tất cả đơn hàng trong hệ thống
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mã đơn hàng
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Khách hàng
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Ngày đặt
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Số sản phẩm
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Tổng tiền
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Trạng thái
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {order.orderNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {order.customerName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {order.itemCount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {order.total.toLocaleString('vi-VN')}đ
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="rounded-full p-1 hover:bg-gray-100"
                            title="Xem chi tiết"
                          >
                            <EyeIcon className="h-5 w-5 text-gray-500" />
                          </button>
                          {order.status === 'PENDING' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'PROCESSING')}
                              className="rounded-full p-1 hover:bg-gray-100"
                              title="Xác nhận đơn hàng"
                            >
                              <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            </button>
                          )}
                          {order.status === 'PROCESSING' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'SHIPPED')}
                              className="rounded-full p-1 hover:bg-gray-100"
                              title="Giao hàng"
                            >
                              <TruckIcon className="h-5 w-5 text-purple-500" />
                            </button>
                          )}
                          {['PENDING', 'PROCESSING'].includes(order.status) && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                              className="rounded-full p-1 hover:bg-gray-100"
                              title="Hủy đơn hàng"
                            >
                              <XCircleIcon className="h-5 w-5 text-red-500" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Trang <span className="font-medium">{currentPage + 1}</span> / <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(page => Math.max(0, page - 1))}
            disabled={currentPage === 0}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            Trước
          </button>
          <button
            onClick={() => setCurrentPage(page => Math.min(totalPages - 1, page + 1))}
            disabled={currentPage === totalPages - 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  )
}
