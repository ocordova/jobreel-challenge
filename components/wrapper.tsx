import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return <div className="w-full mx-auto max-w-lg px-4">{children}</div>;
}
