import React, { createContext, useContext, useEffect, useState } from "react";

export const RoktLauncherContext = createContext(null);

export function RoktLauncherContextProvider({
  children,
  accountId,
  sandbox = false,
}) {
  const [launcher, setLauncher] = useState(null);

  useEffect(() => {
    (async () => {
      // Waits for rokt-launcher script to load fully
      await new Promise((resolve) =>
        window.Rokt
          ? resolve()
          : (document.getElementById("rokt-launcher").onload = resolve)
      );

      // Async initializes launcher with accountId and sandbox value
      const launcherInstance = await window.Rokt.createLauncher({
        accountId: accountId,
        sandbox: sandbox,
      });

      setLauncher(launcherInstance);
    })();

    return () => {
      // cleanup
      if (launcher) {
        launcher.terminate();
      }
    };
  }, [accountId, sandbox]);

  // sets the launcher as the value of RoktLauncherContext.Provider
  // ...which is the return value of RoktLauncherContextProvider
  return (
    <RoktLauncherContext.Provider value={launcher}>
      {children}
    </RoktLauncherContext.Provider>
  );
}

// useRoktLauncher() returns value of RoktLauncherContext
// the context's provider's value is the rokt-launcher
export function useRoktLauncher() {
  return useContext(RoktLauncherContext);
}
