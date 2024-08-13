import { ThemeProvider } from "next-themes";

import React from "react";

const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default DarkModeProvider;
