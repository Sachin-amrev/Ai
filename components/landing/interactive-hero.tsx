"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowRight, Play, Shield, Award } from "lucide-react"

export function InteractiveHero() {
  const [currentMetric, setCurrentMetric] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const metrics = [
    { label: "Average Annual Return", value: "12.5%", trend: "+2.3%" },
    { label: "Client Satisfaction", value: "98.7%", trend: "+0.5%" },
    { label: "Portfolio Growth", value: "$2.5B", trend: "+15.2%" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Award className="h-3 w-3 mr-1" />
              #1 Rated Investment Platform 2024
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Grow Your Wealth with
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {" "}
                Smart Investing
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of investors who trust our AI-powered platform to build diversified portfolios and achieve
              their financial goals.
            </p>

            {/* Dynamic Metrics */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">{metrics[currentMetric].value}</div>
                    <div className="text-blue-200 text-sm">{metrics[currentMetric].label}</div>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">{metrics[currentMetric].trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                Start Investing Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-8 text-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">SEC Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">SIPC Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Bank-Level Security</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Dashboard Preview */}
          <div className="relative">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Portfolio Performance</h3>
                  <div className="text-3xl font-bold text-green-600">+$12,847</div>
                  <div className="text-sm text-gray-600">+8.2% this month</div>
                </div>

                {/* Mini Chart Simulation */}
                <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg mb-4 flex items-end justify-center p-4">
                  <div className="flex items-end gap-1 h-full">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-green-500 to-blue-500 rounded-sm animate-pulse"
                        style={{
                          height: `${Math.random() * 80 + 20}%`,
                          width: "8px",
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">$125,750</div>
                    <div className="text-xs text-gray-600">Total Value</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">15.2%</div>
                    <div className="text-xs text-gray-600">Annual Return</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full animate-bounce">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
