/**
 * User Repository
 *
 * Provides a CRUD interface for user data backed by localStorage.
 * It seeds its initial data from `src/data/db.json` on first load.
 *
 * To swap to a real backend API, implement a class with the same public
 * methods (findByEmail, getAll, create, update) and replace the import
 * in AuthContext / wherever it is consumed.
 */

import seedData from '@/data/db.json'

const STORAGE_KEY = 'shoppy_users'

class LocalUserRepository {
  constructor() {
    this._init()
  }

  /** Seed localStorage from db.json on first run */
  _init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData.users))
    }
  }

  /** @returns {object[]} All users */
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
    } catch {
      return []
    }
  }

  /**
   * Find a user by email (case-insensitive).
   * @param {string} email
   * @returns {object | undefined}
   */
  findByEmail(email) {
    return this.getAll().find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    )
  }

  /**
   * Find a user by id.
   * @param {string} id
   * @returns {object | undefined}
   */
  findById(id) {
    return this.getAll().find((u) => u.id === id)
  }

  /**
   * Create a new user. Returns the created user with generated id.
   * @param {object} userData - { fullname, email, password, role? }
   * @returns {object} Created user
   */
  create(userData) {
    const users = this.getAll()

    if (this.findByEmail(userData.email)) {
      throw new Error('A user with this email already exists.')
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      fullname: userData.fullname,
      email: userData.email.trim().toLowerCase(),
      password: userData.password, // In production: hash this
      role: userData.role ?? 'user',
      phone: userData.phone ?? '',
      address: userData.address ?? '',
      avatar: null,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...users, newUser]))
    return newUser
  }

  /**
   * Update a user's data by id.
   * @param {string} id
   * @param {object} data - Partial fields to update
   * @returns {object | null} Updated user or null if not found
   */
  update(id, data) {
    const users = this.getAll()
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) return null

    // Never allow updating id, email (use a dedicated method), or role via this method
    const { id: _id, role: _role, ...safeData } = data
    users[index] = { ...users[index], ...safeData }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    return users[index]
  }

  /**
   * Count all users.
   * @returns {number}
   */
  count() {
    return this.getAll().length
  }
}

// Export a singleton — mirrors how a real service client would be used
export const userRepository = new LocalUserRepository()
