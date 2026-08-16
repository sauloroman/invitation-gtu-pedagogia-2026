import { useInvitationConfig } from './useInvitationConfig'

export interface SaveTheDateOptions {
    title?: string
    description?: string
    location?: string
    startDate?: string
    durationHours?: number
    fileName?: string
}

export const useSaveTheDate = () => {
    const { sections } = useInvitationConfig()

    const downloadSaveTheDate = (customOptions?: SaveTheDateOptions) => {
        const hero = sections.hero
        const places = sections.places
        const msgConfig = sections.message

        const career = (hero?.career || hero?.title || 'Graduación') as string
        const school = (hero?.school || hero?.subtitle || '') as string
        const generation = (hero?.generation || '') as string
        const firstLocation = places?.locations?.[0]

        // 1. Título completo del evento
        const defaultTitle = school
            ? `Graduación ${career} - ${school}`
            : `Graduación ${career}`

        const title = customOptions?.title || (hero?.names as string) || defaultTitle

        // 2. Ubicación completa
        const locationName = firstLocation?.title ? `${firstLocation.title}: ` : ''
        const locationAddress = firstLocation?.location || (hero?.city as string) || ''
        const defaultLocation = customOptions?.location || `${locationName}${locationAddress}`.trim()

        // 3. Descripción detallada del evento
        const msgText = msgConfig?.message as string
        const descriptionLines: string[] = []

        descriptionLines.push(`🎓 Gran Noche de Graduación`)
        descriptionLines.push(`📚 Carrera: ${career}`)
        if (school) descriptionLines.push(`🏛️ Institución: ${school}`)
        if (generation) descriptionLines.push(`🎓 Generación: ${generation}`)
        if (firstLocation?.time) descriptionLines.push(`⏰ Recepción: ${firstLocation.time}`)
        if (defaultLocation) descriptionLines.push(`📍 Lugar: ${defaultLocation}`)
        if (msgText) {
            descriptionLines.push(``)
            descriptionLines.push(`"${msgText}"`)
        }

        const description = customOptions?.description || descriptionLines.join('\n')

        const rawTargetDate = customOptions?.startDate || (sections.countdown?.targetDate as string | undefined) || new Date().toISOString()

        const startDate = new Date(rawTargetDate)
        const durationHours = customOptions?.durationHours ?? 5
        const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000)

        const formatDateToICal = (date: Date): string => {
            const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
            const year = date.getUTCFullYear()
            const month = pad(date.getUTCMonth() + 1)
            const day = pad(date.getUTCDate())
            const hours = pad(date.getUTCHours())
            const minutes = pad(date.getUTCMinutes())
            const seconds = pad(date.getUTCSeconds())

            return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
        }

        const startFormatted = formatDateToICal(startDate)
        const endFormatted = formatDateToICal(endDate)
        const nowFormatted = formatDateToICal(new Date())

        const escapeICal = (text: string) =>
            text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Invitaciones Digitales//Save The Date//ES',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `UID:event-${Date.now()}@invitacion.com`,
            `DTSTAMP:${nowFormatted}`,
            `DTSTART:${startFormatted}`,
            `DTEND:${endFormatted}`,
            `SUMMARY:${escapeICal(title)}`,
            `DESCRIPTION:${escapeICal(description)}`,
            `LOCATION:${escapeICal(defaultLocation)}`,
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'END:VEVENT',
            'END:VCALENDAR',
        ].join('\r\n')

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)

        const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
        const defaultFileName = `save-the-date-${slug || 'event'}.ics`
        const finalFileName = customOptions?.fileName ?? defaultFileName

        link.setAttribute('download', finalFileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link.href)
    }

    return { downloadSaveTheDate }
}

