import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Business Insights | Ide Bisnis & Tips Usaha",
    template: "%s | Business Insights",
  },
  description:
    "Blog bisnis profesional: ide usaha, tips entrepreneurship, pemasaran digital, dan strategi monetisasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
