import { useState } from 'react'
import {
  UsersIcon,
  ShoppingBagIcon,
  CubeIcon,
  ChartBarIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import { useQuery } from '@/hooks/useQuery'
import useShopping from '@/hooks/useShopping'
import { userRepository } from '@/api/repositories/userRepository'
import api from '@/api/services/api'
import { cn } from '@/lib/utils'

const inputClass =
  'border border-black dark:border-white rounded-lg p-4 w-full focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm pl-10'

// ─── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-white p-6 flex items-center gap-4">
      <div className={cn('p-3 rounded-xl', color)}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Badge ──────────────────────────────────────────────────────────────────

function RoleBadge({ role }) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      role === 'admin'
        ? 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200'
        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    )}>
      {role}
    </span>
  )
}

const TABS = ['Overview', 'Products', 'Users']

// ─── Products Tab ───────────────────────────────────────────────────────────

function ProductsTab({ products, status }) {
  const [search, setSearch] = useState('')

  const filtered = (products ?? []).filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className={inputClass}
        />
      </div>

      {status === 'loading' && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg border border-black dark:border-white bg-gray-50 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="text-center text-red-500 py-8">Failed to load products.</p>
      )}

      {status === 'success' && (
        <div className="rounded-lg border border-black dark:border-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black dark:divide-white bg-white dark:bg-gray-900">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-400">No products found</td>
                </tr>
              ) : filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-10 h-10 rounded-lg object-cover border border-black dark:border-white bg-gray-100"
                        onError={(e) => { e.target.src = 'https://placehold.co/40x40/e5e7eb/9ca3af?text=?' }}
                      />
                      <span className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {product.category?.name}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Users Tab ──────────────────────────────────────────────────────────────

function UsersTab() {
  const users = userRepository.getAll()
  const [search, setSearch] = useState('')

  const filtered = users.filter((u) =>
    u.fullname.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  function getInitials(name = '') {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users…"
          className={inputClass}
        />
      </div>

      <div className="rounded-lg border border-black dark:border-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black dark:divide-white bg-white dark:bg-gray-900">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">No users found</td>
              </tr>
            ) : filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-black dark:border-white bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-violet-700 dark:text-violet-300 font-semibold text-sm flex-shrink-0">
                      {getInitials(user.fullname)}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{user.fullname}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{user.email}</td>
                <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Overview Tab ───────────────────────────────────────────────────────────

function OverviewTab({ products, orders }) {
  const topCategories = Object.entries(
    (products ?? []).reduce((acc, p) => {
      const cat = p.category?.name ?? 'Other'
      acc[cat] = (acc[cat] ?? 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const recentOrders = [...orders].reverse().slice(0, 5)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-white p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Products by Category</h3>
        {topCategories.length === 0 ? (
          <p className="text-sm text-gray-400">No data yet</p>
        ) : (
          <ul className="space-y-3">
            {topCategories.map(([name, count]) => (
              <li key={name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden border border-black dark:border-white">
                    <div
                      className="h-full bg-violet-500 rounded-full"
                      style={{ width: `${(count / (products?.length || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-4 text-right">{count}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
          <Link to="/my-orders" className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
            View all <ChevronRightIcon className="h-3 w-3" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400">No orders placed yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between text-sm p-2 rounded-lg border border-black dark:border-white">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{order.date}</p>
                  <p className="text-xs text-gray-400">{order.totalProducts} item(s)</p>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalPrice)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Overview')
  const { orders } = useShopping()

  const { data: products, status } = useQuery(
    (signal) => api.getProducts('/products?limit=28&offset=1', signal),
    []
  )

  const userCount = userRepository.count()
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0)

  return (
    <div className="w-full max-w-screen-xl px-4 pb-16 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your store</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CubeIcon}         label="Products" value={status === 'success' ? products.length : '—'} color="bg-violet-500" sub="From API" />
        <StatCard icon={UsersIcon}        label="Users"    value={userCount}                                    color="bg-blue-500"   sub="Registered" />
        <StatCard icon={ShoppingBagIcon}  label="Orders"   value={orders.length}                                color="bg-emerald-500" sub="This session" />
        <StatCard
          icon={ChartBarIcon}
          label="Revenue"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalRevenue)}
          color="bg-amber-500"
          sub="This session"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-black dark:border-white">
        <nav className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'pb-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab
                  ? 'border-black dark:border-white text-gray-900 dark:text-white'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'Overview' && <OverviewTab products={products} orders={orders} />}
        {activeTab === 'Products' && <ProductsTab products={products} status={status} />}
        {activeTab === 'Users'    && <UsersTab />}
      </div>
    </div>
  )
}
