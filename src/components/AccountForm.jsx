import { useState } from 'react'
import { v4 as uuid } from 'uuid'

const TYPES = [
  { id: 'cash', label: 'ক্যাশ' },
  { id: 'wallet', label: 'মোবাইল ওয়ালেট (বিকাশ/নগদ/রকেট)' },
  { id: 'bank', label: 'ব্যাংক' },
  { id: 'card', label: 'ক্রেডিট কার্ড' },
]

export default function AccountForm({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('wallet')
  const [balance, setBalance] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name) return
    onAdd({ id: uuid(), name, type, balance: parseFloat(balance) || 0 })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">একাউন্টের নাম</label>
        <input
          type="text"
          required
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="যেমন: সিটি ব্যাংক"
          className="w-full rounded-lg border border-teal-light px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">ধরন</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-teal-light px-3 py-2">
          {TYPES.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">শুরুর ব্যালেন্স (৳)</label>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="0"
          className="w-full rounded-lg border border-teal-light px-3 py-2"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-teal-light text-ink/70 font-medium">
          বাতিল
        </button>
        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition">
          যোগ করুন
        </button>
      </div>
    </form>
  )
}
