import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'
import { MapPinIcon } from '@phosphor-icons/react'

import bg from '@/assets/images/backgrounds/bg-secondary.svg'
import location from '@/assets/images/icons/location.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

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
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.2, ease: FLUID_EASE }}
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.35, ease: FLUID_EASE }}
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
                            <span className="places-card__day">{day}</span>
                            <span className="places-card__month">{month}</span>
                            <span className="places-card__year">{year}</span>
                        </div>

                        <div className="places-card__locations-list">
                            {placesConfig.locations.map((loc, idx) => (
                                <React.Fragment key={idx}>
                                    {idx > 0 && <div className="places-card__divider" />}

                                    <div className="places-card__location-item">
                                        {loc.time && (
                                            <p className="places-card__time">{loc.time}</p>
                                        )}
                                        <div className="places-card__venue-block">
                                            <h3 className="places-card__title">{loc.title}</h3>
                                            {loc.location && <h4 className="places-card__name">&mdash; {loc.location} &mdash;</h4>}
                                            {loc.address && <p className="places-card__address">{loc.address}</p>}
                                        </div>
                                        {loc.url && (
                                            <Button
                                                icon={<MapPinIcon size={20} weight="thin" />}
                                                variant="primary"
                                                onClick={() => window.open(loc.url, '_blank')}
                                                className="places-card__button"
                                            >
                                                Ver Ubicación
                                            </Button>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="places-card__location">
                            <img src={location} alt="Location" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}


