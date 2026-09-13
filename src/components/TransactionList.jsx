export default function TransactionList({ transactions, categories, accounts, onDelete }) {
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c]))
  const accMap = Object.fromEntries(accounts.map((a) => [a.id, a]))

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))

  if (sorted.length === 0) {
    return <p className="text-center text-ink/50 py-10">এখনো কোনো লেনদেন নেই। উপরের + বাটনে চাপ দিয়ে প্রথম এন্ট্রি যোগ করুন।</p>
  }

  return (
    <div className="space-y-2">
      {sorted.map((t) => {
        const cat = catMap[t.categoryId]
        const acc = accMap[t.accountId]
        return (
          <div key={t.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat?.color || '#999' }}
              />
              <div>
                <p className="font-medium text-sm">{cat?.name || 'অন্যান্য'}</p>
                <p className="text-xs text-ink/50">{t.date} · {acc?.name}{t.note ? ` · ${t.note}` : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-semibold ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                {t.type === 'income' ? '+' : '-'}৳{t.amount.toLocaleString('en-BD')}
              </span>
              <button onClick={() => onDelete(t.id)} className="text-ink/30 hover:text-expense text-sm">✕</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
