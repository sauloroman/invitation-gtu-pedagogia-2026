import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@phosphor-icons/react";
import { useDrawer } from "@/common/hooks";

interface Props {
    children: React.ReactNode;
}

const FLUID_EASE = [0.22, 1, 0.36, 1] as const;

export const Drawer: React.FC<Props> = ({ children }) => {
    const { onCloseDrawer, isOpen } = useDrawer();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="drawer-overlay"
                    onClick={onCloseDrawer}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: FLUID_EASE }}
                >
                    <motion.div
                        className="drawer-content"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, y: 45, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 35, scale: 0.97 }}
                        transition={{ duration: 0.45, ease: FLUID_EASE }}
                    >
                        <button
                            type="button"
                            className="drawer-close-btn"
                            onClick={onCloseDrawer}
                            aria-label="Cerrar"
                        >
                            <XIcon size={20} weight="bold" />
                        </button>
                        <div className="drawer-body">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
