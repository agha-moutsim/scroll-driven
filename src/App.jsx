import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

gsap.registerPlugin(ScrollTrigger)

// Frame data generator
const getFramePath = (index) => {
  const padded = String(index + 1).padStart(4, '0')
  return `/frames/male${padded}.png`
}

const FRAME_COUNT = 300

function Navbar() {
  return (
    <nav className="glass-nav fixed top-[30px] left-1/2 -translate-x-1/2 z-[99] flex items-center justify-between w-[95%] max-w-[1400px] h-[70px] px-6 pl-8">
      <h3 className="font-bold text-xl tracking-tight text-dark">
        <b>SY</b>VERSE*
      </h3>

        <div className="nav-links-pill">
        {['Universe', 'Avatars', 'Economy', 'Marketplace'].map((link) => (
          <a key={link} href="#" className="nav-link">
            {link}
          </a>
        ))}
      </div>

      <div className="relative">
        <button className="premium-btn">
          <span className="relative z-[2]">ENTER PORTAL</span>
          <div className="glow-bg" />
        </button>
      </div>
    </nav>
  )
}

function HeroPage({ locomotiveRef }) {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const imageSeqRef = useRef({ frame: 1 })
  const containerRef = useRef(null)

  useEffect(() => {
    imagesRef.current = []
    const images = []

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = getFramePath(i)
      images.push(img)
      imagesRef.current.push(img)
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const scaleImage = (img) => {
      if (!canvas || !img) return
      const hRatio = canvas.width / img.width
      const vRatio = canvas.height / img.height
      const ratio = Math.max(hRatio, vRatio)
      const centerShift_x = (canvas.width - img.width * ratio) / 2
      const centerShift_y = (canvas.height - img.height * ratio) / 2
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
    }

    const render = () => {
      const img = imagesRef.current[imageSeqRef.current.frame]
      if (img) scaleImage(img)
    }

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      render()
    })
    resizeObserver.observe(document.body)

    gsap.to(imageSeqRef.current, {
      frame: FRAME_COUNT - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        scrub: 0.15,
        trigger: canvas,
        start: 'top top',
        end: '600% top',
        scroller: locomotiveRef.current?.el || '#main',
      },
      onUpdate: render,
    })

    images[1].onload = render

    return () => {
      resizeObserver.disconnect()
    }
  }, [locomotiveRef])

  return (
    <div ref={containerRef} className="section-page" id="page">
      {/* Marquee Text */}
      <div className="absolute top-[35%] w-full overflow-hidden h-[25%]">
        <div className="flex whitespace-nowrap animate-marquee font-space font-bold text-[120px] tracking-tighter text-dark leading-none">
          {[0, 1, 2].map((i) => (
            <h1 key={i} className="flex-shrink-0">
              <span className="font-bold">STEP INTO</span>{' '}
              THE{' '}
              <span className="font-bold italic">NEXT</span>{' '}
              <span className="text-stroke">DIMENSION</span>{' '}
              OF{' '}
              <span className="italic">
                <span className="text-stroke">HUMAN</span>{' '}
                CONNECTION.&nbsp;&nbsp;&nbsp;
              </span>
            </h1>
          ))}
        </div>
      </div>

      {/* Subtext */}
      <h3 className="absolute top-[55%] left-[5%] font-medium text-gray-500 text-base leading-relaxed tracking-wide">
        YOUR DIGITAL UNIVERSE AWAITS. BUILD, EXPLORE, AND LIVE{' '}
        <br /> IN A LIMITLESS VIRTUAL WORLD.
      </h3>

      {/* System Status */}
      <div className="absolute bottom-[5%] left-[5%] flex items-center gap-4 bg-white/20 backdrop-blur-[12px] border border-white/40 px-5 py-3 rounded-xl z-10 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
        <div className="w-3 h-3 rounded-full bg-green-500 relative">
          <div className="pulse-dot" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-0.5">SYVERSE SERVER</p>
          <p className="text-xs font-semibold text-dark leading-tight">
            LINK: STABLE <br /> 14,092 ONLINE
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <div className="mouse-scroll" />
        <p className="text-[11px] font-bold tracking-[2px] text-dark">SCROLL TO EXPLORE</p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-[9] max-w-full max-h-full"
      />
    </div>
  )
}

function ContentPage1() {
  return (
    <div className="section-page" id="page1">
      <div
        id="right-text"
        className="absolute top-[30%] left-[10%]"
      >
        <h3 className="kicker font-normal">METAVERSE / KEY WORD</h3>
        <h1 className="heading-xl">
          DIVE DEEPER
          <br />
          YOUR AVATAR
          <br />
          YOUR RULES
        </h1>
      </div>

      <div
        id="left-text"
        className="absolute top-[50%] right-[10%] text-right"
      >
        <h1 className="heading-xl">
          SHAPE WORLDS
          <br />
          OWN DIGITAL ASSETS
          <br />
          ENDLESS HORIZONS
        </h1>
        <h3 className="kicker font-normal mt-4">..THE INTERNET BROUGHT TO LIFE</h3>
      </div>
    </div>
  )
}

function ContentPage2() {
  return (
    <div className="section-page" id="page2">
      <div
        id="text1"
        className="absolute top-[30%] left-[10%]"
      >
        <h3 className="kicker font-normal">METAVERSE / INTERACTIVE</h3>
        <h1 className="heading-2xl">
          THE
          <br />
          FUTURE OF
          <br />
          CONNECTION
        </h1>
      </div>

      <div
        id="text2"
        className="absolute top-[55%] right-[10%] text-right"
      >
        <p className="text-gray-600 font-normal leading-relaxed">
          EXPERIENCE THE FUTURE OF SOCIAL CONNECTION! BEYOND SCREENS, BEYOND BORDERS.{' '}
          <br />
          CREATE YOUR VIRTUAL IDENTITY, INTERACT WITH THOUSANDS GLOBALLY,{' '}
          <br />
          AND IMMERSE YOURSELF IN A FULLY REALIZED DIGITAL UNIVERSE{' '}
          <br />
          WHERE EVERYTHING IS POSSIBLE.
        </p>
      </div>
    </div>
  )
}

function ContentPage3() {
  return (
    <div className="section-page" id="page3">
      <div
        id="text3"
        className="absolute top-[40%] right-[10%] text-right"
      >
        <h3 className="kicker font-normal">METAVERSE / EXPLORE</h3>
        <h1 className="heading-3xl">
          THE UNIVERSE
          <br />
          IS YOUR
          <br />
          PLAYGROUND
        </h1>
      </div>
    </div>
  )
}

function ScrollAnimations({ locomotiveRef }) {
  useEffect(() => {
    if (!locomotiveRef.current) return
    const scrollContainer = locomotiveRef.current.el

    // Pin pages 1, 2, 3
    const pages = ['#page1', '#page2', '#page3']
    pages.forEach((id) => {
      const el = document.querySelector(id)
      if (!el) return

      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          scroller: scrollContainer,
        },
      })
    })

    // Pin canvas
    const canvas = document.querySelector('#page canvas')
    if (canvas) {
      gsap.to(canvas, {
        scrollTrigger: {
          trigger: canvas,
          pin: true,
          scroller: scrollContainer,
          start: 'top top',
          end: '600% top',
        },
      })
    }

    ScrollTrigger.refresh()
  }, [locomotiveRef])

  return null
}

export default function App() {
  const scrollContainerRef = useRef(null)
  const locomotiveRef = useRef(null)

  useEffect(() => {
    if (!scrollContainerRef.current) return

    const locoScroll = new LocomotiveScroll({
      el: scrollContainerRef.current,
      smooth: true,
    })

    locomotiveRef.current = locoScroll

    locoScroll.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(scrollContainerRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: scrollContainerRef.current.style.transform ? 'transform' : 'fixed',
    })

    ScrollTrigger.addEventListener('refresh', () => locoScroll.update())
    ScrollTrigger.refresh()

    return () => {
      locoScroll.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />

      <div ref={scrollContainerRef} id="main" className="relative overflow-hidden">
        <HeroPage locomotiveRef={locomotiveRef} />
        <ContentPage1 />
        <ContentPage2 />
        <ContentPage3 />
        <ScrollAnimations locomotiveRef={locomotiveRef} />
      </div>
    </>
  )
}
