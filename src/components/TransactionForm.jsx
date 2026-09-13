import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function TransactionForm({ accounts, categories, onAdd, onClose }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [categoryId, setCategoryId] = useState('')
  const [accountId, setAccountId] = useState(accounts[0]?.id || '')
  const [note, setNote] = useState('')

  const filteredCategories = categories.filter((c) => c.type === type)

  function handleSubmit(e) {
    e.preventDefault()
    if (!amount || !accountId) return
    onAdd({
      id: uuid(),
      type,
      amount: parseFloat(amount),
      date,
      categoryId: categoryId || filteredCategories[0]?.id,
      accountId,
      note,
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex rounded-lg overflow-hidden border border-teal-light">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 text-sm font-semibold transition ${
            type === 'expense' ? 'bg-expense text-white' : 'bg-white text-ink/60'
          }`}
        >
          খরচ
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 text-sm font-semibold transition ${
            type === 'income' ? 'bg-income text-white' : 'bg-white text-ink/60'
          }`}
        >
          ইনকাম
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">পরিমাণ (৳)</label>
        <input
          type="number"
          inputMode="decimal"
          required
          autoFocus
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full rounded-lg border border-teal-light px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">তারিখ</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-teal-light px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">মাধ্যম</label>
          <select
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-full rounded-lg border border-teal-light px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ক্যাটাগরি</label>
        <div className="flex flex-wrap gap-2">
          {filteredCategories.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setCategoryId(c.id)}
              className="px-3 py-1.5 rounded-full text-sm border transition"
              style={{
                borderColor: c.color,
                backgroundColor: categoryId === c.id ? c.color : 'white',
                color: categoryId === c.id ? 'white' : c.color,
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">নোট (ঐচ্ছিক)</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="যেমন: বাজার খরচ"
          className="w-full rounded-lg border border-teal-light px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-teal-light text-ink/70 font-medium">
          বাতিল
        </button>
        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition">
          সেভ করুন
        </button>
      </div>
    </form>
  )
}
