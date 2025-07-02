"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  ArrowRight,
  Play,
  Shield,
  Award,
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  Star,
  Globe,
  Lock,
  Sparkles,
  DollarSign,
  Target,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

interface LandingPageProps {
  onSwitchToLogin: () => void
  onSwitchToSignup: () => void
}

export function ModernLandingPage({ onSwitchToLogin, onSwitchToSignup }: LandingPageProps) {
  const [currentMetric, setCurrentMetric] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const metrics = [
    { label: "Average Annual Return", value: "12.5%", trend: "+2.3%" },
    { label: "Client Satisfaction", value: "98.7%", trend: "+0.5%" },
    { label: "Assets Under Management", value: "$2.5B", trend: "+15.2%" },
    { label: "Active Investors", value: "50K+", trend: "+12%" },
  ]

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your investments are protected with military-grade encryption and multi-factor authentication.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "AI-Powered Analytics",
      description: "Advanced algorithms analyze market trends to optimize your portfolio performance.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Expert Advisors",
      description: "Get personalized guidance from certified financial professionals.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Real-Time Trading",
      description: "Execute trades instantly with our lightning-fast trading platform.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Target,
      title: "Goal-Based Investing",
      description: "Set financial goals and let our platform create a personalized investment strategy.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access international markets and diversify your portfolio worldwide.",
      gradient: "from-teal-500 to-blue-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content:
        "InvestPro helped me grow my portfolio by 25% in just one year. The platform is intuitive and the support is excellent.",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content:
        "The AI-powered recommendations are spot on. I've seen consistent returns and feel confident about my financial future.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content:
        "Finally, an investment platform that makes sense. The educational resources helped me become a better investor.",
      rating: 5,
      avatar: "ER",
    },
  ]

  const plans = [
    {
      name: "Starter",
      price: "$100",
      period: "minimum",
      description: "Perfect for beginners",
      features: ["8-10% Annual Returns", "Basic Portfolio", "Email Support", "Monthly Reports"],
      gradient: "from-green-500/20 to-emerald-500/20",
      buttonGradient: "from-green-500 to-emerald-600",
      popular: false,
    },
    {
      name: "Growth",
      price: "$1,000",
      period: "minimum",
      description: "Most popular choice",
      features: [
        "12-15% Annual Returns",
        "Advanced Portfolio",
        "Priority Support",
        "Weekly Reports",
        "Personal Advisor",
      ],
      gradient: "from-blue-500/20 to-purple-500/20",
      buttonGradient: "from-blue-500 to-purple-600",
      popular: true,
    },
    {
      name: "Premium",
      price: "$10,000",
      period: "minimum",
      description: "For serious investors",
      features: [
        "15-20% Annual Returns",
        "Premium Portfolio",
        "24/7 Support",
        "Daily Reports",
        "Dedicated Manager",
        "VIP Events",
      ],
      gradient: "from-orange-500/20 to-red-500/20",
      buttonGradient: "from-orange-500 to-red-600",
      popular: false,
    },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Modern Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/20 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="text-white text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                InvestPro
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">
                Reviews
              </a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onSwitchToLogin} className="text-white hover:bg-white/10 rounded-xl">
                Sign In
              </Button>
              <Button
                onClick={onSwitchToSignup}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Award className="h-3 w-3 mr-1" />
                #1 Rated Investment Platform 2024
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Grow Your Wealth with
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Smart Investing
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
                Join thousands of investors who trust our AI-powered platform to build diversified portfolios and
                achieve their financial goals with confidence.
              </p>

              {/* Dynamic Metrics */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-white">{metrics[currentMetric].value}</div>
                      <div className="text-blue-200 text-sm">{metrics[currentMetric].label}</div>
                    </div>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-semibold text-lg">{metrics[currentMetric].trend}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={onSwitchToSignup}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 rounded-xl px-8 py-4"
                >
                  Start Investing Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-sm">SEC Regulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">SIPC Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">Award Winning</span>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Dashboard Preview */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Live Portfolio Performance</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      +$12,847
                    </div>
                    <div className="text-sm text-slate-600">+8.2% this month</div>
                  </div>

                  {/* Mini Chart Simulation */}
                  <div className="h-40 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl mb-6 flex items-end justify-center p-4">
                    <div className="flex items-end gap-2 h-full w-full max-w-xs">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-green-500 to-blue-500 rounded-sm animate-pulse flex-1"
                          style={{
                            height: `${Math.random() * 80 + 20}%`,
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-2xl font-bold text-slate-900">$125,750</div>
                      <div className="text-xs text-slate-600">Total Value</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-2xl font-bold text-slate-900">15.2%</div>
                      <div className="text-xs text-slate-600">Annual Return</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl animate-bounce shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl animate-pulse shadow-lg">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose InvestPro?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience the future of investing with our cutting-edge platform designed for modern investors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient}`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Investment Plan</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Start with any plan and upgrade as your portfolio grows. All plans include our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gradient-to-br ${plan.gradient} backdrop-blur-xl border-0 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? "ring-2 ring-blue-500/50 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-8 text-white">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-slate-300 mb-4">{plan.description}</p>
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {plan.price}
                    </div>
                    <div className="text-sm text-slate-400">{plan.period}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="text-green-400 h-4 w-4 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onSwitchToSignup}
                    className={`w-full py-3 font-bold rounded-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r ${plan.buttonGradient} border-0`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Investors Say</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Join thousands of satisfied investors who have transformed their financial future with InvestPro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border-cyan-500/30">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Investment Journey?</h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join over 50,000 investors who trust InvestPro to grow their wealth. Start with as little as $100.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={onSwitchToSignup}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 rounded-xl px-8 py-4"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onSwitchToLogin}
                  className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 bg-transparent"
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-slate-900/80 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="text-white text-xl font-bold">InvestPro</div>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering investors worldwide with intelligent investment solutions and expert guidance.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-white text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="text-white text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Investment Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Portfolio Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Market Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-slate-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>support@investpro.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>
              &copy; 2025 InvestPro. All rights reserved. | Securities offered through InvestPro Securities LLC, Member
              FINRA/SIPC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
