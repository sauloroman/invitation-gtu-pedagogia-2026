import React from 'react'
import { motion } from 'framer-motion'
import bg from '@/assets/images/backgrounds/bg-secondary.svg'
import envelopIcon from '@/assets/images/icons/sobre-cerrado.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const FarewellSection: React.FC = () => {
    return (
        <section id="farewell" className="farewell">
            <div className="farewell__bg" style={{ backgroundImage: `url(${bg})` }}></div>

            <div className="farewell__container">
                <motion.div
                    className="farewell__message"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, ease: FLUID_EASE }}
                >
                    <h2 className="farewell__title">¡Gracias por Acompañarnos!</h2>
                    <p className="farewell__text">
                        Su presencia hará de este día un recuerdo inolvidable en nuestras vidas.
                    </p>
                    <motion.img
                        src={envelopIcon}
                        alt="Sobre cerrado"
                        className="farewell__icon"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.3, delay: 0.35, ease: FLUID_EASE }}
                    />
                </motion.div>

                <motion.footer
                    className="farewell__footer"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: FLUID_EASE }}
                >
                    <p className="farewell__made-by">
                        Hecho con amor por{' '}
                        <a
                            href="https://tuamigoinvitaciones-opciones.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="farewell__link"
                        >
                            TuAmigoInvitaciones
                        </a>
                    </p>
                    <p className="farewell__contact">
                        ¿Quieres una invitación como esta? Contacta al:{' '}
                        <a
                            href="https://wa.me/524496548073"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="farewell__phone"
                        >
                            4496548073
                        </a>
                    </p>
                </motion.footer>
            </div>
        </section>
    )
}
