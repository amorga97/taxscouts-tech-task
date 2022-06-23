import { ReactElement } from "react";
import { QuickSearch } from "../components/quick-search";

export function Layout({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) {
  return (
    <>
      <QuickSearch />
      {children}
    </>
  );
}
