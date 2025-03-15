"use client"

import { useState, useRef, useCallback } from "react"
import { Plus } from "lucide-react"
import Heading from "./Heading"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title: string
  items: FAQItem[]
  style?: "default" | "style2"
}

export default function FAQBasic({ title, items, style = "default" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const setAnswerRef = useCallback((el: HTMLDivElement | null, index: number) => {
    answerRefs.current[index] = el
  }, [])

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <section
      id="faq-section"
      className={`w-full py-12 px-4 text-white`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <div className="text-center mb-8">
        <Heading size="lg" as="h2" className="mb-8 text-left">
          {title}
        </Heading>
      </div>
      <div className="rounded-lg border border-white/20">
        <div className="p-6">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="border-b border-white/20 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-2xl font-medium text-slate-300">{item.question}</h3>
                  <Plus
                    className={`w-5 h-5 text-white transition-transform duration-300 ${
                      openIndex === index ? "transform rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  ref={(el) => setAnswerRef(el, index)}
                  id={`faq-answer-${index}`}
                  className="mt-2 overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openIndex === index ? answerRefs.current[index]?.scrollHeight + "px" : "0px",
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <p className="text-xl text-white/80 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}