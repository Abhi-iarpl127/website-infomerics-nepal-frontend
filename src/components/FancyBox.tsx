import React, { useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface FancyboxProps {
  delegate?: string;
  options?: Record<string, unknown>;
  children?: React.ReactNode;
}

function Fancybox({ delegate = "[data-fancybox]", options = {}, children }: FancyboxProps) {
  useEffect(() => {
    NativeFancybox.bind(delegate, options);

    return () => {
      NativeFancybox.destroy();
    };
  }, [delegate, options]);

  return <>{children}</>;
}

export default Fancybox;
