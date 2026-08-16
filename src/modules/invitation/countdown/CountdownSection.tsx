import React from 'react'
import { motion } from 'framer-motion'
import { CalendarBlankIcon } from '@phosphor-icons/react'

import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Countdown } from '@/common/components/countdown/Countdown'
import { Button } from '@/common/components/button/Button'
import { useInvitationConfig, useCalendar, useSaveTheDate } from '@/common/hooks'

import bg from '@/assets/images/backgrounds/bg-countdown.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const CountdownSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const countdownConfig = sections.countdown
    const { monthTitle, weekdays, days } = useCalendar()
    const { downloadSaveTheDate } = useSaveTheDate()

    if (!countdownConfig?.showCountdown || !countdownConfig?.targetDate) {
        return null
    }

    return (
        <section id="countdown" className="countdown-section">
            <div className="countdown-section__container">
                <div className="countdown-section__bg" style={{ backgroundImage: `url(${bg})` }}></div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.2, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="Cuenta Regresiva"
                        title="Falta muy poco"
                        align="center"
                        variant="uppercase"
                    />
                </motion.div>

                <motion.div
                    className="countdown-section__content"
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.4, ease: FLUID_EASE }}
                >
                    <Countdown
                        targetDate={countdownConfig.targetDate}
                        variant="minimal"
                    />
                </motion.div>

                <motion.div
                    className="countdown-section__calendar-frame"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.2, delay: 0.6, ease: FLUID_EASE }}
                >
                    <div className="countdown-section__calendar">
                        {monthTitle && <p className="countdown-section__calendar-title">{monthTitle}</p>}

                        <div className="countdown-section__calendar-grid">
                            {weekdays.map(day => (
                                <div key={day} className="countdown-section__calendar-head">
                                    {day}
                                </div>
                            ))}
                            {days.map(dayItem => (
                                <div
                                    key={dayItem.id}
                                    className={[
                                        'countdown-section__calendar-day',
                                        dayItem.isFeatured ? 'countdown-section__calendar-day--featured' : '',
                                        !dayItem.isCurrentMonth ? 'countdown-section__calendar-day--muted' : '',
                                    ].filter(Boolean).join(' ')}
                                >
                                    <span className="countdown-section__calendar-num">{dayItem.dayNumber}</span>
                                    {dayItem.isFeatured && (
                                        <svg viewBox="0 0 24 24" className="countdown-section__calendar-star">
                                            <path
                                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                                fill="rgba(199, 165, 70, 0.25)"
                                                stroke="#C7A546"
                                                strokeWidth="1.8"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="countdown-section__save-date"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.8, ease: FLUID_EASE }}
                >
                    <Button
                        icon={<CalendarBlankIcon size={22} weight="thin" />}
                        variant="secondary"
                        onClick={() => downloadSaveTheDate()}
                        className="countdown-section__save-button"
                    >
                        Guardar Recordatorio
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}


