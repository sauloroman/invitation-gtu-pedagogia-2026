import React, { useEffect, useRef } from 'react'
import { useInvitationConfig } from '@/common/hooks'
import video from '@/assets/videos/hero.mp4'

export const HeroSection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const { sections } = useInvitationConfig()
    const heroConfig = sections.hero

    useEffect(() => {
        const videoEl = videoRef.current
        if (!videoEl) return

        videoEl.muted = true
        videoEl.defaultMuted = true
        videoEl.setAttribute('muted', '')
        videoEl.setAttribute('playsinline', '')
        videoEl.setAttribute('webkit-playsinline', '')
        videoEl.setAttribute('x5-playsinline', '')
        videoEl.setAttribute('x5-video-player-type', 'h5')

        const tryPlay = () => {
            if (videoEl.paused) {
                const promise = videoEl.play()
                if (promise !== undefined) {
                    promise.catch(() => {})
                }
            }
        }

        tryPlay()

        const handleTouchOrScroll = () => {
            tryPlay()
            window.removeEventListener('touchstart', handleTouchOrScroll)
            window.removeEventListener('scroll', handleTouchOrScroll)
            window.removeEventListener('click', handleTouchOrScroll)
            window.removeEventListener('touchend', handleTouchOrScroll)
        }

        window.addEventListener('touchstart', handleTouchOrScroll, { passive: true })
        window.addEventListener('scroll', handleTouchOrScroll, { passive: true })
        window.addEventListener('click', handleTouchOrScroll, { passive: true })
        window.addEventListener('touchend', handleTouchOrScroll, { passive: true })

        return () => {
            window.removeEventListener('touchstart', handleTouchOrScroll)
            window.removeEventListener('scroll', handleTouchOrScroll)
            window.removeEventListener('click', handleTouchOrScroll)
            window.removeEventListener('touchend', handleTouchOrScroll)
        }
    }, [])

    if (heroConfig?.showHero === false) return null

    const eventCareer = (heroConfig?.career || heroConfig?.title || '') as string
    const eventSchool = (heroConfig?.school || heroConfig?.subtitle || '') as string
    const eventGeneration = (heroConfig?.generation || heroConfig?.date || '') as string

    return (
        <section id="hero" className="hero-section">
            <video
                ref={videoRef}
                src={video}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                className="hero-section__video"
                style={{ pointerEvents: 'none' }}
                {...{
                    'webkit-playsinline': 'true',
                    'x5-video-player-type': 'h5',
                    'x5-playsinline': 'true'
                }}
            />
            <div className="hero-section__container">
                {eventCareer && <h1 className="hero-section__title">{eventCareer}</h1>}

                <div className="flex flex-col gap-2">
                    {eventSchool && <p className="hero-section__subtitle">{eventSchool}</p>}
                    {eventGeneration && <span className="hero-section__generation">{eventGeneration}</span>}
                </div>
            </div>
        </section>
    )
}
