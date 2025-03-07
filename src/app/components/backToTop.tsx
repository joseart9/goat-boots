"use client";

import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Función para controlar la visibilidad del botón
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Función para hacer scroll suave hasta el tope de la página
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        // Limpieza del evento al desmontar el componente
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 z-50 p-2 text-white bg-primary-500 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-60 hover:opacity-100"
            >
                <FaArrowUp className="size-10" />
            </button>
        )
    );
};

export default BackToTopButton;
