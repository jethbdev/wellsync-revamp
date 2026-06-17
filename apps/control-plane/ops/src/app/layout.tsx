import * as React from "react";
import "@healthbridge/ui/dist/styles.css";

export const metadata = {
  title: "Wellsync Console",
  description: "Platform management for Wellsync",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-lock" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
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
      <body className="scroll-lock">{children}</body>
    </html>
  );
}
