"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Activity,
  PieChart,
  Target,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CheckCircle,
  Shield,
  Zap,
  Sparkles,
  Download,
  Search,
  Star,
  Award,
  Flame,
  Crown,
} from "lucide-react"

interface Transaction {
  id: number
  type: "deposit" | "withdrawal" | "investment"
  amount: number
  method: string
  date: string
  note: string
}

// Dashboard Overview Component
export function DashboardView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const { toast } = useToast()
  const [showRebalanceDialog, setShowRebalanceDialog] = useState(false)
  const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false)

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "invest":
        onNavigate?.("plans")
        toast({
          title: "Redirecting to Plans",
          description: "Choose your investment plan to get started",
        })
        break
      case "rebalance":
        setShowRebalanceDialog(true)
        break
      case "analytics":
        setShowAnalyticsDialog(true)
        break
      case "reports":
        toast({
          title: "Generating Report",
          description: "Your investment report is being prepared and will be emailed to you shortly",
        })
        // Simulate report generation
        setTimeout(() => {
          toast({
            title: "Report Ready",
            description: "Your investment report has been sent to your email",
          })
        }, 3000)
        break
    }
  }

  return (
    <section className="py-8 sm:py-12 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Investment Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">Track your investments and grow your wealth</p>
        </div>

        {/* Enhanced Stats Grid with Animations */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            {
              title: "Total Portfolio",
              value: "$125,750",
              change: "+8.6%",
              icon: DollarSign,
              gradient: "from-green-400 to-emerald-500",
              bgGradient: "from-green-500/20 to-emerald-500/20",
              animation: "animate-bounce",
            },
            {
              title: "Monthly Growth",
              value: "+$2,847",
              change: "+2.3%",
              icon: TrendingUp,
              gradient: "from-blue-400 to-cyan-500",
              bgGradient: "from-blue-500/20 to-cyan-500/20",
              animation: "animate-pulse",
            },
            {
              title: "Active Plans",
              value: "3",
              change: "2 new",
              icon: Target,
              gradient: "from-purple-400 to-pink-500",
              bgGradient: "from-purple-500/20 to-pink-500/20",
              animation: "animate-ping",
            },
            {
              title: "Total Returns",
              value: "12.5%",
              change: "YTD",
              icon: BarChart3,
              gradient: "from-orange-400 to-red-500",
              bgGradient: "from-orange-500/20 to-red-500/20",
              animation: "animate-spin",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl text-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25 group cursor-pointer`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${stat.gradient} group-hover:${stat.animation}`}
                  >
                    <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0 animate-pulse">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-xl sm:text-2xl font-bold mb-1 group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-300">{stat.title}</div>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none group-hover:from-cyan-500/10 transition-all duration-500" />
            </Card>
          ))}
        </div>

        {/* Enhanced Quick Actions */}
        <Card className="border-0 bg-slate-800/50 backdrop-blur-xl mb-8 sm:mb-12 hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Button
                onClick={() => handleQuickAction("invest")}
                className="h-16 sm:h-20 flex-col gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <DollarSign className="h-5 w-5" />
                <span className="text-xs sm:text-sm">Invest More</span>
              </Button>
              <Button
                onClick={() => handleQuickAction("rebalance")}
                variant="outline"
                className="h-16 sm:h-20 flex-col gap-2 border-slate-600 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs sm:text-sm">Rebalance</span>
              </Button>
              <Button
                onClick={() => handleQuickAction("analytics")}
                variant="outline"
                className="h-16 sm:h-20 flex-col gap-2 border-slate-600 text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
              >
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs sm:text-sm">Analytics</span>
              </Button>
              <Button
                onClick={() => handleQuickAction("reports")}
                variant="outline"
                className="h-16 sm:h-20 flex-col gap-2 border-slate-600 text-white hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Download className="h-5 w-5" />
                <span className="text-xs sm:text-sm">Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Activity */}
        <Card className="border-0 bg-slate-800/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400 animate-pulse" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Invested in Growth Plan", amount: "$2,500", time: "2 hours ago", type: "investment" },
                { action: "Dividend Received", amount: "+$125", time: "1 day ago", type: "income" },
                { action: "Portfolio Rebalanced", amount: "", time: "3 days ago", type: "system" },
                { action: "Deposited Funds", amount: "$1,000", time: "1 week ago", type: "deposit" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                        activity.type === "investment"
                          ? "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30"
                          : activity.type === "income"
                            ? "bg-green-500/20 text-green-400 group-hover:bg-green-500/30"
                            : activity.type === "deposit"
                              ? "bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30"
                              : "bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30"
                      }`}
                    >
                      {activity.type === "investment" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : activity.type === "income" ? (
                        <DollarSign className="h-4 w-4" />
                      ) : activity.type === "deposit" ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                        {activity.action}
                      </div>
                      <div className="text-slate-400 text-xs sm:text-sm">{activity.time}</div>
                    </div>
                  </div>
                  {activity.amount && (
                    <div
                      className={`font-semibold text-sm sm:text-base transition-all duration-300 group-hover:scale-110 ${
                        activity.amount.startsWith("+") ? "text-green-400" : "text-white"
                      }`}
                    >
                      {activity.amount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rebalance Dialog */}
      <Dialog open={showRebalanceDialog} onOpenChange={setShowRebalanceDialog}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Portfolio Rebalancing
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Optimize your portfolio allocation based on current market conditions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Recommended Rebalancing</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Growth Stocks: 36% → 40%</span>
                  <span className="text-green-400">+4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Bonds: 30% → 25%</span>
                  <span className="text-red-400">-5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Real Estate: 20% → 22%</span>
                  <span className="text-green-400">+2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Commodities: 14% → 13%</span>
                  <span className="text-red-400">-1%</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setShowRebalanceDialog(false)
                  toast({
                    title: "Rebalancing Initiated",
                    description: "Your portfolio is being rebalanced according to our recommendations",
                  })
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                Apply Rebalancing
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRebalanceDialog(false)}
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={showAnalyticsDialog} onOpenChange={setShowAnalyticsDialog}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-400" />
              Portfolio Analytics
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Detailed analysis of your investment performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-400">+24.3%</div>
                <div className="text-sm text-slate-300">Annual Return</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">0.85</div>
                <div className="text-sm text-slate-300">Sharpe Ratio</div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Performance Breakdown</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">1 Month</span>
                    <span className="text-green-400">+8.2%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">3 Months</span>
                    <span className="text-green-400">+15.7%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">1 Year</span>
                    <span className="text-green-400">+24.3%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowAnalyticsDialog(false)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              Close Analytics
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

// Enhanced Plans View Component
export function PlansView({ onSelectPlan }: { onSelectPlan: (planName: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const plans = [
    {
      id: 1,
      name: "Starter Plan",
      price: "$100",
      period: "Minimum Investment",
      description: "Perfect for beginners starting their investment journey",
      returns: "8-10% Annual Returns",
      risk: "Low Risk",
      features: [
        "Professional Portfolio Management",
        "Monthly Performance Reports",
        "Email Support",
        "Mobile App Access",
        "Educational Resources",
        "Flexible Withdrawal",
      ],
      icon: Shield,
      category: "conservative",
      popular: false,
      badge: "Safe",
      badgeIcon: Shield,
      planClass: "starter",
    },
    {
      id: 2,
      name: "Growth Plan",
      price: "$1,000",
      period: "Minimum Investment",
      description: "Balanced approach for steady wealth building",
      returns: "12-15% Annual Returns",
      risk: "Medium Risk",
      features: [
        "Advanced Portfolio Strategies",
        "Weekly Performance Reports",
        "Priority Phone Support",
        "Personal Investment Advisor",
        "Quarterly Portfolio Rebalancing",
        "Tax Optimization Strategies",
        "Market Research Access",
      ],
      icon: Zap,
      category: "balanced",
      popular: true,
      badge: "Most Popular",
      badgeIcon: Star,
      planClass: "growth",
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "$10,000",
      period: "Minimum Investment",
      description: "Maximum growth potential for serious investors",
      returns: "15-20% Annual Returns",
      risk: "High Risk",
      features: [
        "Aggressive Growth Strategies",
        "Daily Market Analysis",
        "24/7 Dedicated Support",
        "Dedicated Account Manager",
        "Monthly Strategy Reviews",
        "Access to Premium Markets",
        "Alternative Investments",
        "VIP Investment Events",
      ],
      icon: Sparkles,
      category: "aggressive",
      popular: false,
      badge: "High Yield",
      badgeIcon: Flame,
      planClass: "premium",
    },
    {
      id: 4,
      name: "Elite Plan",
      price: "$50,000",
      period: "Minimum Investment",
      description: "Exclusive plan for high-net-worth individuals",
      returns: "18-25% Annual Returns",
      risk: "High Risk",
      features: [
        "Private Wealth Management",
        "Exclusive Investment Opportunities",
        "Personal Financial Advisor",
        "Concierge Investment Services",
        "Private Market Access",
        "Custom Investment Strategies",
        "White-glove Service",
        "Exclusive Events & Networking",
      ],
      icon: Crown,
      category: "elite",
      popular: false,
      badge: "Elite",
      badgeIcon: Crown,
      planClass: "elite",
    },
    {
      id: 5,
      name: "ESG Plan",
      price: "$500",
      period: "Minimum Investment",
      description: "Sustainable and responsible investing",
      returns: "10-12% Annual Returns",
      risk: "Medium Risk",
      features: [
        "ESG-Focused Investments",
        "Impact Reporting",
        "Sustainable Companies Only",
        "Environmental Impact Tracking",
        "Social Responsibility Metrics",
        "Governance Standards",
        "Green Technology Focus",
        "Carbon Footprint Reduction",
      ],
      icon: Target,
      category: "esg",
      popular: false,
      badge: "Sustainable",
      badgeIcon: Award,
      planClass: "esg",
    },
  ]

  const filteredPlans = selectedCategory === "all" ? plans : plans.filter((plan) => plan.category === selectedCategory)

  return (
    <section className="py-8 sm:py-12 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Investment Plans
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">Choose the perfect plan for your investment goals</p>
        </div>

        {/* Enhanced Plan Categories */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {[
            { key: "all", label: "All Plans", icon: Target },
            { key: "conservative", label: "Conservative", icon: Shield },
            { key: "balanced", label: "Balanced", icon: BarChart3 },
            { key: "aggressive", label: "Aggressive", icon: TrendingUp },
            { key: "elite", label: "Elite", icon: Crown },
            { key: "esg", label: "ESG", icon: Award },
          ].map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.key)}
              className={`rounded-xl text-xs sm:text-sm px-3 sm:px-4 py-2 transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.key
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                  : "border-slate-600 text-white hover:bg-slate-700 hover:shadow-lg"
              }`}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Enhanced Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`plan-card ${plan.planClass} relative backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                plan.popular
                  ? "ring-4 ring-blue-400/75 hover:ring-blue-300/90 shadow-blue-400/25"
                  : "hover:shadow-cyan-400/25"
              }`}
              style={{
                background:
                  plan.planClass === "starter"
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)"
                    : plan.planClass === "growth"
                      ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)"
                      : plan.planClass === "premium"
                        ? "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(239, 68, 68, 0.2) 100%)"
                        : plan.planClass === "elite"
                          ? "linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)"
                          : "linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)",
                border:
                  plan.planClass === "starter"
                    ? "2px solid rgba(16, 185, 129, 0.5)"
                    : plan.planClass === "growth"
                      ? "2px solid rgba(59, 130, 246, 0.5)"
                      : plan.planClass === "premium"
                        ? "2px solid rgba(249, 115, 22, 0.5)"
                        : plan.planClass === "elite"
                          ? "2px solid rgba(234, 179, 8, 0.5)"
                          : "2px solid rgba(20, 184, 166, 0.5)",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge
                    className="text-white px-3 py-1 text-xs animate-pulse shadow-lg shadow-blue-400/50"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    }}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {!plan.popular && (
                <div className="absolute -top-3 right-4 z-10">
                  <Badge
                    className="text-white px-2 py-1 text-xs shadow-lg"
                    style={{
                      background:
                        plan.planClass === "starter"
                          ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                          : plan.planClass === "premium"
                            ? "linear-gradient(135deg, #f97316 0%, #ef4444 100%)"
                            : plan.planClass === "elite"
                              ? "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)"
                              : "linear-gradient(135deg, #14b8a6 0%, #10b981 100%)",
                    }}
                  >
                    <plan.badgeIcon className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardContent className="p-4 sm:p-6 text-white relative z-10">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`icon-${plan.planClass} p-3 rounded-xl group-hover:scale-110 transition-all duration-300 group-hover:animate-pulse shadow-lg`}
                      style={{
                        background:
                          plan.planClass === "starter"
                            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                            : plan.planClass === "growth"
                              ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
                              : plan.planClass === "premium"
                                ? "linear-gradient(135deg, #f97316 0%, #ef4444 100%)"
                                : plan.planClass === "elite"
                                  ? "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)"
                                  : "linear-gradient(135deg, #14b8a6 0%, #10b981 100%)",
                      }}
                    >
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-slate-300 mb-3 text-sm">{plan.description}</p>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-all duration-300">
                    {plan.price}
                  </div>
                  <div className="text-xs text-slate-400">{plan.period}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                    <span className="text-sm">Expected Returns</span>
                    <Badge className="bg-green-500/20 text-green-400 text-xs animate-pulse">{plan.returns}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                    <span className="text-sm">Risk Level</span>
                    <Badge
                      className={`text-xs ${
                        plan.risk === "Low Risk"
                          ? "bg-green-500/20 text-green-400"
                          : plan.risk === "Medium Risk"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {plan.risk}
                    </Badge>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-xs sm:text-sm group-hover:text-cyan-300 transition-colors"
                    >
                      <CheckCircle
                        className={`h-3 w-3 mr-2 flex-shrink-0 group-hover:animate-pulse ${
                          plan.category === "conservative"
                            ? "text-green-400"
                            : plan.category === "balanced"
                              ? "text-blue-400"
                              : plan.category === "aggressive"
                                ? "text-orange-400"
                                : plan.category === "elite"
                                  ? "text-yellow-400"
                                  : "text-teal-400"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-xs text-slate-400">+{plan.features.length - 4} more features</li>
                  )}
                </ul>

                <div className="space-y-2">
                  <Button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`btn-${plan.planClass} w-full py-2 font-bold rounded-xl transition-all duration-300 hover:scale-105 text-sm hover:shadow-lg`}
                    style={{
                      background:
                        plan.planClass === "starter"
                          ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                          : plan.planClass === "growth"
                            ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
                            : plan.planClass === "premium"
                              ? "linear-gradient(135deg, #f97316 0%, #ef4444 100%)"
                              : plan.planClass === "elite"
                                ? "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)"
                                : "linear-gradient(135deg, #14b8a6 0%, #10b981 100%)",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Select Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full py-2 text-xs border-white/30 text-white hover:bg-white/10 bg-transparent hover:scale-105 transition-all duration-300"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>

              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none group-hover:from-cyan-500/10 transition-all duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Wallet View Component
export function WalletView({
  walletBalance,
  transactions,
  onTransaction,
  onRefresh,
  formatCurrency,
  formatDate,
}: {
  walletBalance: number
  transactions: Transaction[]
  onTransaction: (type: "deposit" | "withdrawal", amount: number, method: string, note: string) => void
  onRefresh: () => void
  formatCurrency: (amount: number) => string
  formatDate: (date: string) => string
}) {
  return (
    <section className="py-8 sm:py-12 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Wallet Management
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">Manage your funds and transactions</p>
        </div>

        {/* Enhanced Balance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Enhanced Balance Card */}
          <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl overflow-hidden relative hover:scale-105 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-500" />
            <CardContent className="p-6 sm:p-8 text-center text-white relative z-10">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:scale-110 group-hover:animate-pulse transition-all duration-300">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-lg text-slate-300 mb-4">Available Balance</div>
              <div className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-all duration-300">
                {formatCurrency(walletBalance)}
              </div>
              <div className="text-sm text-green-400 flex items-center justify-center gap-2 animate-pulse">
                <TrendingUp className="h-4 w-4" />
                +$1,250.00 (8.6%) this month
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Quick Actions */}
          <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl hover:scale-105 transition-all duration-500">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Quick Actions</h3>
              <div className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
                      <ArrowDownLeft className="mr-2 h-5 w-5" />
                      Deposit Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Deposit Funds</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Add money to your investment account
                      </DialogDescription>
                    </DialogHeader>
                    <WalletTransactionForm type="deposit" onSubmit={onTransaction} />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                      <ArrowUpRight className="mr-2 h-5 w-5" />
                      Withdraw Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Withdraw Funds</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Transfer money from your investment account
                      </DialogDescription>
                    </DialogHeader>
                    <WalletTransactionForm type="withdrawal" onSubmit={onTransaction} />
                  </DialogContent>
                </Dialog>

                <Button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Transfer Between Accounts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Recent Transactions */}
        <Card className="border-0 bg-slate-800/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 animate-pulse" />
                Recent Transactions
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={onRefresh}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-white hover:bg-slate-700 bg-transparent hover:scale-105 transition-all duration-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-white hover:bg-slate-700 bg-transparent hover:scale-105 transition-all duration-300"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                >
                  <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold transition-all duration-300 group-hover:scale-110 ${
                        transaction.type === "deposit"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600"
                          : transaction.type === "withdrawal"
                            ? "bg-gradient-to-r from-red-500 to-pink-600"
                            : "bg-gradient-to-r from-blue-500 to-purple-600"
                      }`}
                    >
                      {transaction.type === "deposit" ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : transaction.type === "withdrawal" ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <PieChart className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                        {transaction.note}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400">
                        {transaction.method} • {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-bold text-lg ${transaction.amount > 0 ? "text-green-400" : "text-red-400"} text-right group-hover:scale-110 transition-all duration-300`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Enhanced Portfolio View Component
export function PortfolioView() {
  const [timeframe, setTimeframe] = useState("1M")

  const portfolioData = [
    { name: "Growth Stocks", value: 45230.2, percentage: 36, change: 1.8, color: "#10b981" },
    { name: "Bonds", value: 37725.15, percentage: 30, change: 0.5, color: "#3b82f6" },
    { name: "Real Estate", value: 25150.1, percentage: 20, change: 2.1, color: "#f59e0b" },
    { name: "Commodities", value: 17645.05, percentage: 14, change: -0.8, color: "#ef4444" },
  ]

  return (
    <section className="py-8 sm:py-12 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Portfolio Overview
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">Track your investment performance and allocation</p>
        </div>

        {/* Enhanced Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sm:mb-12">
          <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-blue-600 to-purple-700 text-white border-0 hover:scale-105 transition-all duration-500 group">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 group-hover:animate-spin" />
                  Portfolio Value
                </CardTitle>
                <div className="flex gap-2">
                  {["1D", "1W", "1M", "3M", "1Y"].map((period) => (
                    <Button
                      key={period}
                      variant={timeframe === period ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setTimeframe(period)}
                      className="text-xs px-3 py-1 hover:scale-105 transition-all duration-300"
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl sm:text-5xl font-bold mb-2 group-hover:scale-110 transition-all duration-300">
                $125,750.50
              </div>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-4 w-4 text-green-300 animate-pulse" />
                <span className="text-lg font-semibold text-green-300">+$2,847.32 (+2.31%)</span>
                <span className="text-white/80">today</span>
              </div>

              {/* Enhanced Performance Chart Placeholder */}
              <div className="h-32 sm:h-40 bg-white/10 rounded-lg flex items-end justify-center p-4 group-hover:bg-white/20 transition-all duration-300">
                <div className="flex items-end gap-1 h-full w-full max-w-md">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-green-400 to-blue-400 rounded-sm flex-1 hover:scale-110 transition-all duration-300 cursor-pointer"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-800/50 backdrop-blur-xl hover:scale-105 transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="h-5 w-5 animate-pulse" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">1 Month</span>
                    <span className="text-green-400 font-semibold">+8.2%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">3 Months</span>
                    <span className="text-green-400 font-semibold">+15.7%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">1 Year</span>
                    <span className="text-green-400 font-semibold">+24.3%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Asset Allocation */}
        <Card className="border-0 bg-slate-800/50 backdrop-blur-xl mb-8 sm:mb-12 hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <PieChart className="h-5 w-5 animate-spin" />
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {portfolioData.map((allocation, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-slate-700 bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full group-hover:scale-125 transition-all duration-300"
                        style={{ backgroundColor: allocation.color }}
                      ></div>
                      <span className="font-medium text-sm text-white group-hover:text-cyan-300 transition-colors">
                        {allocation.name}
                      </span>
                    </div>
                    <Badge
                      variant={allocation.change >= 0 ? "default" : "destructive"}
                      className="text-xs bg-green-500/20 text-green-400 animate-pulse"
                    >
                      {allocation.change >= 0 ? "+" : ""}
                      {allocation.change}%
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-white group-hover:scale-110 transition-all duration-300">
                    ${allocation.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-400 mb-2">{allocation.percentage}% of portfolio</div>
                  <div className="w-full bg-slate-600 rounded-full h-1">
                    <div
                      className="h-1 rounded-full transition-all duration-1000 group-hover:h-2"
                      style={{
                        width: `${allocation.percentage}%`,
                        backgroundColor: allocation.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Holdings */}
        <Card className="border-0 bg-slate-800/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 animate-pulse" />
              Top Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { symbol: "AAPL", name: "Apple Inc.", shares: 125, value: 23750, change: 2.15 },
                { symbol: "GOOGL", name: "Alphabet Inc.", shares: 85, value: 18500, change: -1.25 },
                { symbol: "MSFT", name: "Microsoft Corp.", shares: 95, value: 21200, change: 4.5 },
                { symbol: "TSLA", name: "Tesla Inc.", shares: 45, value: 11250, change: -8.3 },
                { symbol: "AMZN", name: "Amazon.com Inc.", shares: 65, value: 15600, change: 3.22 },
              ].map((holding, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 group-hover:animate-pulse transition-all duration-300">
                      {holding.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                        {holding.symbol}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400">{holding.name}</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-right">
                    <div>
                      <div className="text-sm text-slate-400">{holding.shares} shares</div>
                      <div className="font-semibold text-white group-hover:scale-110 transition-all duration-300">
                        ${holding.value.toLocaleString()}
                      </div>
                    </div>
                    <div
                      className={`font-semibold text-sm transition-all duration-300 group-hover:scale-110 ${holding.change >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {holding.change >= 0 ? "+" : ""}
                      {holding.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Enhanced Transactions View Component
export function TransactionsView({
  transactions,
  formatCurrency,
  formatDate,
}: {
  transactions: Transaction[]
  formatCurrency: (amount: number) => string
  formatDate: (date: string) => string
}) {
  const [filterType, setFilterType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filterType !== "all" && transaction.type !== filterType) return false
      if (searchTerm && !transaction.note.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "amount") return Math.abs(b.amount) - Math.abs(a.amount)
      return 0
    })

  return (
    <section className="py-8 sm:py-12 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Transaction History
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">View and manage all your transactions</p>
        </div>

        {/* Enhanced Filters and Search */}
        <Card className="border-0 bg-slate-800/50 backdrop-blur-xl mb-8 hover:bg-slate-800/70 transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700/70 transition-all duration-300"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700/70 transition-all duration-300">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="deposit">Deposits</SelectItem>
                  <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  <SelectItem value="investment">Investments</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700/70 transition-all duration-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Transaction Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {[
            {
              title: "Total Deposits",
              amount: transactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0),
              icon: ArrowDownLeft,
              color: "text-green-400",
              bg: "from-green-500/20 to-emerald-500/20",
            },
            {
              title: "Total Withdrawals",
              amount: Math.abs(
                transactions.filter((t) => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0),
              ),
              icon: ArrowUpRight,
              color: "text-red-400",
              bg: "from-red-500/20 to-pink-500/20",
            },
            {
              title: "Total Investments",
              amount: Math.abs(
                transactions.filter((t) => t.type === "investment").reduce((sum, t) => sum + t.amount, 0),
              ),
              icon: PieChart,
              color: "text-blue-400",
              bg: "from-blue-500/20 to-purple-500/20",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`border-0 bg-gradient-to-br ${stat.bg} backdrop-blur-xl hover:scale-105 transition-all duration-500 group cursor-pointer`}
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-xl bg-slate-700/50 group-hover:scale-110 group-hover:animate-pulse transition-all duration-300">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-all duration-300">
                  {formatCurrency(stat.amount)}
                </div>
                <div className="text-xs sm:text-sm text-slate-300">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Transactions List */}
        <Card className="border-0 bg-slate-800/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-white">Transactions ({filteredTransactions.length})</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-white hover:bg-slate-700 bg-transparent hover:scale-105 transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
                  <p>No transactions found matching your criteria.</p>
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse ${
                          transaction.type === "deposit"
                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                            : transaction.type === "withdrawal"
                              ? "bg-gradient-to-r from-red-500 to-pink-600"
                              : "bg-gradient-to-r from-blue-500 to-purple-600"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <ArrowDownLeft className="h-5 w-5" />
                        ) : transaction.type === "withdrawal" ? (
                          <ArrowUpRight className="h-5 w-5" />
                        ) : (
                          <PieChart className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                          {transaction.note}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400">
                          {transaction.method} • {formatDate(transaction.date)}
                        </p>
                        <Badge
                          className={`text-xs mt-1 ${
                            transaction.type === "deposit"
                              ? "bg-green-500/20 text-green-400"
                              : transaction.type === "withdrawal"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold text-lg transition-all duration-300 group-hover:scale-110 ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="text-xs text-slate-400">{new Date(transaction.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Wallet Transaction Form Component
function WalletTransactionForm({
  type,
  onSubmit,
}: {
  type: "deposit" | "withdrawal"
  onSubmit: (type: "deposit" | "withdrawal", amount: number, method: string, note: string) => void
}) {
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !method) return

    onSubmit(type, Number.parseFloat(amount), method, note)
    setAmount("")
    setMethod("")
    setNote("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-white">
          Amount ($)
        </Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          step="0.01"
          required
          className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="method" className="text-white">
          Payment Method
        </Label>
        <Select value={method} onValueChange={setMethod} required>
          <SelectTrigger className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-all duration-300">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="bank">Bank Transfer</SelectItem>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="crypto">Cryptocurrency</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="note" className="text-white">
          Note (Optional)
        </Label>
        <Textarea
          id="note"
          placeholder="Add a note for this transaction"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-all duration-300"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="submit"
          className="px-8 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
        >
          {type === "deposit" ? "Deposit" : "Withdraw"}
        </Button>
      </div>
    </form>
  )
}
