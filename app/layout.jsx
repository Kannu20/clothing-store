import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "LUXE — Premium Fashion",
  description:
    "Curated luxury fashion for men, women, and kids. Shop our premium collection of clothing, shoes, and accessories.",
  keywords: ["fashion", "luxury", "clothing", "premium", "India"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body bg-white text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
