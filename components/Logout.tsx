// components/Logout.tsx
"use client";

import { useContext } from 'react';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { ToastContext } from "@/contexts/ToastContext";

export default function Logout() {
  const router = useRouter();
  const { addToast } = useContext(ToastContext);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error('Error signing out: ', error);
      // Adding a toast message for sign out error
      addToast({
        messageType: 'error',
        message: 'Error signing out. Please try again.',
      });
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="m-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-blue-50 hover:text-white rounded-md"
    >
      Sign Out
    </button>
  );
}
