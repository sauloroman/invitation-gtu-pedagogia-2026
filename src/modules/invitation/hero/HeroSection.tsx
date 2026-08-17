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
        videoEl.setAttribute('playsinline', 'true')
        videoEl.setAttribute('webkit-playsinline', 'true')

        const playVideo = () => {
            if (videoEl.paused) {
                videoEl.play().catch((err) => {
                    console.log('Hero video autoplay wait for interaction:', err)
                })
            }
        }

        playVideo()

        const handleInteraction = () => {
            playVideo()
            window.removeEventListener('touchstart', handleInteraction)
            window.removeEventListener('scroll', handleInteraction)
            window.removeEventListener('click', handleInteraction)
        }

        window.addEventListener('touchstart', handleInteraction, { passive: true })
        window.addEventListener('scroll', handleInteraction, { passive: true })
        window.addEventListener('click', handleInteraction, { passive: true })

        return () => {
            window.removeEventListener('touchstart', handleInteraction)
            window.removeEventListener('scroll', handleInteraction)
            window.removeEventListener('click', handleInteraction)
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
                autoPlay
                loop
                muted
                playsInline
                {...{ 'webkit-playsinline': 'true', 'x5-video-player-type': 'h5', 'x5-playsinline': 'true' }}
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                className="hero-section__video"
                style={{ pointerEvents: 'none' }}
            >
                <source src={video} type="video/mp4" />
            </video>
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

