import React from 'react'
import { motion } from 'framer-motion'
import { InfoIcon } from '@phosphor-icons/react'
import { useModal, useInvitationConfig } from '@/common/hooks'
import { MODAL_NAMES } from '@/store/ui/modal.slice'
import { SearchForm } from './components/search-form/SearchForm'

import logo from '@/assets/images/icons/logo-light.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const Search: React.FC = () => {
    const { onOpenModal } = useModal()
    const { sections } = useInvitationConfig()

    const eventDate = sections.hero?.date || '20 DE NOVIEMBRE DE 2026'

    const handleOpenInfoModal = () => {
        onOpenModal(MODAL_NAMES.searchInfo, 'Información de Acceso')
    }

    return (
        <main className="search">
            <motion.button
                type="button"
                className="search-fixed-info-btn"
                onClick={handleOpenInfoModal}
                aria-label="Información de clave de acceso"
                initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: FLUID_EASE }}
            >
                <InfoIcon size={26} weight="thin" />
            </motion.button>

            <div className="search__container">
                <motion.div
                    className="search-logo"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.0, delay: 0.1, ease: FLUID_EASE }}
                >
                    <img src={logo} alt="Logo light" />
                </motion.div>

                <header className="search-hero">
                    <motion.div
                        className="search-hero__pretitle"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.25, ease: FLUID_EASE }}
                    >
                        Generación 2023 / 2026
                    </motion.div>
                    <motion.h1
                        className="search-hero__title"
                        initial={{ opacity: 0, filter: 'blur(4px)', y: 15 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: 1.1, delay: 0.4, ease: FLUID_EASE }}
                    >
                        Licenciatura en Pedagogía
                    </motion.h1>
                </header>

                <SearchForm />

                <motion.footer
                    className="search-footer-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.0, ease: FLUID_EASE }}
                >
                    <span className="search-footer-info__date">{eventDate}</span>
                </motion.footer>
            </div>
        </main>
    )
}
