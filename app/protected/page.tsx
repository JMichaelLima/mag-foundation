// app/protected/page.tsx
import Logout from "@/components/Logout";
export default function LoginPage() {
  return (
    <div>
      <Logout />
      <div>Protected</div>
    </div>
  );
}
