// 'app/layout.tsx'
import type { Metadata } from "next";
import RootBackground from "@/components/Root_Background";
import { ToastProvider } from "@/contexts/ToastContext";
import { UIProvider } from "@/contexts/UIContext";
import Toast from "@/components/Toast";
import { inter } from "./fonts";
import "./globals.css";
import "@aws-amplify/ui-react/styles.css";

import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mag-foundation",
  description:
    "mag-foundation is a fullstack Typescript app template with Next.js, Framer Motion, TailwindCSS, and AWS Amplify Gen2 with full CI/CD.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <div className="opacity"></div>
        <ConfigureAmplifyClientSide />
        <UIProvider>
          <ToastProvider>
            <Toast />
            <RootBackground />
            <div className="absolute w-full h-screen">{children}</div>
          </ToastProvider>
        </UIProvider>
      </body>
    </html>
  );
}
