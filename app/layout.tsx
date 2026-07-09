import type { Metadata } from "next";
import SmoothScrolling from "@/components/SmoothScrolling";
import "./globals.css";

export const metadata: Metadata = {
  title: "Affan K — Product Designer",
  description: "Product designer in San Francisco.",
  openGraph: {
    title: "Affan K — Product Designer",
    description: "Product designer in San Francisco.",
    url: "https://affank.com",
    siteName: "Affan K",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
