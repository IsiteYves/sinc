import { pricingData } from '@utils/pricingPlans'
import PricingPlan from './PricingPlan'

const Pricing = () => {
  return (
    <div className="flex flex-col items-center justify-center py-5 min-h-full text-white">
      <div className="mb-0">
        <h1 className="text-primary text-4xl text-center">Our Plans and Pricings!</h1>
        <p className="text-lg pb-12 mx-10 md:mx-0 text-center">
          The right price for you, Where Your Events Come to Life
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-4 mt-8 w-auto gap-2">
        {pricingData.map((data, index) => (
          <PricingPlan key={data.id} data={data} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Pricing
