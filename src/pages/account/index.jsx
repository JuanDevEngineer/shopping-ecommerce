import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import Toastify from 'toastify-js'

import useAuth from '@/hooks/useAuth'
import useShopping from '@/hooks/useShopping'
import { cn } from '@/lib/utils'

const inputClass =
  'border border-black dark:border-white rounded-lg p-4 w-full focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm'

// ─── Avatar ─────────────────────────────────────────────────────────────────

function Avatar({ name = '', size = 'lg' }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div className={cn(
      'rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center font-bold text-violet-700 dark:text-violet-300 flex-shrink-0',
      size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-10 h-10 text-sm'
    )}>
      {initials || <UserCircleIcon className="w-10 h-10 text-violet-400" />}
    </div>
  )
}

// ─── Editable Field ─────────────────────────────────────────────────────────

function Field({ label, value, editValue, editing, onChange, type = 'text' }) {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-black dark:border-white last:border-0">
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="mt-1 sm:col-span-2 sm:mt-0">
        {editing ? (
          <input
            type={type}
            value={editValue}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        ) : (
          <span className="text-sm text-gray-900 dark:text-white">
            {value || <span className="text-gray-400 italic">Not set</span>}
          </span>
        )}
      </dd>
    </div>
  )
}

// ─── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-white p-5 flex items-center gap-4">
      <div className={cn('p-2.5 rounded-xl', color)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const { session, updateSessionUser } = useAuth()
  const { orders } = useShopping()
  const user = session?.user ?? {}

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    fullname: user.fullname ?? '',
    phone:    user.phone   ?? '',
    address:  user.address ?? '',
  })

  function handleField(key) {
    return (value) => setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSave() {
    if (!form.fullname.trim()) {
      Toastify({ text: 'Full name is required.', duration: 2000, style: { background: '#b42506' } }).showToast()
      return
    }
    updateSessionUser({ fullname: form.fullname.trim(), phone: form.phone, address: form.address })
    setEditing(false)
    Toastify({ text: 'Profile updated!', duration: 2000, style: { background: '#6d28d9' } }).showToast()
  }

  function handleCancel() {
    setForm({ fullname: user.fullname ?? '', phone: user.phone ?? '', address: user.address ?? '' })
    setEditing(false)
  }

  const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0)

  return (
    <div className="w-full max-w-2xl px-4 pb-16 space-y-6">
      {/* Back */}
      <div className="flex items-center gap-2">
        <Link to="/" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Account</h1>
      </div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar name={user.fullname} size="lg" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{user.fullname}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              <span className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1',
                user.role === 'admin'
                  ? 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              )}>
                {user.role ?? 'user'}
              </span>
            </div>
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-700 text-white text-sm font-medium hover:bg-violet-800 transition-colors"
              >
                <CheckIcon className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black dark:border-white text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Fields */}
        <dl>
          <Field label="Full name"        value={user.fullname} editValue={form.fullname} editing={editing} onChange={handleField('fullname')} />
          <Field label="Email"            value={user.email}    editValue={user.email}    editing={false}   onChange={() => {}} type="email" />
          <Field label="Phone"            value={user.phone}    editValue={form.phone}    editing={editing} onChange={handleField('phone')} type="tel" />
          <Field label="Shipping address" value={user.address}  editValue={form.address}  editing={editing} onChange={handleField('address')} />
          <Field label="Account type"     value={user.role}     editValue={user.role}     editing={false}   onChange={() => {}} />
        </dl>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={ShoppingBagIcon} label="Total orders"  value={orders.length} color="bg-violet-500" />
        <StatCard
          icon={CurrencyDollarIcon}
          label="Total spent"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSpent)}
          color="bg-emerald-500"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
          <Link to="/my-orders" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">
            View all →
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No orders yet. Start shopping!</p>
        ) : (
          <ul className="space-y-2">
            {[...orders].reverse().slice(0, 4).map((order) => (
              <Link key={order.id} to={`/my-orders/${order.id}`} className="block">
                <li className="flex items-center justify-between p-3 rounded-lg border border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{order.date}</p>
                    <p className="text-xs text-gray-400">{order.totalProducts} item(s)</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalPrice)}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
