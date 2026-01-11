'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

type Props = {
  slides?: string[]
}

export default function Carousel({
  slides = ['1', '2', '3', '4', '5'],
}: Props) {
  const [index, setIndex] = useState(0)
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  )
  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    [slides.length],
  )
  const slideChangeSeconds = 5

  useEffect(() => {
    const timer = setInterval(() => {
      next()
    }, slideChangeSeconds * 1000)

    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${index * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((seed, i) => (
            <div
              key={i}
              className="h-full flex-none"
              style={{ width: `${100 / slides.length}%` }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={`https://picsum.photos/seed/${seed}/1200/900`}
                  alt={`Placeholder ${i + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white drop-shadow-lg">
                    Slide {i + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
        >
          ›
        </button>

        <div className="absolute right-0 bottom-3 left-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-8 rounded-full transition-colors duration-200 ${i === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
