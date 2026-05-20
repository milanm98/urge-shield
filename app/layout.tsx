import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steady Path",
  description: "A no-form support toolbox for getting through gambling urges.",
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#eef6f3",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
