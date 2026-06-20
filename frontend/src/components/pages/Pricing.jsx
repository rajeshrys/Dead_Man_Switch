import React, { useState } from 'react'
import Navbar from './Navbar'

const Pricing = () => {
  const [selected, setSelected] = useState("Pro")

  const plans = [
    {
      name: "Starter",
      price: "$9",
      features: [
        "5 Projects",
        "Basic Analytics",
        "Email Support",
        "1 Team Member"
      ]
    },
    {
      name: "Pro",
      price: "$29",
      features: [
        "Unlimited Projects",
        "Advanced Analytics",
        "Priority Support",
        "5 Team Members"
      ]
    },
    {
      name: "Enterprise",
      price: "$99",
      features: [
        "Unlimited Everything",
        "Custom Integrations",
        "24/7 Support",
        "Unlimited Team Members"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex flex-col items-center py-16">
        <h1 className="text-5xl font-bold text-gray-800">
          Choose Your Plan
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Simple pricing for teams of all sizes.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelected(plan.name)}
              className={`
                cursor-pointer
                w-80
                rounded-3xl
                p-8
                transition-all
                duration-300
                bg-white
                border
                ${
                  selected === plan.name
                    ? "border-purple-500 scale-105 shadow-[0_10px_40px_rgba(168,85,247,0.35)]"
                    : "border-gray-200 hover:border-purple-300 hover:scale-102"
                }
              `}
            >
              {selected === plan.name && (
                <div className="bg-purple-600 text-white text-center py-1 rounded-full text-sm font-semibold mb-4">
                  Most Popular
                </div>
              )}

              <h2 className="text-3xl font-bold text-gray-800">
                {plan.name}
              </h2>

              <div className="mt-4">
                <span className="text-5xl font-bold text-purple-600">
                  {plan.price}
                </span>
                <span className="text-gray-500"> / month</span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-gray-600 flex items-center gap-2"
                  >
                    ✓ {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`
                  w-full
                  mt-8
                  py-3
                  rounded-xl
                  font-semibold
                  transition-all
                  ${
                    selected === plan.name
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }
                `}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing