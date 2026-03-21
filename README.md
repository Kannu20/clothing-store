<div align="center">

```
██╗     ██╗   ██╗██╗  ██╗███████╗
██║     ██║   ██║╚██╗██╔╝██╔════╝
██║     ██║   ██║ ╚███╔╝ █████╗
██║     ██║   ██║ ██╔██╗ ██╔══╝
███████╗╚██████╔╝██╔╝ ██╗███████╗
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
```

# LUXE — Premium Fashion E-Commerce

**A production-grade, full-stack clothing store built with Next.js 14**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-02042B?style=flat-square&logo=razorpay)](https://razorpay.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

*Inspired by Zara · H&M · Myntra · Totême*

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✦ Overview

LUXE is a **fully featured premium clothing store** with real authentication, real payments, phone/email OTP verification, WhatsApp order fulfilment, and an editorial luxury design. Built for a real cloth shop wanting to digitise — zero compromise on quality.

```
Customer visits → Browses → Adds to cart → Logs in → Pays via Razorpay
→ Order auto-sent to shop WhatsApp → Shop owner confirms → Done.
```

---

## 🗂️ Complete Folder Structure

```
luxe-store/
│
├── 📁 app/                              # Next.js 14 App Router
│   ├── layout.jsx                       # Root layout — fonts, AuthProvider
│   ├── page.jsx                         # Home page
│   ├── globals.css                      # Tailwind base + custom utilities
│   │
│   ├── 📁 shop/page.jsx                 # Shop — filters, sorting, grid
│   ├── 📁 product/[id]/page.jsx         # Product detail — gallery, size/colour picker
│   ├── 📁 cart/page.jsx                 # Cart — live qty, free shipping bar
│   ├── 📁 checkout/page.jsx             # Checkout — Razorpay + WhatsApp dispatch
│   ├── 📁 wishlist/page.jsx             # Saved products
│   ├── 📁 login/page.jsx                # Sign in — Email + Google OAuth
│   ├── 📁 signup/page.jsx               # Sign up — with phone field + strength meter
│   ├── 📁 account/page.jsx              # Dashboard — Email OTP + Phone OTP verify
│   ├── 📁 about/page.jsx                # Brand story, team, timeline, press
│   ├── 📁 contact/page.jsx              # Contact form + WhatsApp CTA + FAQs
│   ├── 📁 size-guide/page.jsx           # Women / Men / Kids size tables
│   ├── 📁 shipping/page.jsx             # Shipping options + returns policy
│   ├── 📁 order-tracking/page.jsx       # Live order status by Order ID
│   ├── 📁 faqs/page.jsx                 # 25 FAQs — searchable, categorised
│   │
│   └── 📁 api/                          # Next.js API Routes (backend)
│       ├── 📁 auth/
│       │   ├── sync-user/route.js       # POST — Firebase → MongoDB upsert
│       │   ├── me/route.js              # GET/PATCH — fetch/update profile
│       │   ├── send-email-otp/route.js  # POST — generate + email 6-digit OTP
│       │   ├── verify-email-otp/route.js# POST — verify OTP, mark emailVerified
│       │   └── verify-phone/route.js    # POST — mark phoneVerified after SMS OTP
│       ├── 📁 create-order/route.js     # POST — create Razorpay order (server-side)
│       └── 📁 verify-payment/route.js   # POST — HMAC signature verification
│
├── 📁 components/
│   ├── 📁 layout/
│   │   ├── Navbar.jsx                   # Sticky — search overlay, user dropdown, mobile drawer
│   │   └── Footer.jsx                   # Newsletter, links, contact, socials
│   ├── 📁 sections/                     # Home page sections
│   │   ├── HeroSection.jsx
│   │   ├── MarqueeBar.jsx
│   │   ├── CategoriesSection.jsx
│   │   ├── FeaturedSection.jsx
│   │   ├── TrendingSection.jsx
│   │   ├── PromoBanner.jsx
│   │   ├── TestimonialsSection.jsx
│   │   └── InstagramSection.jsx
│   └── 📁 ui/
│       └── ProductCard.jsx              # Card — quick-add, wishlist, colour dots
│
├── 📁 contexts/
│   └── AuthContext.jsx                  # Global auth state — useAuth() hook
│
├── 📁 lib/
│   ├── firebase.js                      # Firebase client SDK (browser)
│   ├── firebaseAdmin.js                 # Firebase Admin SDK (server only)
│   ├── mongodb.js                       # Mongoose connection with singleton pooling
│   ├── products.js                      # 13 dummy products + SHOP_WHATSAPP config
│   └── store.js                         # Zustand — cart + wishlist (localStorage)
│
├── 📁 models/
│   ├── User.js                          # Mongoose user schema
│   └── OtpToken.js                      # OTP schema with 10-min TTL auto-expiry
│
├── .env.local                           # 🔐 All secrets (never committed)
├── .env.example                         # Template for onboarding
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ⚡ Feature Highlights

### 🛍️ Shopping Experience
| Feature | Details |
|---|---|
| **Home Page** | Hero banner, animated marquee, categories, featured, trending, promo splits, testimonials, Instagram grid |
| **Shop Page** | Filter by category / price / size / colour, live sort (newest, trending, price, rating) |
| **Product Page** | Multi-image gallery, size + colour selector, quantity picker, add-to-cart, WhatsApp enquiry |
| **Cart** | Real-time qty updates, free shipping progress bar, coupon input |
| **Wishlist** | Save/remove products, persisted via Zustand + localStorage |
| **Search** | Instant live overlay — searches name, category, description |

### 💳 Payments — Razorpay
| Step | What happens |
|---|---|
| **1** | `POST /api/create-order` — server creates Razorpay order, returns `order_id` |
| **2** | Razorpay modal opens with `order_id` (card, UPI, net banking, wallets, EMI) |
| **3** | `POST /api/verify-payment` — HMAC signature verification on server |
| **4** | WhatsApp auto-opens with full order + Payment ID + Order ID |

### 🔐 Authentication — Firebase + MongoDB
| Method | Flow |
|---|---|
| **Google OAuth** | One-click Google sign-in → auto email-verified |
| **Email / Password** | Register with name, email, phone, password → email OTP verification |
| **Forgot Password** | Reset link sent via Firebase |
| **Email OTP** | 6-digit OTP via Gmail SMTP → marks `emailVerified` in MongoDB + Firebase |
| **Phone OTP** | SMS via Firebase `PhoneAuthProvider` → `updatePhoneNumber` on current user |

### 📧 Email OTP System
```
Click "Verify Email"
  → POST /api/auth/send-email-otp
  → 6-digit OTP generated, stored in MongoDB (TTL: 10 min, max attempts: 5)
  → Branded HTML email sent via nodemailer (Gmail SMTP)
  → Inline 6-box OTP input appears

User enters OTP
  → POST /api/auth/verify-email-otp
  → OTP checked, attempt counter enforced
  → emailVerified = true in MongoDB + Firebase Admin SDK
  → Green "Verified ✓" badge appears instantly
```

### 📱 Phone OTP System
```
Click "Verify Now" / "Add & Verify"
  → Invisible reCAPTCHA via Firebase
  → PhoneAuthProvider.verifyPhoneNumber → SMS sent
  → 6-box OTP input (auto-advance, auto-submit, paste support)

User enters OTP
  → PhoneAuthProvider.credential(verificationId, code)
  → updatePhoneNumber(auth.currentUser, credential)
  → phoneVerified = true in MongoDB
  → Green "Verified ✓" badge appears instantly
```

### 💬 WhatsApp Order Fulfilment
After Razorpay payment is confirmed, WhatsApp **auto-opens** with:
```
✅ PAYMENT CONFIRMED — LUXE STORE
━━━━━━━━━━━━━━━━━━━━━
💳 Payment ID: pay_Qx7mK9rTpLnW4z
📋 Order ID:   order_XXXXXXXXXX

👤 CUSTOMER DETAILS
Name:    Priya Sharma
Phone:   9876543210
Address: 23, Palm Grove, Mumbai — 400050

🧾 ORDER DETAILS
1. Ivory Linen Blazer
   • Size: S  • Colour: Ivory  • Qty: 1  • ₹4,299

💰 GRAND TOTAL: ₹6,997
```

---

## 🚀 Setup Guide

### Prerequisites
- Node.js 18+
- A Firebase project
- A MongoDB Atlas cluster
- A Razorpay account
- A Gmail account (for email OTP)

---

### Step 1 — Clone & Install

```bash
git clone https://github.com/your-username/luxe-store.git
cd luxe-store
npm install
```

---

### Step 2 — Environment Variables

Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local`:

```env
# ── RAZORPAY ─────────────────────────────────────────────────────────────────
# dashboard.razorpay.com → Settings → API Keys
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX

# ── FIREBASE (Client — safe to expose) ───────────────────────────────────────
# console.firebase.google.com → Project Settings → Your Apps → Web
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# ── FIREBASE ADMIN (Server only — NEVER prefix with NEXT_PUBLIC_) ─────────────
# console.firebase.google.com → Project Settings → Service Accounts → Generate Key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

# ── MONGODB ───────────────────────────────────────────────────────────────────
# cloud.mongodb.com → Connect → Drivers
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/luxe_store

# ── EMAIL / SMTP (for Email OTP) ──────────────────────────────────────────────
# Gmail App Password: myaccount.google.com → Security → App Passwords
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
```

---

### Step 3 — Firebase Console Setup

1. Go to **console.firebase.google.com** → your project
2. **Authentication** → **Sign-in method** → Enable:
   - ✅ **Email/Password**
   - ✅ **Google**
   - ✅ **Phone**
3. **Authentication** → **Settings** → **Authorized domains** → Add `localhost`
4. **Project Settings** → **Service Accounts** → **Generate new private key** → download JSON → copy values to `.env.local`

---

### Step 4 — MongoDB Atlas Setup

1. Go to **cloud.mongodb.com** → your cluster
2. **Security** → **Network Access** → **Add IP Address** → **Allow Access From Anywhere** (`0.0.0.0/0`)
3. **Security** → **Database Access** → Create a user with **Read and Write** access
4. **Databases** → **Connect** → **Drivers** → copy the connection string to `MONGODB_URI`

---

### Step 5 — Gmail App Password (for Email OTP)

1. Go to **myaccount.google.com** → **Security**
2. Enable **2-Step Verification** (required)
3. Search **"App Passwords"** → Select app: **Mail** → Generate
4. Copy the 16-character password → paste into `SMTP_PASS` in `.env.local`

---

### Step 6 — Configure WhatsApp Number

Open `lib/products.js`:

```js
export const SHOP_WHATSAPP = "919876543210"; // 91 + 10-digit number
```

---

### Step 7 — Run

```bash
npm run dev        # Development
npm run build      # Production build
npm start          # Start production server
```

Open **http://localhost:3000** 🎉

---

## 🎨 Design System

| Element | Value |
|---|---|
| **Display Font** | Cormorant Garamond (300, 400, 500, 600, 700) |
| **Body Font** | DM Sans (300, 400, 500, 600) |
| **Primary Palette** | Stone 50–900, White, Champagne `#f5ede0`, Cream `#faf8f5` |
| **Style Direction** | Editorial luxury — Zara × Totême × Brunello Cucinelli |
| **Animation Library** | Framer Motion 11 — stagger, fade-up, spring, presence |
| **Icon Library** | Lucide React |

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **UI** | React 18 + Tailwind CSS 3 |
| **Animation** | Framer Motion 11 |
| **Auth** | Firebase Auth (Email, Google, Phone OTP) |
| **Database** | MongoDB Atlas + Mongoose |
| **Payments** | Razorpay (Cards, UPI, Net Banking, Wallets, EMI) |
| **Email** | Nodemailer + Gmail SMTP |
| **State** | Zustand 4 (cart + wishlist, persisted) |
| **Icons** | Lucide React |

---

## 🛠️ Customisation

### Add / Edit Products

Open `lib/products.js` and add to the `products` array:

```js
{
  id:            "unique-id",
  name:          "Product Name",
  category:      "Women",              // "Women" | "Men" | "Kids"
  gender:        "Women",
  price:         2999,
  originalPrice: 4000,                 // optional — shows discount badge
  images:        ["url1", "url2"],
  sizes:         ["XS", "S", "M", "L", "XL"],
  colors:        ["Black", "White"],
  colorHex:      { Black: "#1a1a1a", White: "#FFFFFF" },
  description:   "Product description...",
  tag:           "New Arrival",        // "New Arrival" | "Bestseller" | "Trending"
  trending:      true,
  featured:      true,
  rating:        4.8,
  reviews:       120,
  fabric:        "100% Cotton",
  care:          "Machine wash cold",
}
```

### Add a New Page

```bash
mkdir app/my-page && touch app/my-page/page.jsx
```

Import `Navbar` and `Footer` from `@/components/layout/` and you're live.

---

## 🔒 Security Notes

- **`.env.local`** is in `.gitignore` — secrets are never committed
- `FIREBASE_PRIVATE_KEY` lives server-side only — never prefixed with `NEXT_PUBLIC_`
- `RAZORPAY_KEY_SECRET` lives server-side only — payment signatures verified on server
- OTP attempts are capped at **5 per token** — brute force protected
- OTP tokens **auto-expire** in 10 minutes via MongoDB TTL index

---

## 📄 All Pages at a Glance

| Route | Page |
|---|---|
| `/` | Home |
| `/shop` | Shop (filters + sorting) |
| `/product/[id]` | Product Detail |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout + Razorpay |
| `/wishlist` | Wishlist |
| `/login` | Sign In |
| `/signup` | Create Account |
| `/account` | Account Dashboard |
| `/about` | About Us |
| `/contact` | Contact + FAQs |
| `/size-guide` | Size Guide |
| `/shipping` | Shipping & Returns |
| `/order-tracking` | Track Order |
| `/faqs` | Frequently Asked Questions |

---

## 📝 License

MIT — free to use, modify, and deploy for commercial projects.

---

<div align="center">

Built with ♥ for premium fashion retail

**LUXE** — Where every detail is intentional.

</div>
