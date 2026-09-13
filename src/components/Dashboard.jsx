import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function Dashboard({ transactions, categories, accounts, budgets }) {
  const thisMonth = new Date().toISOString().slice(0, 7)
  const monthTx = transactions.filter((t) => t.date.startsWith(thisMonth))

  const income = monthTx.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = monthTx.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = income - expense

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c]))
  const byCategory = {}
  monthTx.filter((t) => t.type === 'expense').forEach((t) => {
    byCategory[t.categoryId] = (byCategory[t.categoryId] || 0) + t.amount
  })
  const pieData = Object.entries(byCategory).map(([id, value]) => ({
    name: catMap[id]?.name || 'অন্যান্য',
    value,
    color: catMap[id]?.color || '#999',
  }))

  const totalAccountBalance = accounts.reduce((s, a) => s + (a.balance || 0), 0) + balance

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard label="ইনকাম (এই মাস)" value={income} color="text-income" />
        <SummaryCard label="খরচ (এই মাস)" value={expense} color="text-expense" />
        <SummaryCard label="মোট ব্যালেন্স" value={totalAccountBalance} color="text-teal" />
      </div>

      {pieData.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-2 text-sm text-ink/70">খাত অনুযায়ী খরচ</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `৳${v.toLocaleString('en-BD')}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {budgets.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <h3 className="font-semibold text-sm text-ink/70">বাজেট অবস্থা</h3>
          {budgets.map((b) => {
            const cat = catMap[b.categoryId]
            const spent = byCategory[b.categoryId] || 0
            const pct = Math.min(100, (spent / b.limit) * 100)
            const over = spent > b.limit
            return (
              <div key={b.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{cat?.name}</span>
                  <span className={over ? 'text-expense font-semibold' : 'text-ink/60'}>
                    ৳{spent.toLocaleString('en-BD')} / ৳{b.limit.toLocaleString('en-BD')}
                  </span>
                </div>
                <div className="h-2 bg-teal-light rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${over ? 'bg-expense' : 'bg-teal'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SummaryCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm">
      <p className="text-xs text-ink/50 mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>৳{value.toLocaleString('en-BD')}</p>
    </div>
  )
}
