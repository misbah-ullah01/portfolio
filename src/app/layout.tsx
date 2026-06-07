import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Misbah Ullah - Creative Systems Engineer",
  description:
    "A manga-inspired portfolio for Misbah Ullah: GIKI Computer Science student building DevOps, cloud infrastructure, cybersecurity, systems programming, and digital logic projects.",
  keywords: [
    "Misbah Ullah",
    "Portfolio",
    "DevOps",
    "Cloud",
    "Cybersecurity",
    "Systems Engineering",
    "GIKI",
    "Software Engineer",
    "Digital Logic Design",
  ],
  authors: [{ name: "Misbah Ullah" }],
  openGraph: {
    title: "Misbah Ullah - Creative Systems Engineer",
    description:
      "Manga-inspired portfolio for DevOps, cloud, cybersecurity, systems programming, and DLD projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
