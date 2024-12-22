import { Search, UserPlus, Calendar, Heart } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    { icon: Search, title: "Search", description: "Find funeral homes in your area based on your specific needs." },
    { icon: UserPlus, title: "Connect", description: "Reach out to funeral homes directly through our platform." },
    { icon: Calendar, title: "Plan", description: "Work with the funeral home to plan the perfect farewell." },
    { icon: Heart, title: "Remember", description: "Honor your loved one with a beautiful, personalized service." },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <step.icon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

