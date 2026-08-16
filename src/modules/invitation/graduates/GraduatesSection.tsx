import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig, useGraduates, useDrawer, useMusicPlayer } from '@/common/hooks'
import { DRAWER_NAMES } from '@/store/ui/drawer.slice'
import { Button } from '@/common/components/button/Button'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

import logo from '@/assets/images/icons/logo.svg'
import bulbs from '@/assets/images/icons/bulbs.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const GraduatesSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const { careers } = useGraduates()
    const { onOpenDrawer } = useDrawer()
    const { isPlaying, onToggleMusic } = useMusicPlayer()

    const hero = sections.hero
    const school = typeof hero?.school === 'string' ? hero.school : 'Grupo Tecnológico Universitario'
    const career = typeof hero?.career === 'string' ? hero.career : 'Licenciatura en Pedagogía'
    const generation = typeof hero?.generation === 'string' ? hero.generation : 'Generación 2023 - 2026'

    const primaryCareerName = careers?.[0]?.name || career

    return (
        <section id="graduates" className="graduates">
            <div className="graduates__container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.2, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="Orgullo & Honor"
                        title="Los Graduados"
                        align="center"
                        variant="uppercase"
                    />
                </motion.div>

                <div className="graduates__floating-grid">

                    <motion.div
                        className="graduates-card graduates-card--horizontal"
                        initial={{ opacity: 0, y: 35, rotate: -1 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.35, ease: FLUID_EASE }}
                    >
                        <svg className="graduates-card__frame-svg" viewBox="0 0 500 240" preserveAspectRatio="none" fill="none">
                            <path
                                d="M 6 6 L 494 6 L 494 234 L 6 234 Z"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                opacity="0.6"
                            />
                        </svg>

                        <div className="graduates-card__content">
                            <p className="graduates-card__collective-message">
                                El esfuerzo de cada día, los desvelos y la dedicación constante nos trajeron hasta aquí. Este triunfo no pertenece a uno solo, ¡lo logramos juntos!
                            </p>

                            <h3 className="graduates-card__subtitle">La gloria fue colectiva</h3>

                            <div className="graduates-card__action">
                                <Button
                                    variant="outline"
                                    onClick={() => onOpenDrawer(DRAWER_NAMES.graduates, primaryCareerName)}
                                    className="graduates-card__button"
                                >
                                    Ver Lista de Graduados
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="graduates__bottom-row">

                        <motion.div
                            className="graduates-card graduates-card--vertical"
                            initial={{ opacity: 0, x: -30, rotate: 1 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.1, delay: 0.5, ease: FLUID_EASE }}
                        >
                            <svg className="graduates-card__frame-svg" viewBox="0 0 240 380" preserveAspectRatio="none" fill="none">
                                <path
                                    d="M 6 6 L 234 6 L 234 374 L 6 374 Z"
                                    stroke="#8b6868ff"
                                    strokeWidth="1.5"
                                    opacity="0.85"
                                />
                            </svg>

                            <div className="graduates-card__content">
                                <span className="graduates-card__school-badge">{school}</span>

                                <p className="graduates-card__honor-text">
                                    Con un gran sentido del deber y profundo orgullo, nuestra institución reconoce la dedicación, constancia y esfuerzo de quienes hoy concluyen esta etapa académica.
                                </p>

                                <div className="graduates-card__career-block">
                                    <h4 className="graduates-card__career-name">{career}</h4>
                                    <span className="graduates-card__generation">{generation}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="graduates-oval-badge"
                            initial={{ opacity: 0, x: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.1, delay: 0.65, ease: FLUID_EASE }}
                        >
                            <svg className="graduates-oval-badge__frame-svg" viewBox="0 0 260 340" preserveAspectRatio="none" fill="none">
                                <path
                                    d="
                                        M 130 6
                                        C 185 6, 254 50, 254 170
                                        C 254 290, 185 334, 130 334
                                        C 75 334, 6 290, 6 170
                                        C 6 50, 75 6, 130 6 Z
                                    "
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    opacity="0.6"
                                />
                                <path
                                    d="
                                        M 130 14
                                        C 178 14, 244 56, 244 170
                                        C 244 284, 178 326, 130 326
                                        C 82 326, 16 284, 16 170
                                        C 16 56, 82 14, 130 14 Z
                                    "
                                    stroke="currentColor"
                                    strokeWidth="0.8"
                                    strokeDasharray="4 3"
                                    opacity="0.4"
                                />
                            </svg>

                            <div className="graduates-oval-badge__logo-container">
                                <img src={logo} alt="Logo" className="graduates-oval-badge__logo" />
                            </div>
                        </motion.div>

                        <motion.div
                            className={`graduates__disc ${isPlaying ? 'graduates__disc--spinning' : ''}`}
                            onClick={onToggleMusic}
                            title={isPlaying ? 'Pausar música' : 'Reproducir música'}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.1, delay: 0.75, ease: FLUID_EASE }}
                        >
                            <div className="graduates__disc-body">
                                <div className="graduates__disc-grooves"></div>
                                <div className="graduates__disc-sheen"></div>
                                <div className="graduates__disc-label">
                                    <svg viewBox="0 0 100 100" className="graduates__disc-svg">
                                        <path id="gradDiscArc" d="M 18 50 A 32 32 0 0 0 82 50" fill="none" />
                                        <text className="graduates__disc-text">
                                            <textPath href="#gradDiscArc" startOffset="50%" textAnchor="middle">
                                                {isPlaying ? 'PAUSE MUSIC' : 'CLICK TO PLAY'}
                                            </textPath>
                                        </text>
                                    </svg>
                                    <div className="graduates__disc-center"></div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
            <div className="graduates__bulbs">
                <img src={bulbs} alt="" />
            </div>
        </section>
    )
}
