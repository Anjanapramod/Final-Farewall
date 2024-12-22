import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Final Farewell Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Whether you're a funeral service provider or a family in need, we're here to help you connect and create meaningful farewells.</p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" variant="outline" className="bg-white text-gray-800 hover:bg-gray-100">Sign Up as a Funeral Home</Button>
          <Button size="lg">Find a Funeral Home</Button>
        </div>
      </div>
    </section>
  )
}

