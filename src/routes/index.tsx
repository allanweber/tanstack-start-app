import FeaturesSection from '@/components/FeaturesSection'
import FooterSection from '@/components/Footer'
import Header from '@/components/header'
import HeroSection from '@/components/HeroSection'
import Pricing from '@/components/Pricing'
import { SearchAsync } from '@/components/search-async'
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

        {/* Search Section */}
        <section className='mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
          <div className='mb-8 text-center'>
            <h2 className='text-3xl font-bold mb-2'>Search</h2>
            <p className='text-muted-foreground'>Find what you're looking for</p>
          </div>
          <SearchAsync />
        </section>

        <FeaturesSection />
        <Pricing />
        <FooterSection />
      </main>
    </div>
  )
}