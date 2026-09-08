import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omawe",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-ground text-ink font-sans min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
