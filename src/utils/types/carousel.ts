import { StaticImageData } from 'next/image'

export type CarouselData = {
  thumbnail: StaticImageData
  title: string
  description: string
}

export type CarouselProps = {
  data: CarouselData[]
}

export type TopFeatureData = {
  image: string
  place: string
  location: string
  time: string
  revenue: string
  number: string
}

export type TopFeatureProps = {
  datas: TopFeatureData[]
}

export type EventDatas = {
  image: StaticImageData
  name: string
  location: string
  date: string
}

export type EventDatasProps = {
  results: EventDatas[]
}
