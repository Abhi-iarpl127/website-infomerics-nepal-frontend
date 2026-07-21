"use client";

import { createContext, useContext, useState } from "react";

type LayoutContextType = {
  showHeader: boolean;
  showFooter: boolean;
  setShowHeader: (show: boolean) => void;
  setShowFooter: (show: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  return (
    <LayoutContext.Provider value={{ showHeader, showFooter, setShowHeader, setShowFooter }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
