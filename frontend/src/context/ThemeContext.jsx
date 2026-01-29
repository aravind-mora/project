import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "system"
    );

    useEffect(() => {
        const root = document.documentElement;

        const applyTheme = (mode) => {
            root.classList.remove("dark", "light");

            if (mode === "system") {
                const isDark = window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;
                root.classList.add(isDark ? "dark" : "light");
            } else {
                root.classList.add(mode);
            }
        };

        applyTheme(theme);
        localStorage.setItem("theme", theme);

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = () => theme === "system" && applyTheme("system");

        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
