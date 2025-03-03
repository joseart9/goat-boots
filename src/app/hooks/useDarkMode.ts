"use client";
import { useState, useEffect } from "react";

const useDarkMode = () => {
  // Estado inicial basado en la preferencia actual
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => {
      setIsDarkMode(event.matches);
    };

    // Agrega el listener de cambios en la preferencia
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      // Compatibilidad con navegadores antiguos (como Safari)
      mediaQuery.addListener(handleChange);
    }

    // Limpieza al desmontar el componente
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isDarkMode;
};

export default useDarkMode;
