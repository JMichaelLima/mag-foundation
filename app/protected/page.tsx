// app/protected/page.tsx
import { quicksand } from "@/app/fonts";
import Logout from "@/components/Logout";
import  NumberWheel  from "@/components/NumberWheel";
export default function LoginPage() {
  return (
    <>
      <Logout />
      <div className="flex items-center text-center justify-center min-h-screen">
        <div className={`${quicksand.className} text-white px-6 py-4`}>
          Protected Page
        </div>
      </div>
    </>
  );
}
