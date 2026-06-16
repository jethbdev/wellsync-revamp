import * as React from "react";
import "@healthbridge/ui/dist/styles.css";
import { Providers } from "./providers";

export const metadata = {
  title: "HealthBridge Staff Portal",
  description: "Clinical and logistics management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-lock" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem("medistock-theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  if (saved === "dark" || (!saved && prefersDark)) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="scroll-lock">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
