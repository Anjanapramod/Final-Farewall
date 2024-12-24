import { CircleUserRound } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Final Farewell made a difficult time much easier for our family. We found a compassionate funeral home that truly cared.",
      author: "Sarah Johnson",
      role: "Family Member",
    },
    {
      quote:
        "As a funeral home owner, Final Farewell has helped us connect with families in need and provide our services more efficiently.",
      author: "Michael Brown",
      role: "Funeral Home Director",
    },
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What People Are Saying
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4 text-gray-600 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <CircleUserRound className="w-20 h-20 text-red-500 p-3" />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
