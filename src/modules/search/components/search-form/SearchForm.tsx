import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useTicket } from '@/common/hooks'
import { Button } from '@/common/components/button/Button'

interface TicketSearch {
    keyPass: string
}

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const SearchForm: React.FC = () => {
    const { onGetTicket, isLoading } = useTicket()
    const { register, handleSubmit, formState: { errors } } = useForm<TicketSearch>({
        defaultValues: { keyPass: '' }
    })

    return (
        <form onSubmit={handleSubmit((data) => onGetTicket(data.keyPass))} className="search-form">
            <div className="search-form__field">
                <motion.label
                    htmlFor="keyPass"
                    className="search-form__label"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.55, ease: FLUID_EASE }}
                >
                    Ingresa tu clave de acceso
                </motion.label>

                <motion.input
                    {...register('keyPass', {
                        required: 'Por favor, ingresa tu clave de acceso',
                        validate: (val) => (val && val.trim().length > 0) || 'Por favor, ingresa una clave de acceso válida',
                        minLength: { value: 4, message: 'La clave de acceso debe tener al menos 4 caracteres' },
                    })}
                    type="text"
                    className="search-form__input"
                    id="keyPass"
                    placeholder="Ej: abc123"
                    autoComplete="off"
                    disabled={isLoading}
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: 0.7, ease: FLUID_EASE }}
                />
                {errors.keyPass && (
                    <motion.span
                        className="search-form__error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {errors.keyPass.message}
                    </motion.span>
                )}

                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: 0.85, ease: FLUID_EASE }}
                    style={{ width: '100%' }}
                >
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        size="lg"
                        radius="full"
                        icon={<MagnifyingGlassIcon size={18} weight="bold" />}
                        aria-label="Buscar invitación"
                        isLoading={isLoading}
                    >
                        BUSCAR INVITACIÓN
                    </Button>
                </motion.div>
            </div>
        </form>
    )
}
