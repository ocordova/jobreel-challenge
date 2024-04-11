"use client";
import Logo from "./logo";

export default function Header() {
  return (
    <div className="w-full p-8 mb-4 h-14 flex justify-center sm:justify-start items-center">
      <Logo />
    </div>
  );
}
