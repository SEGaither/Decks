import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Small Deck Builder in Albertville, Guntersville & Boaz | Daychanger Decks",
  description:
    "Daychanger Decks builds small walk-out and floating decks for back-door step and concrete-patio situations in Albertville, Guntersville, and Boaz, Alabama. Free on-site quote. Shane Gaither, owner.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
