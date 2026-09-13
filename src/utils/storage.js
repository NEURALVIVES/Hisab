// সব ডেটা ব্রাউজারের localStorage এ থাকবে — কোনো ব্যাকএন্ড/সার্ভার লাগবে না।
// পরে চাইলে Firebase বা নিজের API দিয়ে replace করতে পারবেন।

const KEYS = {
  accounts: 'hishab_accounts',
  transactions: 'hishab_transactions',
  categories: 'hishab_categories',
  budgets: 'hishab_budgets',
  debts: 'hishab_debts',
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    console.error('Storage load error:', e)
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Storage save error:', e)
  }
}

export const DEFAULT_CATEGORIES = [
  { id: 'cat-food', name: 'খাবার', type: 'expense', color: '#C8553D' },
  { id: 'cat-transport', name: 'যাতায়াত', type: 'expense', color: '#D9A441' },
  { id: 'cat-rent', name: 'বাসা ভাড়া', type: 'expense', color: '#8E5572' },
  { id: 'cat-bills', name: 'বিল', type: 'expense', color: '#3D5A80' },
  { id: 'cat-health', name: 'চিকিৎসা', type: 'expense', color: '#9E2A2B' },
  { id: 'cat-shopping', name: 'শপিং', type: 'expense', color: '#5E548E' },
  { id: 'cat-salary', name: 'বেতন', type: 'income', color: '#4C8C4B' },
  { id: 'cat-freelance', name: 'ফ্রিল্যান্স', type: 'income', color: '#146C6B' },
  { id: 'cat-other-income', name: 'অন্যান্য আয়', type: 'income', color: '#2A9D8F' },
]

export const DEFAULT_ACCOUNTS = [
  { id: 'acc-cash', name: 'ক্যাশ', type: 'cash', balance: 0 },
  { id: 'acc-bkash', name: 'বিকাশ', type: 'wallet', balance: 0 },
]

export const storage = {
  getAccounts: () => load(KEYS.accounts, DEFAULT_ACCOUNTS),
  saveAccounts: (v) => save(KEYS.accounts, v),

  getTransactions: () => load(KEYS.transactions, []),
  saveTransactions: (v) => save(KEYS.transactions, v),

  getCategories: () => load(KEYS.categories, DEFAULT_CATEGORIES),
  saveCategories: (v) => save(KEYS.categories, v),

  getBudgets: () => load(KEYS.budgets, []),
  saveBudgets: (v) => save(KEYS.budgets, v),

  getDebts: () => load(KEYS.debts, []),
  saveDebts: (v) => save(KEYS.debts, v),
}
