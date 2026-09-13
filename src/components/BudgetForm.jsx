import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function BudgetForm({ categories, onAdd, onClose }) {
  const expenseCategories = categories.filter((c) => c.type === 'expense')
  const [categoryId, setCategoryId] = useState(expenseCategories[0]?.id || '')
  const [limit, setLimit] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!limit || !categoryId) return
    onAdd({ id: uuid(), categoryId, limit: parseFloat(limit), period: 'monthly' })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">ক্যাটাগরি</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full rounded-lg border border-teal-light px-3 py-2">
          {expenseCategories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">মাসিক বাজেট লিমিট (৳)</label>
        <input
          type="number"
          required
          autoFocus
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="যেমন: 5000"
          className="w-full rounded-lg border border-teal-light px-3 py-2"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-teal-light text-ink/70 font-medium">
          বাতিল
        </button>
        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition">
          সেট করুন
        </button>
      </div>
    </form>
  )
}
