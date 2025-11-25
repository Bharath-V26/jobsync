"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseFollower() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-primary/30 rounded-full pointer-events-none z-50 blur-xl"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                opacity: isVisible ? 1 : 0,
            }}
        />
    );
}
