'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  'Defenses',
  'Traps',
  'Walls',
  'Army',
  'Resources',
  'Troops',
  'Dark Troops',
  'Spells',
  'Siege Machines',
  'Heroes',
  'Pets',
  'Stats',
]

const TrackerNavbar = () => {
  const [activeHash, setActiveHash] = useState('')

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash)
    }
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => {
      window.removeEventListener('hashchange', updateHash)
    }
  }, [])

  return (
    <nav className="flex w-full flex-col">
      {navLinks.map((link) => {
        const safeLink = '#' + link.replace(' ', '-')
        return (
          <a
            key={`${safeLink}`}
            href={`${safeLink}`}
            className={cn(
              'tracker-nav-link',
              activeHash == safeLink && 'bg-white/10',
            )}
          >
            {link}
          </a>
        )
      })}
    </nav>
  )
}

export default TrackerNavbar
