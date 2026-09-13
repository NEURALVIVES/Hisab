import { useState, useEffect } from 'react'
import { storage } from './utils/storage'
import Dashboard from './components/Dashboard'
import TransactionList from './components/TransactionList'
import TransactionForm from './components/TransactionForm'
import AccountForm from './components/AccountForm'
import BudgetForm from './components/BudgetForm'
import CategoryForm from './components/CategoryForm'

const TABS = [
  { id: 'dashboard', label: 'ড্যাশবোর্ড' },
  { id: 'transactions', label: 'লেনদেন' },
  { id: 'categories', label: 'ক্যাটাগরি' },
  { id: 'accounts', label: 'একাউন্ট' },
  { id: 'budgets', label: 'বাজেট' },
]

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [budgets, setBudgets] = useState([])
  const [modal, setModal] = useState(null) // 'transaction' | 'account' | 'budget' | null

  useEffect(() => {
    setAccounts(storage.getAccounts())
    setTransactions(storage.getTransactions())
    setCategories(storage.getCategories())
    setBudgets(storage.getBudgets())
  }, [])

  function addTransaction(t) {
    const updated = [...transactions, t]
    setTransactions(updated)
    storage.saveTransactions(updated)

    const updatedAccounts = accounts.map((a) =>
      a.id === t.accountId
        ? { ...a, balance: a.balance + (t.type === 'income' ? t.amount : -t.amount) }
        : a
    )
    setAccounts(updatedAccounts)
    storage.saveAccounts(updatedAccounts)
  }

  function deleteTransaction(id) {
    const t = transactions.find((x) => x.id === id)
    const updated = transactions.filter((x) => x.id !== id)
    setTransactions(updated)
    storage.saveTransactions(updated)

    if (t) {
      const updatedAccounts = accounts.map((a) =>
        a.id === t.accountId
          ? { ...a, balance: a.balance - (t.type === 'income' ? t.amount : -t.amount) }
          : a
      )
      setAccounts(updatedAccounts)
      storage.saveAccounts(updatedAccounts)
    }
  }

  function addAccount(a) {
    const updated = [...accounts, a]
    setAccounts(updated)
    storage.saveAccounts(updated)
  }

  function addBudget(b) {
    const updated = [...budgets.filter((x) => x.categoryId !== b.categoryId), b]
    setBudgets(updated)
    storage.saveBudgets(updated)
  }

  function addCategory(c) {
    const updated = [...categories, c]
    setCategories(updated)
    storage.saveCategories(updated)
  }

  function deleteCategory(id) {
    // যে ক্যাটাগরিতে আগে থেকে লেনদেন যোগ হয়ে গেছে, সেটা ভুলে ডিলিট হওয়া ঠেকাতে চেক করা হচ্ছে
    const inUse = transactions.some((t) => t.categoryId === id)
    if (inUse) {
      alert('এই ক্যাটাগরিতে আগে থেকে লেনদেন যোগ করা আছে, তাই এটা মুছে ফেলা যাবে না।')
      return
    }
    const updated = categories.filter((c) => c.id !== id)
    setCategories(updated)
    storage.saveCategories(updated)
  }

  return (
    <div className="min-h-screen bg-paper pb-24">
      <header className="bg-teal text-white px-5 py-5 rounded-b-2xl shadow-md">
        <h1 className="text-xl font-extrabold">হিসাব</h1>
        <p className="text-teal-light text-sm">আপনার আয়-ব্যয়ের সহজ হিসাব</p>
      </header>

      <main className="px-4 py-5 max-w-lg mx-auto">
        {tab === 'dashboard' && (
          <Dashboard transactions={transactions} categories={categories} accounts={accounts} budgets={budgets} />
        )}

        {tab === 'transactions' && (
          <TransactionList
            transactions={transactions}
            categories={categories}
            accounts={accounts}
            onDelete={deleteTransaction}
          />
        )}

        {tab === 'accounts' && (
          <div className="space-y-2">
            {accounts.map((a) => (
              <div key={a.id} className="flex justify-between items-center bg-white rounded-lg px-4 py-3 shadow-sm">
                <span className="font-medium">{a.name}</span>
                <span className="font-semibold text-teal">৳{a.balance.toLocaleString('en-BD')}</span>
              </div>
            ))}
            <button
              onClick={() => setModal('account')}
              className="w-full py-2.5 rounded-lg border-2 border-dashed border-teal-light text-teal font-medium mt-2"
            >
              + নতুন একাউন্ট যোগ করুন
            </button>
          </div>
        )}

        {tab === 'categories' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-ink/60 mb-2">খরচের খাতসমূহ</h3>
              <div className="flex flex-wrap gap-2">
                {categories.filter((c) => c.type === 'expense').map((c) => (
                  <span
                    key={c.id}
                    className="flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full text-sm border"
                    style={{ borderColor: c.color, color: c.color }}
                  >
                    {c.name}
                    <button onClick={() => deleteCategory(c.id)} className="opacity-50 hover:opacity-100 px-1">✕</button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink/60 mb-2">আয়ের খাতসমূহ</h3>
              <div className="flex flex-wrap gap-2">
                {categories.filter((c) => c.type === 'income').map((c) => (
                  <span
                    key={c.id}
                    className="flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full text-sm border"
                    style={{ borderColor: c.color, color: c.color }}
                  >
                    {c.name}
                    <button onClick={() => deleteCategory(c.id)} className="opacity-50 hover:opacity-100 px-1">✕</button>
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setModal('category')}
              className="w-full py-2.5 rounded-lg border-2 border-dashed border-teal-light text-teal font-medium"
            >
              + নতুন খাত যোগ করুন
            </button>
          </div>
        )}

        {tab === 'budgets' && (
          <div className="space-y-2">
            {budgets.map((b) => {
              const cat = categories.find((c) => c.id === b.categoryId)
              return (
                <div key={b.id} className="flex justify-between items-center bg-white rounded-lg px-4 py-3 shadow-sm">
                  <span className="font-medium">{cat?.name}</span>
                  <span className="text-ink/60">৳{b.limit.toLocaleString('en-BD')} / মাস</span>
                </div>
              )
            })}
            <button
              onClick={() => setModal('budget')}
              className="w-full py-2.5 rounded-lg border-2 border-dashed border-teal-light text-teal font-medium mt-2"
            >
              + বাজেট সেট করুন
            </button>
          </div>
        )}
      </main>

      {/* নিচের ট্যাব নেভিগেশন */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-teal-light flex justify-around py-2 max-w-lg mx-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
              tab === t.id ? 'text-teal bg-teal-light' : 'text-ink/50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* লেনদেন যোগ করার ফ্লোটিং বাটন */}
      <button
        onClick={() => setModal('transaction')}
        className="fixed bottom-16 right-5 w-14 h-14 rounded-full bg-gold text-white text-2xl font-bold shadow-lg flex items-center justify-center"
        aria-label="নতুন লেনদেন যোগ করুন"
      >
        +
      </button>

      {/* মোডাল */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50" onClick={() => setModal(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg p-5 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-bold text-lg mb-4">
              {modal === 'transaction' && 'নতুন লেনদেন'}
              {modal === 'account' && 'নতুন একাউন্ট'}
              {modal === 'budget' && 'বাজেট সেট করুন'}
              {modal === 'category' && 'নতুন খাত যোগ করুন'}
            </h2>
            {modal === 'transaction' && (
              <TransactionForm accounts={accounts} categories={categories} onAdd={addTransaction} onClose={() => setModal(null)} />
            )}
            {modal === 'account' && <AccountForm onAdd={addAccount} onClose={() => setModal(null)} />}
            {modal === 'budget' && <BudgetForm categories={categories} onAdd={addBudget} onClose={() => setModal(null)} />}
            {modal === 'category' && <CategoryForm onAdd={addCategory} onClose={() => setModal(null)} />}
          </div>
        </div>
      )}
    </div>
  )
}
