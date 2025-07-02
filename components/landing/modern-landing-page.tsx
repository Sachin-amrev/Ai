"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
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
import { Toaster } from "@/components/ui/toaster"

interface LandingPageProps {
  onSwitchToLogin: () => void
  onSwitchToSignup: () => void
}

export function ModernLandingPage({ onSwitchToLogin, onSwitchToSignup }: LandingPageProps) {
  const [currentMetric, setCurrentMetric] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const { toast } = useToast()

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
      {/* Enhanced Mobile-Responsive Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-900/20 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-white text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                InvestPro
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
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

            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
              <Button
                variant="ghost"
                onClick={onSwitchToLogin}
                className="text-white hover:bg-white/10 rounded-xl text-sm sm:text-base px-3 sm:px-4"
              >
                Sign In
              </Button>
              <Button
                onClick={onSwitchToSignup}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl text-sm sm:text-base px-3 sm:px-4"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
                ></span>
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
                ></span>
              </div>
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
          >
            <div className="py-4 space-y-4 border-t border-white/10 mt-4">
              <a
                href="#features"
                className="block text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="block text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  onClick={onSwitchToLogin}
                  className="text-white hover:bg-white/10 rounded-xl justify-start"
                >
                  Sign In
                </Button>
                <Button
                  onClick={onSwitchToSignup}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile-Responsive Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
        {/* Animated Background - Adjusted for mobile */}
        <div className="absolute inset-0 opacity-10 sm:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - Enhanced Mobile */}
            <div
              className={`text-white transition-all duration-1000 text-center lg:text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs sm:text-sm">
                <Award className="h-3 w-3 mr-1" />
                #1 Rated Investment Platform 2024
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                Grow Your Wealth with
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Smart Investing
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Join thousands of investors who trust our AI-powered platform to build diversified portfolios and
                achieve their financial goals with confidence.
              </p>

              {/* Dynamic Metrics - Mobile Optimized */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6 sm:mb-8 overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{metrics[currentMetric].value}</div>
                      <div className="text-blue-200 text-xs sm:text-sm">{metrics[currentMetric].label}</div>
                    </div>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-semibold text-sm sm:text-lg">{metrics[currentMetric].trend}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons - Mobile Stacked */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Button
                  size="lg"
                  onClick={onSwitchToSignup}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                >
                  Start Investing Today
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-xl px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-sm sm:text-base"
                >
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators - Mobile Responsive */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                  <span className="text-xs sm:text-sm">SEC Regulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                  <span className="text-xs sm:text-sm">SIPC Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  <span className="text-xs sm:text-sm">Award Winning</span>
                </div>
              </div>
            </div>

            {/* Right Content - Mobile Hidden on Small Screens */}
            <div
              className={`relative transition-all duration-1000 delay-300 hidden sm:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-sm sm:text-lg font-semibold text-slate-900 mb-2">Live Portfolio Performance</h3>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      +$12,847
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600">+8.2% this month</div>
                  </div>

                  {/* Mini Chart - Responsive */}
                  <div className="h-24 sm:h-32 lg:h-40 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl mb-4 sm:mb-6 flex items-end justify-center p-2 sm:p-4">
                    <div className="flex items-end gap-1 sm:gap-2 h-full w-full max-w-xs">
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

                  <div className="grid grid-cols-2 gap-3 sm:gap-6 text-center">
                    <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">$125,750</div>
                      <div className="text-xs text-slate-600">Total Value</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">15.2%</div>
                      <div className="text-xs text-slate-600">Annual Return</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements - Responsive */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 sm:p-4 rounded-xl sm:rounded-2xl animate-bounce shadow-lg">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 sm:p-4 rounded-xl sm:rounded-2xl animate-pulse shadow-lg">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Responsive Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Why Choose InvestPro?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto px-4">
              Experience the future of investing with our cutting-edge platform designed for modern investors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.gradient}`}>
                      <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section with More Features */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Choose Your Investment Plan
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto px-4">
              Start with any plan and upgrade as your portfolio grows. All plans include our core features.
            </p>

            {/* Plan Comparison Toggle */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-1 border border-slate-700">
                <div className="grid grid-cols-2 gap-1">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg px-4 py-2 text-sm">
                    Monthly
                  </Button>
                  <Button variant="ghost" className="text-slate-400 rounded-lg px-4 py-2 text-sm">
                    Annual (Save 20%)
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$100",
                originalPrice: "$125",
                period: "minimum",
                description: "Perfect for beginners",
                features: [
                  "8-10% Annual Returns",
                  "Basic Portfolio Management",
                  "Email Support",
                  "Monthly Reports",
                  "Mobile App Access",
                  "Educational Resources",
                ],
                gradient: "from-green-500/20 to-emerald-500/20",
                buttonGradient: "from-green-500 to-emerald-600",
                popular: false,
                savings: "Save $25",
                icon: Shield,
              },
              {
                name: "Growth",
                price: "$1,000",
                originalPrice: "$1,250",
                period: "minimum",
                description: "Most popular choice",
                features: [
                  "12-15% Annual Returns",
                  "Advanced Portfolio Management",
                  "Priority Phone Support",
                  "Weekly Reports",
                  "Personal Investment Advisor",
                  "Tax Optimization",
                  "Rebalancing Service",
                  "Premium Research",
                ],
                gradient: "from-blue-500/20 to-purple-500/20",
                buttonGradient: "from-blue-500 to-purple-600",
                popular: true,
                savings: "Save $250",
                icon: Zap,
              },
              {
                name: "Premium",
                price: "$10,000",
                originalPrice: "$12,500",
                period: "minimum",
                description: "For serious investors",
                features: [
                  "15-20% Annual Returns",
                  "Premium Portfolio Management",
                  "24/7 Dedicated Support",
                  "Daily Reports & Analysis",
                  "Dedicated Account Manager",
                  "VIP Investment Events",
                  "Alternative Investments",
                  "Custom Strategies",
                  "Estate Planning",
                  "Concierge Service",
                ],
                gradient: "from-orange-500/20 to-red-500/20",
                buttonGradient: "from-orange-500 to-red-600",
                popular: false,
                savings: "Save $2,500",
                icon: Sparkles,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gradient-to-br ${plan.gradient} backdrop-blur-xl border-0 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? "ring-2 ring-blue-500/50 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Savings Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs">
                    {plan.savings}
                  </Badge>
                </div>

                <CardContent className="p-4 sm:p-6 lg:p-8 text-white">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${plan.buttonGradient}`}>
                        <plan.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base">{plan.description}</p>

                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg sm:text-xl text-slate-400 line-through">{plan.originalPrice}</span>
                        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          {plan.price}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400">{plan.period}</div>
                    </div>
                  </div>

                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs sm:text-sm">
                        <CheckCircle className="text-green-400 h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Button
                      onClick={onSwitchToSignup}
                      className={`w-full py-2 sm:py-3 font-bold rounded-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r ${plan.buttonGradient} border-0 text-sm sm:text-base`}
                    >
                      Get Started
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full py-2 sm:py-3 font-medium rounded-xl border-white/30 text-white hover:bg-white/10 text-xs sm:text-sm bg-transparent"
                      onClick={() => {
                        toast({
                          title: "Plan Details",
                          description: `Learn more about our ${plan.name} plan features and benefits.`,
                        })
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Features Comparison */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">All Plans Include</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    { icon: Shield, text: "SIPC Protected" },
                    { icon: Lock, text: "Bank-Level Security" },
                    { icon: Globe, text: "Global Markets" },
                    { icon: BarChart3, text: "Real-Time Analytics" },
                    { icon: Users, text: "Expert Support" },
                    { icon: Target, text: "Goal Tracking" },
                    { icon: Zap, text: "Instant Execution" },
                    { icon: Award, text: "Award-Winning Platform" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 mb-2 sm:mb-3">
                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
              Get answers to common questions about investing with InvestPro.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "What is the minimum investment amount?",
                answer:
                  "You can start investing with as little as $100 in our Starter Plan. This makes investing accessible to everyone, regardless of their current financial situation.",
              },
              {
                question: "How are my investments protected?",
                answer:
                  "Your investments are protected by SIPC insurance up to $500,000, and we use bank-level security with 256-bit encryption. We're also regulated by the SEC and follow strict compliance standards.",
              },
              {
                question: "Can I withdraw my money anytime?",
                answer:
                  "Yes, you can withdraw your funds at any time. However, we recommend staying invested for the long term to maximize your returns and benefit from compound growth.",
              },
              {
                question: "What fees do you charge?",
                answer:
                  "We charge a transparent annual management fee of 0.25% to 0.75% depending on your plan. There are no hidden fees, and we believe in keeping costs low to maximize your returns.",
              },
              {
                question: "How do I get started?",
                answer:
                  "Simply create an account, complete our quick risk assessment, fund your account, and we'll build a personalized portfolio for you. The entire process takes less than 10 minutes.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{faq.question}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{faq.answer}</p>
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

      {/* Live Chat Widget */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <Button
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          onClick={() => {
            toast({
              title: "Chat Support",
              description: "Our support team will be with you shortly!",
            })
          }}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-3.774-.829L3 21l1.829-6.226A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
            />
          </svg>
        </Button>
      </div>
      <Toaster />
    </div>
  )
}
