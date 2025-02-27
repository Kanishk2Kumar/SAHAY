import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/UserContext";

// IBM Plex Sans Font Configuration
const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

// Bebas Neue Font Configuration
const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

// Cormorant Garamond Font Configuration
const cormorantGaramond = localFont({
  src: [
    { path: "/fonts/CormorantGaramond-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/CormorantGaramond-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--cormorant-garamond",
});

export const metadata: Metadata = {
  title: "SAHAY",
  description: "SAHAY: सेवा, आशा और विश्वास का संगम",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} ${cormorantGaramond.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
