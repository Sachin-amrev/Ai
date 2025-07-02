"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Activity } from "lucide-react"

interface PortfolioData {
  totalValue: number
  dailyChange: number
  dailyChangePercent: number
  allocations: Array<{
    name: string
    value: number
    percentage: number
    change: number
    color: string
  }>
}

export function InteractiveDashboard() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    totalValue: 125750.5,
    dailyChange: 2847.32,
    dailyChangePercent: 2.31,
    allocations: [
      { name: "Growth Stocks", value: 45230.2, percentage: 36, change: 1.8, color: "#10b981" },
      { name: "Bonds", value: 37725.15, percentage: 30, change: 0.5, color: "#3b82f6" },
      { name: "Real Estate", value: 25150.1, percentage: 20, change: 2.1, color: "#f59e0b" },
      { name: "Commodities", value: 17645.05, percentage: 14, change: -0.8, color: "#ef4444" },
    ],
  })

  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      // Simulate real-time updates
      setPortfolioData((prev) => ({
        ...prev,
        dailyChange: prev.dailyChange + (Math.random() - 0.5) * 100,
        dailyChangePercent: prev.dailyChangePercent + (Math.random() - 0.5) * 0.1,
      }))
      setTimeout(() => setIsAnimating(false), 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-blue-600 to-purple-700 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold mb-2 transition-all duration-500 ${isAnimating ? "scale-105" : ""}`}>
              {formatCurrency(portfolioData.totalValue)}
            </div>
            <div className="flex items-center gap-2">
              {portfolioData.dailyChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-300" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-300" />
              )}
              <span
                className={`text-lg font-semibold ${portfolioData.dailyChange >= 0 ? "text-green-300" : "text-red-300"}`}
              >
                {portfolioData.dailyChange >= 0 ? "+" : ""}
                {formatCurrency(portfolioData.dailyChange)}
              </span>
              <span className="text-white/80">
                ({portfolioData.dailyChangePercent >= 0 ? "+" : ""}
                {portfolioData.dailyChangePercent.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>1 Month</span>
                  <span className="text-green-600 font-semibold">+8.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>3 Months</span>
                  <span className="text-green-600 font-semibold">+15.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>1 Year</span>
                  <span className="text-green-600 font-semibold">+24.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Asset Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioData.allocations.map((allocation, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: allocation.color }}></div>
                    <span className="font-medium text-sm">{allocation.name}</span>
                  </div>
                  <Badge variant={allocation.change >= 0 ? "default" : "destructive"} className="text-xs">
                    {allocation.change >= 0 ? "+" : ""}
                    {allocation.change}%
                  </Badge>
                </div>
                <div className="text-lg font-bold">{formatCurrency(allocation.value)}</div>
                <div className="text-sm text-gray-600">{allocation.percentage}% of portfolio</div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div
                    className="h-1 rounded-full transition-all duration-1000"
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 flex-col gap-2 bg-gradient-to-r from-blue-600 to-blue-700">
              <DollarSign className="h-5 w-5" />
              Invest More
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              Rebalance
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <PieChart className="h-5 w-5" />
              Analyze
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Activity className="h-5 w-5" />
              Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
