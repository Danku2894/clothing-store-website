import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthLayoutProps {
  children: ReactNode
  type: 'login' | 'register'
}

export default function AuthLayout({ children, type }: AuthLayoutProps) {
  const isLogin = type === 'login'

  const slideAnimation = {
    initial: { x: isLogin ? '-100%' : '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: isLogin ? '100%' : '-100%', opacity: 0 },
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
      mass: 1,
      duration: 0.8
    }
  }

  const contentAnimation = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.2,
      duration: 0.6
    }
  }

  const formAnimation = {
    initial: { x: isLogin ? '50%' : '-50%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: isLogin ? '-50%' : '50%', opacity: 0 },
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 0.8,
      duration: 0.6
    }
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login-banner' : 'register-banner'}
          {...slideAnimation}
          className={`hidden md:flex w-1/2 bg-black items-center justify-center fixed ${
            isLogin ? 'left-0' : 'right-0'
          } top-0 h-full`}
        >
          <motion.div
            {...contentAnimation}
            className="text-center"
          >
            <Link 
              to="/" 
              className="inline-block transform hover:scale-105 transition-transform duration-500"
              aria-label="Go to homepage"
            >
              <motion.svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="mx-auto mb-6"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.path
                  d="M60 10 L110 95 L60 80 L10 95 L60 10"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="40"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
                <motion.path
                  d="M60 35 L60 85"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </motion.svg>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold text-white mb-4">ABYSSWEAR</h1>
                <p className="text-gray-400 max-w-md mx-auto text-sm">
                  Dive into the depths of style
                </p>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? 'login-form' : 'register-form'}
          {...formAnimation}
          className={`w-full md:w-1/2 flex items-center justify-center p-8 ${
            isLogin ? 'md:ml-[50%]' : ''
          }`}
        >
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 