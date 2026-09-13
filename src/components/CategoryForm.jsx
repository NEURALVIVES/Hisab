import { useState } from 'react'
import { v4 as uuid } from 'uuid'

// ক্যাটাগরির জন্য কিছু প্রি-সেট রঙ, যাতে ইউজারকে কালার-পিকার নিয়ে ভাবতে না হয়
const COLORS = [
  '#C8553D', '#D9A441', '#8E5572', '#3D5A80', '#9E2A2B',
  '#5E548E', '#4C8C4B', '#146C6B', '#2A9D8F', '#E07A5F',
]

export default function CategoryForm({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('expense')
  const [color, setColor] = useState(COLORS[0])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ id: uuid(), name: name.trim(), type, color })
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
          খরচের খাত
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 text-sm font-semibold transition ${
            type === 'income' ? 'bg-income text-white' : 'bg-white text-ink/60'
          }`}
        >
          আয়ের খাত
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">খাতের নাম</label>
        <input
          type="text"
          required
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="যেমন: গরুর মাংস, টিউশন আয়, ইন্টারনেট বিল"
          className="w-full rounded-lg border border-teal-light px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">রঙ বেছে নিন</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className="w-8 h-8 rounded-full border-2"
              style={{ backgroundColor: c, borderColor: color === c ? '#1B2B2B' : 'transparent' }}
              aria-label={`রঙ ${c}`}
            />
          ))}
        </div>
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
