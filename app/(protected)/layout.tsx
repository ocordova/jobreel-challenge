import Header from "@/components/onboarding/header";
import Wrapper from "@/components/wrapper";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
