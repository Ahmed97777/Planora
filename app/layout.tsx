import type { Metadata } from "next";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s / Planora",
    default: "Welcome / Planora",
  },
  description:
    "Luxurious projects and tasks planning. Organize tasks, track progress, and stay on top of your workflow with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col `}
      >
        <div className="flex-1 flex">
          <main className="w-full max-w-full mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
