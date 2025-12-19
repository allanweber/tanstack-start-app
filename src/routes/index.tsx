import FeaturesSection from '@/components/FeaturesSection'
import FooterSection from '@/components/Footer'
import Header from '@/components/header'
import HeroSection from '@/components/HeroSection'
import Pricing from '@/components/Pricing'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='relative'>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className='flex flex-col'>
        <HeroSection />
        <FeaturesSection />
        <Pricing />
        <FooterSection />
      </main>
    </div>
  )
}