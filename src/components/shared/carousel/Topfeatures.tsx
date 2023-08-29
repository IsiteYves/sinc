import { TopFeatureProps } from '@utils/types/carousel'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { UpcomingEvents } from '../upcomingEvents'

const emblaOptions: EmblaOptionsType = { align: 'start' }

const Carousel: FC<TopFeatureProps> = ({ datas }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index)
      }
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <div className="relative carousel-container">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {datas.map((data, index) => (
            <div className="embla__slide" key={index}>
              <UpcomingEvents featured={data} />
            </div>
          ))}
        </div>
      </div>
      <button
        className={`absolute left-0 items-center justify-start transform -translate-y-1/2 bg-transparent border-none top-1/2 carousel-button focus:outline-none ${
          !prevBtnEnabled ? 'cursor-not-allowed opacity-30' : ''
        }`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}>
        <ArrowCircleLeft size={40} />
      </button>
      <button
        className={`absolute right-0 items-center justify-end transform -translate-y-1/2 bg-transparent border-none top-1/2 carousel-button focus:outline-none ${
          !nextBtnEnabled ? 'cursor-not-allowed opacity-30' : ''
        }`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}>
        <ArrowCircleRight size={40} />
      </button>
    </div>
  )
}

export default Carousel
