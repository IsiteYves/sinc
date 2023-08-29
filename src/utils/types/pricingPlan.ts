export interface PricingPlanProps {
  data: {
    id: number
    isRecommended: boolean
    name: string
    amount: number
    features: string[]
  }
  index: number
}
