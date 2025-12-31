import FeaturesSection from '@/components/FeaturesSection'
import FooterSection from '@/components/Footer'
import Header from '@/components/header'
import HeroSection from '@/components/HeroSection'
import Pricing from '@/components/Pricing'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'


export const Route = createFileRoute('/')({ component: Index })

function Index() {
  // Apply smooth scrolling only on the landing page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

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