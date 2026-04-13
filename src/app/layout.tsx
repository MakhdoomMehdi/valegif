import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Val",
  description: "Val App",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Dancing+Script:wght@700&family=Caveat:wght@600&family=Sacramento&family=Satisfy&family=Great+Vibes&family=Indie+Flower&family=Shadows+Into+Light&family=Cookie&family=Kalam:wght@700&family=Bubblegum+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
