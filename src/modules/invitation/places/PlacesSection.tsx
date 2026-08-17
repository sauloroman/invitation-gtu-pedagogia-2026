import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'
import { MapPinIcon } from '@phosphor-icons/react'

import bg from '@/assets/images/backgrounds/bg-secondary.svg'
import location from '@/assets/images/icons/location.svg'

const HARMONIC_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const parseDateParts = (dateStr?: string) => {
    if (!dateStr) return { day: '29', month: 'Agosto', year: '2026' }
    const [year, month, day] = dateStr.split('-').map(Number)
    const dateObj = new Date(year, month - 1, day)
    const monthName = dateObj.toLocaleDateString('es-ES', { month: 'long' })
    const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)
    return {
        day: String(day).padStart(2, '0'),
        month: formattedMonth,
        year: String(year),
    }
}

export const PlacesSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const placesConfig = sections.places

    if (!placesConfig?.showPlaces || !placesConfig?.locations || placesConfig.locations.length === 0) {
        return null
    }

    const firstDate = placesConfig.locations[0]?.date || sections.hero?.date
    const { day, month, year } = parseDateParts(firstDate)

    return (
        <section id="places" className="places-section">
            <div className="places-section__bg" style={{ backgroundImage: `url(${bg})` }}></div>
            <div className="places-section__container">
                <motion.div
                    initial={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.15, ease: HARMONIC_EASE }}
                >
                    <SectionHeader
                        pretitle="Los Recintos"
                        title="Ubicaciones"
                        align="center"
                        variant="uppercase"
                    />
                </motion.div>

                <motion.div
                    className="places-card"
                    initial={{ opacity: 0, scale: 0.96, y: 25 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.3, delay: 0.3, ease: HARMONIC_EASE }}
                >
                    <svg className="places-card__frame-svg" viewBox="0 0 320 620" preserveAspectRatio="none" fill="none">
                        <path
                            d="
                                M 32 16 
                                L 288 16 
                                A 14 14 0 0 0 304 30 
                                L 304 590 
                                A 14 14 0 0 0 288 604 
                                L 32 604 
                                A 14 14 0 0 0 16 590 
                                L 16 30 
                                A 14 14 0 0 0 32 16 Z
                            "
                            stroke="currentColor"
                            strokeWidth="1.2"
                            opacity="0.6"
                        />
                    </svg>

                    <div className="places-card__content">
                        <div className="places-card__date-block">
                            <motion.span
                                className="places-card__day"
                                initial={{ opacity: 0, scale: 0.85, y: -8 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.0, delay: 0.45, ease: HARMONIC_EASE }}
                            >
                                {day}
                            </motion.span>
                            <motion.span
                                className="places-card__month"
                                initial={{ opacity: 0, filter: 'blur(3px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.1, delay: 0.6, ease: HARMONIC_EASE }}
                            >
                                {month}
                            </motion.span>
                            <motion.span
                                className="places-card__year"
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 0.9, delay: 0.72, ease: HARMONIC_EASE }}
                            >
                                {year}
                            </motion.span>
                        </div>

                        <div className="places-card__locations-list">
                            {placesConfig.locations.map((loc, idx) => {
                                const baseDelay = 0.8 + idx * 0.45
                                return (
                                    <React.Fragment key={idx}>
                                        {idx > 0 && (
                                            <motion.div
                                                className="places-card__divider"
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                whileInView={{ opacity: 1, scaleX: 1 }}
                                                viewport={{ once: true, margin: '-10% 0px' }}
                                                transition={{ duration: 0.9, delay: baseDelay, ease: HARMONIC_EASE }}
                                            />
                                        )}

                                        <div className="places-card__location-item">
                                            {loc.time && (
                                                <motion.p
                                                    className="places-card__time"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: '-10% 0px' }}
                                                    transition={{ duration: 0.9, delay: baseDelay + 0.1, ease: HARMONIC_EASE }}
                                                >
                                                    {loc.time}
                                                </motion.p>
                                            )}
                                            <div className="places-card__venue-block">
                                                <motion.h3
                                                    className="places-card__title"
                                                    initial={{ opacity: 0, filter: 'blur(4px)', y: 8 }}
                                                    whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                                    viewport={{ once: true, margin: '-10% 0px' }}
                                                    transition={{ duration: 1.0, delay: baseDelay + 0.22, ease: HARMONIC_EASE }}
                                                >
                                                    {loc.title}
                                                </motion.h3>
                                                {loc.location && (
                                                    <motion.h4
                                                        className="places-card__name"
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true, margin: '-10% 0px' }}
                                                        transition={{ duration: 0.9, delay: baseDelay + 0.35, ease: HARMONIC_EASE }}
                                                    >
                                                        &mdash; {loc.location} &mdash;
                                                    </motion.h4>
                                                )}
                                                {loc.address && (
                                                    <motion.p
                                                        className="places-card__address"
                                                        initial={{ opacity: 0, y: 6 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: '-10% 0px' }}
                                                        transition={{ duration: 0.9, delay: baseDelay + 0.48, ease: HARMONIC_EASE }}
                                                    >
                                                        {loc.address}
                                                    </motion.p>
                                                )}
                                            </div>
                                            {loc.url && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                                    viewport={{ once: true, margin: '-10% 0px' }}
                                                    transition={{ duration: 0.95, delay: baseDelay + 0.6, ease: HARMONIC_EASE }}
                                                >
                                                    <Button
                                                        icon={<MapPinIcon size={20} weight="thin" />}
                                                        variant="primary"
                                                        onClick={() => window.open(loc.url, '_blank')}
                                                        className="places-card__button"
                                                    >
                                                        Ver Ubicación
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>

                        <motion.div
                            className="places-card__location"
                            initial={{ opacity: 0, scale: 0.8, y: 15 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.1, delay: 1.4, ease: HARMONIC_EASE }}
                        >
                            <img src={location} alt="Location" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}


