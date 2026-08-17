import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { XIcon, CaretDownIcon } from '@phosphor-icons/react'

import { useMenu } from '@/common/hooks/useMenu'
import { useTicket } from '@/common/hooks/useTicket'
import type { MenuSidebarProps } from '@/common/types'

export const MenuSidebar: React.FC<MenuSidebarProps> = ({
    title = 'Pedagogía 2026',
}) => {
    const { isMenuOpen, onCloseMenu } = useMenu()
    const { onRemoveTicket } = useTicket()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [isAccordionOpen, setIsAccordionOpen] = useState(true)

    const overlayClass = `menu-overlay ${isMenuOpen ? 'menu-overlay--open' : ''}`
    const sidebarClass = `menu-sidebar ${isMenuOpen ? 'menu-sidebar--open' : ''}`

    const handleLogout = () => {
        onCloseMenu()
        onRemoveTicket()
    }

    const handleNavigate = (path: string) => {
        onCloseMenu()
        navigate(path)
    }

    const handleSectionClick = (href: string) => {
        onCloseMenu()
        if (pathname === '/invitation') {
            const el = document.querySelector(href)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            navigate(`/invitation${href}`)
        }
    }

    return (
        <>
            <div className={overlayClass} onClick={onCloseMenu} aria-hidden="true" />

            <aside className={sidebarClass} aria-label="Menú de navegación">
                <header className="menu-sidebar__header">
                    <div className="menu-sidebar__header-info">
                        <h2 className="menu-sidebar__title">{title}</h2>
                        <span className="menu-sidebar__subtitle">Navegación del Evento</span>
                    </div>
                    <button
                        type="button"
                        className="menu-sidebar__close-btn"
                        onClick={onCloseMenu}
                        aria-label="Cerrar menú"
                    >
                        <XIcon size={20} />
                    </button>
                </header>

                <div className="menu-sidebar__content">
                    <div className="menu-sidebar__actions">
                        {/* Botón 1: Sobre */}
                        <button
                            type="button"
                            className={`menu-action-card ${pathname === '/' ? 'menu-action-card--active' : ''
                                }`}
                            onClick={() => handleNavigate('/')}
                        >
                            <div className="menu-action-card__info">
                                <span className="menu-action-card__title">Sobre Digital</span>
                                <span className="menu-action-card__desc">Ver sobre de bienvenida</span>
                            </div>
                        </button>

                        {/* Botón 2: Boleto */}
                        <button
                            type="button"
                            className={`menu-action-card menu-action-card--ticket ${pathname === '/ticket' ? 'menu-action-card--active' : ''
                                }`}
                            onClick={() => handleNavigate('/ticket')}
                        >
                            <div className="menu-action-card__info">
                                <span className="menu-action-card__title">Boleto Digital</span>
                                <span className="menu-action-card__desc">Presentar en recepción</span>
                            </div>
                        </button>

                        {/* Botón 3: Accordion Invitación */}
                        <div className="menu-accordion">
                            <button
                                type="button"
                                className={`menu-action-card menu-action-card--accordion ${isAccordionOpen ? 'menu-action-card--open' : ''
                                    }`}
                                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                            >
                                <div className="menu-action-card__info">
                                    <span className="menu-action-card__title">Invitación Especial</span>
                                    <span className="menu-action-card__desc">Secciones principales</span>
                                </div>
                                <div
                                    className={`menu-accordion__chevron ${isAccordionOpen ? 'menu-accordion__chevron--open' : ''
                                        }`}
                                >
                                    <CaretDownIcon size={18} weight="bold" />
                                </div>
                            </button>

                            {/* Contenido del Accordion */}
                            {isAccordionOpen && (
                                <div className="menu-accordion__content">
                                    <button
                                        type="button"
                                        className="menu-accordion__item"
                                        onClick={() => handleSectionClick('#places')}
                                    >
                                        <span>Ubicación</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="menu-accordion__item"
                                        onClick={() => handleSectionClick('#itinerary')}
                                    >
                                        <span>Itinerario</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="menu-accordion__item"
                                        onClick={() => handleSectionClick('#dress-code')}
                                    >
                                        <span>Código de Vestimenta</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="menu-accordion__item"
                                        onClick={() => handleSectionClick('#graduates')}
                                    >
                                        <span>Graduados</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="menu-accordion__item"
                                        onClick={() => handleSectionClick('#details')}
                                    >
                                        <span>Recordatorios</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Pinned Action: Buscar Invitación */}
                <footer className="menu-sidebar__footer">
                    <button
                        type="button"
                        className="menu-logout-btn"
                        onClick={handleLogout}
                    >
                        <div className="menu-logout-btn__info">
                            <span className="menu-logout-btn__title">BUSCAR INVITACIÓN</span>
                            <span className="menu-logout-btn__desc">Cambiar de invitado o pase</span>
                        </div>
                    </button>
                </footer>
            </aside>
        </>
    )
}