import type { PropsWithChildren } from "react";

export const Header = ({ children }: PropsWithChildren) => (
  <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
    {children}
  </header>
);
