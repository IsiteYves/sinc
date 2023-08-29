import Image from 'next/image'
import { FC, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { CarouselProps } from '@utils/types/carousel'

const emblaOptions: EmblaOptionsType = {}

const Carousel: FC<CarouselProps> = ({ data }) => {
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
    <div>
      <div className="w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {data.map((item, index) => (
            <div className="text-center text-white embla__slide" key={index}>
              {item.thumbnail ? (
                <div className="w-full h-[250px] m-auto mb-10 relative">
                  <Image
                    src={item.thumbnail}
                    fill
                    style={{
                      objectFit: 'contain',
                    }}
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    alt="Safe and Secured"
                    priority
                  />
                </div>
              ) : null}

              <div className="mb-3 text-2xl font-semibold text-center">{item.title}</div>
              <div className="font-light text-center">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center text-white mt-16 w-[70%] lg:w-[60%] m-auto">
        <button
          onClick={scrollPrev}
          className={`${!prevBtnEnabled && 'cursor-not-allowed opacity-30'}`}>
          <CaretLeft size={20} color="white" />
        </button>
        <div className="flex items-center gap-2">
          {scrollSnaps?.map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full  ${
                  index === selectedIndex ? 'bg-white' : 'bg-secondary'
                } `}
              />
            )
          })}
        </div>
        <button
          onClick={scrollNext}
          className={`${!nextBtnEnabled && 'cursor-not-allowed opacity-30'}`}>
          <CaretRight size={20} color="white" />
        </button>
      </div>
    </div>
  )
}

export default Carousel
