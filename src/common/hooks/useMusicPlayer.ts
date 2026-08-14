import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { playMusic, pauseMusic, toggleMusic } from '@/store/ui/music.slice'
import { useInvitationConfig } from './useInvitationConfig'
import type { MusicPlayerProps, MusicPlayerVariant, ButtonVariant } from '@/common/types'
import song from '@/assets/music/song.mp3'

let globalAudio: HTMLAudioElement | null = null

const getGlobalAudio = () => {
    if (typeof window === 'undefined') return null
    if (!globalAudio) {
        globalAudio = new Audio(song)
        globalAudio.loop = true
        globalAudio.preload = 'auto'
    }
    return globalAudio
}

export const useMusicPlayer = (props?: MusicPlayerProps) => {
    const dispatch = useDispatch()
    const isPlaying = useSelector((state: RootState) => state.music.isPlaying)
    const { theme, config } = useInvitationConfig()

    useEffect(() => {
        const audio = getGlobalAudio()
        if (!audio) return

        if (isPlaying) {
            audio.play().catch(() => {
                dispatch(pauseMusic())
            })
        } else {
            audio.pause()
        }
    }, [isPlaying, dispatch])

    const onPlayMusic = () => dispatch(playMusic())
    const onPauseMusic = () => dispatch(pauseMusic())
    const onToggleMusic = () => dispatch(toggleMusic())

    const isMusicVisible = props?.show ?? theme.music?.show ?? config?.hasMusic ?? true
    const activeVariant: MusicPlayerVariant = props?.variant || theme.music?.variant || 'floating'
    const activeBtnVariant: ButtonVariant = props?.buttonVariant || theme.music?.buttonVariant || theme.buttonVariant || 'primary'
    const activeSongTitle = props?.songTitle || theme.music?.songTitle || 'Música de fondo'
    const activeArtistName = props?.artistName || theme.music?.artistName || 'Música del evento'

    return {
        isPlaying,
        isMusicVisible,
        activeVariant,
        activeBtnVariant,
        activeSongTitle,
        activeArtistName,
        onPlayMusic,
        onPauseMusic,
        onToggleMusic,
    }
}

