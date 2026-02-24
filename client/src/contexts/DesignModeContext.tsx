import * as React from 'react';

export type DesignMode = 'normal' | 'wireframe' | 'low-fidelity';

interface DesignModeContextType {
  mode: DesignMode;
  setMode: (mode: DesignMode) => void;
}

const DesignModeContext = React.createContext<
  DesignModeContextType | undefined
>(undefined);

export function DesignModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<DesignMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('design-mode');
      return (saved as DesignMode) || 'normal';
    }
    return 'normal';
  });

  React.useEffect(() => {
    localStorage.setItem('design-mode', mode);

    // Apply classes to body for global styling
    document.body.classList.remove('design-wireframe', 'design-low-fidelity');
    if (mode === 'wireframe') {
      document.body.classList.add('design-wireframe');
    } else if (mode === 'low-fidelity') {
      document.body.classList.add('design-low-fidelity');
    }
  }, [mode]);

  return (
    <DesignModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DesignModeContext.Provider>
  );
}

export function useDesignMode() {
  const context = React.useContext(DesignModeContext);
  if (context === undefined) {
    throw new Error('useDesignMode must be used within a DesignModeProvider');
  }
  return context;
}
