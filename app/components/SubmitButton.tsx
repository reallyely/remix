import type { PropsWithChildren } from "react";

export const SubmitButton = ({ children }: PropsWithChildren) => (
  <button
    type="submit"
    className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
  >
    {children}
  </button>
);
