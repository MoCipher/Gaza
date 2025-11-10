import type { Metadata } from "next";
import Link from "next/link";
import { Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const cairo = Cairo({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voices of Palestine",
  description: "Testimonials, stories, and support for Palestine.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Voices of Palestine",
    description: "Testimonials, stories, and support for Palestine.",
    type: "website",
    locale: "en_US"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairo.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="border-b">
              <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-5 relative overflow-hidden rounded-sm border border-border">
                    {/* Palestine flag */}
                    <div className="absolute inset-0 grid grid-cols-3">
                      <div className="bg-[oklch(0.2_0.01_49)]"></div>
                      <div className="bg-white"></div>
                      <div className="bg-[oklch(0.71_0.17_149)]"></div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-[oklch(0.65_0.27_29)]"></div>
                  </div>
                  <Link href="/" className="font-semibold tracking-tight">Voices of Palestine</Link>
                </div>
                <nav className="flex items-center gap-6 text-sm">
                  <Link href="/testimonials" className="hover:underline">Testimonials</Link>
                  <Link href="/submit" className="hover:underline">Submit</Link>
                  <Link href="/auth/signin" className="hover:underline">Sign In</Link>
                </nav>
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>

            <footer className="border-t">
              <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground flex items-center justify-between">
                <span>© {new Date().getFullYear()} Voices of Palestine</span>
                <div className="flex items-center gap-3">
                  <Link href="/privacy" className="hover:underline">Privacy</Link>
                  <Link href="/terms" className="hover:underline">Terms</Link>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
