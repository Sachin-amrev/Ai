"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Users, TrendingUp, Lock, CheckCircle } from "lucide-react"

export function TrustIndicators() {
  const trustMetrics = [
    { icon: Users, label: "Active Investors", value: "50,000+", color: "text-blue-600" },
    { icon: TrendingUp, label: "Assets Under Management", value: "$2.5B+", color: "text-green-600" },
    { icon: Award, label: "Years of Experience", value: "15+", color: "text-purple-600" },
    { icon: Shield, label: "Security Rating", value: "AAA", color: "text-amber-600" },
  ]

  const certifications = [
    { name: "SEC Registered", verified: true },
    { name: "SIPC Protected", verified: true },
    { name: "SOC 2 Compliant", verified: true },
    { name: "ISO 27001", verified: true },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands of Investors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your financial security is our top priority. We're regulated, insured, and committed to transparency.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {trustMetrics.map((metric, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <metric.icon className={`h-8 w-8 mx-auto mb-3 ${metric.color}`} />
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security & Compliance */}
        <Card className="bg-white border-2 border-blue-100">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Security & Compliance</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">{cert.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Bank-level security:</strong> Your investments are protected with 256-bit encryption,
                multi-factor authentication, and are held in segregated accounts at top-tier custodians.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
