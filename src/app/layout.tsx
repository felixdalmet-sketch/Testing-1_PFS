import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "PAPER FASHION WALK 2026 | REIMAGINE • RECYCLE • RAMP WALK",
  description: "A creative runway experience celebrating imagination, design thinking and responsible use of materials. KLE CBALC, Belagavi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="paper-bg antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
