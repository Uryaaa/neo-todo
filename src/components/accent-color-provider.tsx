"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type AccentColor = "blue" | "pink" | "green" | "yellow" | "orange" | "purple" | "cyan";

interface AccentColorContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const AccentColorContext = createContext<AccentColorContextType | undefined>(undefined);

export function useAccentColor() {
  const context = useContext(AccentColorContext);
  if (context === undefined) {
    throw new Error("useAccentColor must be used within an AccentColorProvider");
  }
  return context;
}

export function AccentColorProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColor] = useState<AccentColor>("pink");
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch user's accent color from the database
  useEffect(() => {
    async function fetchUserSettings() {
      try {
        const response = await fetch("/api/settings/user-preferences");
        if (response.ok) {
          const data = await response.json();
          if (data.accentColor && ["blue", "pink", "green", "yellow", "orange", "purple", "cyan"].includes(data.accentColor)) {
            setAccentColor(data.accentColor);
            localStorage.setItem("accentColor", data.accentColor);
          }
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
      } finally {
        setIsInitialized(true);
      }
    }

    fetchUserSettings();
  }, []);

  // Apply accent color from localStorage if available
  useEffect(() => {
    if (isInitialized) {
      // Try to get the accent color from localStorage as a fallback
      const storedColor = localStorage.getItem("accentColor") as AccentColor | null;
      if (storedColor && ["blue", "pink", "green", "yellow", "orange", "purple", "cyan"].includes(storedColor)) {
        setAccentColor(storedColor);
      }
    }
  }, [isInitialized]);

  // Apply the accent color to the document whenever it changes
  useEffect(() => {
    // Remove all accent classes first
    document.documentElement.classList.remove(
      "accent-blue",
      "accent-pink",
      "accent-green",
      "accent-yellow",
      "accent-orange",
      "accent-purple",
      "accent-cyan"
    );

    // Add the new accent class
    document.documentElement.classList.add(`accent-${accentColor}`);

    // Set the accent color property
    document.documentElement.style.setProperty("--accent-color", accentColor);

    console.log("Applied accent color:", accentColor);
  }, [accentColor]);

  const updateAccentColor = (color: AccentColor) => {
    console.log("Updating accent color to:", color);
    setAccentColor(color);
    localStorage.setItem("accentColor", color);
  };

  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor: updateAccentColor }}>
      {children}
    </AccentColorContext.Provider>
  );
}
