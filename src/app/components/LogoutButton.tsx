"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const LogoutButton = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    if (!userId) return toast.error("User not found!");

    toast.loading("Deleting account...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) throw new Error(data.error);

      toast.success("Account deleted successfully!");

      router.push("/");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to delete account");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <button
      className="mt-6 w-full bg-primYellow openSans text-white py-3 px-6 rounded-md font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
      onClick={handleLogout}
      disabled={loading}
    >
      <LogOut size={20} />
      <span>Sign Out</span>
    </button>
  );
};

export default LogoutButton;
