import { Hero } from "@/components/sections/Hero"
import { Marquee } from "@/components/ui/Marquee"
import { About } from "@/components/sections/About"
import { Stack } from "@/components/sections/Stack"
import { Work } from "@/components/sections/Work"
import { Engineering } from "@/components/sections/Engineering"
import { ProblemSolving } from "@/components/sections/ProblemSolving"
import { Journey } from "@/components/sections/Journey"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Stack />
      <Work />
      <Engineering />
      <ProblemSolving />
      <Journey />
      <Contact />
    </>
  )
}
