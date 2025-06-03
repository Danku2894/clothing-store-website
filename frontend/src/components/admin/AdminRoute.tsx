import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import AdminLayout from './AdminLayout'

interface AdminRouteProps {
  children: ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'STAFF' && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return <AdminLayout>{children}</AdminLayout>
}
