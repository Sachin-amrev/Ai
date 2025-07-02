"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function MarketTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "AAPL", name: "Apple Inc.", price: 185.25, change: 2.15, changePercent: 1.17 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.8, change: -1.25, changePercent: -0.87 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 378.9, change: 4.5, changePercent: 1.2 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 248.75, change: -8.3, changePercent: -3.23 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 151.94, change: 3.22, changePercent: 2.16 },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.3, change: -12.45, changePercent: -1.4 },
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((stock) => {
          const changePercent = (Math.random() - 0.5) * 2 // Random change between -1% and +1%
          const change = stock.price * (changePercent / 100)
          const newPrice = Math.max(0.01, stock.price + change)

          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
          }
        }),
      )
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live Market Data</h3>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.map((stock) => (
            <div key={stock.symbol} className="p-3 rounded-lg border bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-sm">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(stock.price)}</div>
                  <div
                    className={`flex items-center text-xs ${
                      stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.changePercent >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
