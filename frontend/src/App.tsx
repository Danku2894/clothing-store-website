import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Collection from './pages/Collection'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import ProtectedRoute from './components/auth/ProtectedRoute'

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/collections/:collection" element={<Collection />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  )
}
