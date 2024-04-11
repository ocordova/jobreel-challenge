"use client";
import Logo from "@/components/logo";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Header() {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Logo />

      <Button size="sm" variant="outline" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
