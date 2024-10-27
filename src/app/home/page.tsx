import Introduction from "@/components/Introduction"
import HighLights from "@/components/HighLights"
import Features from "@/components/Features"
import APIDemo from "@/components/APIDemo"
import Industries from "@/components/Industries"
import Footer from "@/components/Footer"
import Waitlist from "@/components/Waitlist"
import Reviews from "@/components/Reviews"

const HomePage = () => {
  return (
    <div>
      <Introduction/>
      <HighLights/>
      <Features/>
      <APIDemo/>
      <Industries/>
      <Reviews/>
      <Waitlist/>
      <Footer/>
    </div>
  )
}

export default HomePage