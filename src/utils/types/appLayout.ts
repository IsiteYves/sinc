import { StaticImageData } from 'next/image'
import React from 'react'

export type AppLayout = {
  children: React.ReactNode
  bannerImage: StaticImageData
  title: string
}

export type BearLayout = {
  children: React.ReactNode
}
