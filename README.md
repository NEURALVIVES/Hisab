# হিসাব — Personal Income Expense Tracker

React + Vite + Tailwind দিয়ে বানানো একটা পার্সোনাল আয়-ব্যয় ট্র্যাকার। সব ডেটা ব্রাউজারের localStorage এ সেভ থাকে — কোনো ব্যাকএন্ড সার্ভার লাগে না।

## লোকাল রান করা

```bash
npm install
npm run dev
```

## বিল্ড

```bash
npm run build
```

## GitHub Pages এ ডিপ্লয়

`vite.config.js` এ `base: '/your-repo-name/'` সেট করে তারপর:

```bash
npm run build
npm install -D gh-pages
npx gh-pages -d dist
```
