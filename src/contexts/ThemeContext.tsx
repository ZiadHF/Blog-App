"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark";

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: ThemeType;
    storage?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    initialTheme = "light",
    storage = "theme",
}) => {
    const [theme, setTheme] = useState<ThemeType>(initialTheme);

    useEffect(() => {
        const storedTheme = localStorage.getItem(storage) as ThemeType;
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, [storage]);

    useEffect(() => {
        localStorage.setItem(storage, theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme, storage]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return theme;
}

export default ThemeProvider;