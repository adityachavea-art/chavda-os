import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { FirestoreProvider } from "@/contexts/FirestoreContext";
import AuthGuard from "@/components/auth/AuthGuard";
import { BRAND } from "@/lib/branding";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://chavda-os.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.appName} · ${BRAND.foundedBy}`,
    template: `%s · ${BRAND.appName}`,
  },
  description: BRAND.metaDescription,
  applicationName: BRAND.appName,
  authors: [{ name: BRAND.founderName }],
  creator: BRAND.founderName,
  keywords: [
    "CHAVDA OS",
    "CRM",
    "GST",
    "ITR",
    "business workspace",
    "Aditya Chavda",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BRAND.appName,
    title: BRAND.appName,
    description: BRAND.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.appName,
    description: BRAND.metaDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <FirestoreProvider>
            <AuthGuard>{children}</AuthGuard>
          </FirestoreProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#111318",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
