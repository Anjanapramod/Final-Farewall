import { Heart, Shield, Clock, Users } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    { icon: Heart, title: "Compassionate Care", description: "Connect with empathetic professionals dedicated to honoring your loved ones." },
    { icon: Shield, title: "Trusted Network", description: "Our vetted network ensures you're working with reputable funeral service providers." },
    { icon: Clock, title: "24/7 Support", description: "Access assistance and resources whenever you need them, day or night." },
    { icon: Users, title: "Community Support", description: "Join a caring community for shared experiences and mutual support." },
  ]

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Final Farewell</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

