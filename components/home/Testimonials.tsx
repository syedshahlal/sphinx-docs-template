"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "This documentation site is a game-changer. It's so easy to use and looks fantastic. Our developers love it!",
    name: "Jane Doe",
    title: "CTO, TechCorp",
    avatar: "/placeholder.svg?width=48&height=48",
  },
  {
    quote:
      "Finally, a documentation solution that doesn't feel like a chore. The search is fast and the content is beautiful.",
    name: "John Smith",
    title: "Lead Developer, Innovate LLC",
    avatar: "/placeholder.svg?width=48&height=48",
  },
  {
    quote:
      "We were able to get our new docs site up and running in a single afternoon. The TailGrids components are a huge plus.",
    name: "Emily White",
    title: "Product Manager, Solutions Inc.",
    avatar: "/placeholder.svg?width=48&height=48",
  },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Loved by teams everywhere</h2>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center text-center p-6">
                      <p className="italic mb-4">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
