# LUXE — Premium Clothing Store

A full-featured, premium fashion e-commerce frontend built with **Next.js 14 (App Router)**, **React**, **Tailwind CSS**, and **Framer Motion**. Orders are sent directly to the shop owner via **WhatsApp** — no backend required.

---

## 📁 Folder Structure

```
luxe-store/
├── app/
│   ├── layout.jsx              # Root layout (fonts, metadata)
│   ├── page.jsx                # Home page
│   ├── globals.css             # Global Tailwind + custom styles
│   ├── shop/
│   │   └── page.jsx            # Shop page with filters & sorting
│   ├── product/
│   │   └── [id]/
│   │       └── page.jsx        # Product detail page
│   ├── cart/
│   │   └── page.jsx            # Shopping cart
│   ├── checkout/
│   │   └── page.jsx            # Checkout + WhatsApp order
│   └── wishlist/
│       └── page.jsx            # Wishlist page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Sticky navbar with search + mobile menu
│   │   └── Footer.jsx          # Footer with newsletter + links
│   ├── sections/
│   │   ├── HeroSection.jsx     # Full-screen hero banner
│   │   ├── MarqueeBar.jsx      # Animated scrolling ticker
│   │   ├── CategoriesSection.jsx
│   │   ├── FeaturedSection.jsx
│   │   ├── TrendingSection.jsx
│   │   ├── PromoBanner.jsx     # Split promotional banners
│   │   ├── TestimonialsSection.jsx
│   │   └── InstagramSection.jsx
│   └── ui/
│       └── ProductCard.jsx     # Reusable product card with quick-add
│
├── lib/
│   ├── products.js             # All dummy product data + WhatsApp number
│   └── store.js                # Zustand global state (cart + wishlist)
│
├── public/
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure WhatsApp number
Open `lib/products.js` and update the shop owner's WhatsApp number:
```js
export const SHOP_WHATSAPP = "919876543210"; // Format: country code + number
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🛒 WhatsApp Order Flow

When a customer places an order:

1. Fills in their delivery details (name, phone, address, city, pincode)
2. Reviews their order summary
3. Clicks **"Place Order on WhatsApp"**
4. WhatsApp opens with a pre-filled message containing:
   - Customer name, phone, address
   - Each item: name, size, color, quantity, price
   - Shipping, subtotal, and grand total
5. Customer taps **Send** — order lands in the shop owner's WhatsApp instantly

---

## ✨ Features

| Feature | Details |
|---|---|
| 🏠 Home Page | Hero, categories, featured, trending, promo banners, testimonials, Instagram grid |
| 🛍️ Shop Page | Grid layout, filter by category/price/size/color, sort options |
| 📦 Product Page | Image gallery, size/color picker, quantity, add-to-cart, WhatsApp enquiry |
| 🛒 Cart | Live quantity updates, free shipping progress, coupon input |
| 💚 Checkout | 2-step form + WhatsApp order dispatch |
| ❤️ Wishlist | Save/remove products, persisted in localStorage |
| 🔍 Search | Instant live product search overlay |
| 📱 Mobile | Fully responsive, mobile-first design |
| 🎨 Animations | Framer Motion page transitions + micro-interactions |
| 🔒 Persistence | Cart & wishlist saved via Zustand + localStorage |

---

## 🎨 Design System

- **Fonts**: Cormorant Garamond (display) + DM Sans (body)
- **Colors**: White, Black, Stone neutrals, Champagne
- **Style**: Editorial luxury — inspired by Zara, Totême, Brunello Cucinelli
- **Animations**: Staggered fade-up on scroll, image zoom on hover, smooth page transitions

---

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **Framer Motion 11**
- **Zustand 4** (state management)
- **Lucide React** (icons)

---

## 🔧 Customization

### Add products
Edit `lib/products.js` — each product needs:
```js
{
  id: "unique-id",
  name: "Product Name",
  category: "Women" | "Men" | "Kids",
  price: 2999,
  originalPrice: 4000,  // optional, shows discount
  images: ["url1", "url2"],
  sizes: ["S", "M", "L"],
  colors: ["Black", "White"],
  colorHex: { Black: "#1a1a1a", White: "#FFFFFF" },
  description: "...",
  tag: "New Arrival" | "Bestseller" | "Trending",
  trending: true,
  featured: true,
  rating: 4.8,
  reviews: 120,
  fabric: "100% Cotton",
  care: "Machine wash cold"
}
```

### Change WhatsApp number
```js
// lib/products.js
export const SHOP_WHATSAPP = "91XXXXXXXXXX"; // your number
```

---

## 📄 License
MIT — free to use and modify for commercial projects.
