"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Toaster } from "@/components/ui/toaster"
import {
  Bell,
  BellRing,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  LogOut,
  User,
  Settings,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Update the KYC modal import to use the simplified version
import { KYCVerificationForm } from "@/components/kyc/kyc-verification-form"

interface UserType {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
}

interface Transaction {
  id: number
  type: "deposit" | "withdrawal" | "investment"
  amount: number
  method: string
  date: string
  note: string
}

interface Notification {
  id: string
  type: "transaction" | "market" | "system" | "alert"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  icon?: React.ReactNode
}

interface DashboardProps {
  user: UserType
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [walletBalance, setWalletBalance] = useState(15750.0)
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "deposit", amount: 5000, method: "Bank Transfer", date: "2025-05-28", note: "Initial deposit" },
    {
      id: 2,
      type: "investment",
      amount: -2500,
      method: "Growth Plan",
      date: "2025-05-27",
      note: "Investment in Growth Plan",
    },
    { id: 3, type: "deposit", amount: 3000, method: "Credit Card", date: "2025-05-25", note: "Monthly contribution" },
    {
      id: 4,
      type: "withdrawal",
      amount: -1000,
      method: "Bank Transfer",
      date: "2025-05-24",
      note: "Partial withdrawal",
    },
    {
      id: 5,
      type: "investment",
      amount: -5000,
      method: "Premium Plan",
      date: "2025-05-22",
      note: "Investment in Premium Plan",
    },
    { id: 6, type: "deposit", amount: 10000, method: "Bank Transfer", date: "2025-05-20", note: "Large deposit" },
    {
      id: 7,
      type: "investment",
      amount: -1500,
      method: "ESG Plan",
      date: "2025-05-18",
      note: "Sustainable investment",
    },
    { id: 8, type: "deposit", amount: 2000, method: "PayPal", date: "2025-05-15", note: "Regular savings" },
  ])

  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [notificationSettings, setNotificationSettings] = useState({
    transactions: true,
    marketUpdates: true,
    systemAlerts: true,
    priceAlerts: true,
  })

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showKYCModal, setShowKYCModal] = useState(false)
  const [kycStatus, setKycStatus] = useState<"pending" | "verified" | "rejected" | "not_started">("not_started")

  const handleWalletTransaction = (type: "deposit" | "withdrawal", amount: number, method: string, note: string) => {
    const transactionAmount = type === "withdrawal" ? -amount : amount
    const newBalance = walletBalance + transactionAmount

    if (type === "withdrawal" && amount > walletBalance) {
      toast({
        title: "Transaction Failed",
        description: "Insufficient balance for withdrawal",
        variant: "destructive",
      })

      addNotification({
        type: "transaction",
        title: "Transaction Failed",
        message: `Withdrawal of $${amount.toFixed(2)} failed due to insufficient balance`,
        priority: "high",
        icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
      })
      return
    }

    setWalletBalance(newBalance)

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type,
      amount: transactionAmount,
      method: getMethodName(method),
      date: new Date().toISOString().split("T")[0],
      note: note || `${type.charAt(0).toUpperCase() + type.slice(1)} transaction`,
    }

    setTransactions([newTransaction, ...transactions])

    toast({
      title: "Transaction Successful",
      description: `${type === "deposit" ? "Deposited" : "Withdrew"} $${amount.toFixed(2)} successfully`,
    })

    addNotification({
      type: "transaction",
      title: `${type === "deposit" ? "Deposit" : "Withdrawal"} Completed`,
      message: `$${amount.toFixed(2)} ${type === "deposit" ? "added to" : "withdrawn from"} your account via ${getMethodName(method)}`,
      priority: "medium",
      icon:
        type === "deposit" ? (
          <ArrowDownLeft className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowUpRight className="h-4 w-4 text-blue-500" />
        ),
    })
  }

  const getMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      bank: "Bank Transfer",
      card: "Credit Card",
      paypal: "PayPal",
      crypto: "Cryptocurrency",
    }
    return methods[method] || method
  }

  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
    setUnreadCount((prev) => prev + 1)
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    setUnreadCount(0)
  }

  const selectPlan = (planName: string) => {
    setSelectedPlan(planName)
    setShowPlanModal(true)

    addNotification({
      type: "system",
      title: "Plan Selected",
      message: `You've selected the ${planName}. Our investment team will contact you within 24 hours.`,
      priority: "medium",
      icon: <Info className="h-4 w-4 text-blue-500" />,
    })
  }

  const refreshTransactions = () => {
    toast({
      title: "Transactions Refreshed",
      description: "Your transaction history has been updated",
    })

    addNotification({
      type: "system",
      title: "Data Refreshed",
      message: "Your transaction history and account balance have been updated",
      priority: "low",
      icon: <RefreshCw className="h-4 w-4 text-blue-500" />,
    })
  }

  // Generate welcome notification
  useEffect(() => {
    addNotification({
      type: "system",
      title: `Welcome ${user.name}!`,
      message: "Your InvestPro account is now active. Start exploring our investment plans!",
      priority: "medium",
      icon: <Info className="h-4 w-4 text-blue-500" />,
    })
  }, [user.name])

  // Simulate market updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (notificationSettings.marketUpdates && Math.random() > 0.7) {
        const stocks = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"]
        const stock = stocks[Math.floor(Math.random() * stocks.length)]
        const change = (Math.random() - 0.5) * 6
        const isPositive = change > 0

        if (Math.abs(change) > 2) {
          addNotification({
            type: "market",
            title: `${stock} ${isPositive ? "Surge" : "Drop"}`,
            message: `${stock} is ${isPositive ? "up" : "down"} ${Math.abs(change).toFixed(2)}% in today's trading`,
            priority: Math.abs(change) > 4 ? "high" : "medium",
            icon: isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            ),
          })
        }
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [notificationSettings.marketUpdates])

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container mx-auto px-5 py-4">
          <nav className="flex justify-between items-center">
            <div
              className="text-white text-2xl font-bold"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              InvestPro
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-white hover:bg-white/20 px-4 py-2 rounded transition-all duration-300 hover:-translate-y-0.5"
              >
                Dashboard
              </a>
              <a
                href="#plans"
                className="text-white hover:bg-white/20 px-4 py-2 rounded transition-all duration-300 hover:-translate-y-0.5"
              >
                Plans
              </a>
              <a
                href="#wallet"
                className="text-white hover:bg-white/20 px-4 py-2 rounded transition-all duration-300 hover:-translate-y-0.5"
              >
                Wallet
              </a>
              <a
                href="#portfolio"
                className="text-white hover:bg-white/20 px-4 py-2 rounded transition-all duration-300 hover:-translate-y-0.5"
              >
                Portfolio
              </a>

              {/* Notification Bell */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                    {unreadCount > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                          Mark all read
                        </Button>
                      )}
                    </div>
                  </div>

                  <ScrollArea className="h-80">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No notifications yet</div>
                    ) : (
                      <div className="space-y-1">
                        {notifications.slice(0, 10).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0 ${
                              !notification.read ? "bg-blue-50/50" : ""
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2 flex-1">
                                {notification.icon}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium truncate">{notification.title}</p>
                                    {!notification.read && (
                                      <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.timestamp.toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>

                  {notifications.length > 0 && (
                    <div className="p-3 border-t">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Notification Settings</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Transactions</span>
                            <Switch
                              checked={notificationSettings.transactions}
                              onCheckedChange={(checked) =>
                                setNotificationSettings((prev) => ({ ...prev, transactions: checked }))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Market Updates</span>
                            <Switch
                              checked={notificationSettings.marketUpdates}
                              onCheckedChange={(checked) =>
                                setNotificationSettings((prev) => ({ ...prev, marketUpdates: checked }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback className="bg-white/20 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowKYCModal(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile & KYC</span>
                    {kycStatus === "verified" && <CheckCircle className="ml-auto h-4 w-4 text-green-500" />}
                    {kycStatus === "pending" && <Clock className="ml-auto h-4 w-4 text-yellow-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Welcome Section */}
        <section className="py-12 text-white">
          <div className="container mx-auto px-5">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back, {user.name}!</h1>
              <p className="text-lg opacity-90">Track your investments and grow your wealth with InvestPro</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-5">
          {/* Stats Section */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { number: formatCurrency(walletBalance), label: "Portfolio Value" },
              { number: "+8.6%", label: "Monthly Growth" },
              { number: "12.5%", label: "Annual Returns" },
              { number: "5", label: "Active Investments" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 text-white transition-all duration-300 hover:-translate-y-2 hover:bg-white/20"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                }}
              >
                <div className="text-2xl md:text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </Card>
            ))}
          </section>

          {/* Rest of the dashboard content - same as before but with user context */}
          {/* Wallet Section */}
          <section id="wallet" className="py-16">
            <Card
              className="p-8 mb-8"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2 className="text-3xl font-bold text-center mb-12 relative">
                Your Wallet
                <div
                  className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 rounded"
                  style={{
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                  }}
                ></div>
              </h2>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Balance Card */}
                <Card
                  className="p-8 text-center text-white border-0"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="text-lg opacity-90 mb-4">Total Balance</div>
                  <div className="text-4xl font-bold mb-4">{formatCurrency(walletBalance)}</div>
                  <div className="text-sm opacity-80">+$1,250.00 (8.6%) this month</div>
                </Card>

                {/* Actions Card */}
                <Card
                  className="p-8"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full py-4 text-white border-2 border-white/30 bg-white/20 hover:bg-white/30 hover:-translate-y-1 transition-all duration-300"
                          style={{
                            backdropFilter: "blur(10px)",
                            borderRadius: "10px",
                          }}
                        >
                          💰 Deposit Funds
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Deposit Funds</DialogTitle>
                          <DialogDescription>Add money to your investment account</DialogDescription>
                        </DialogHeader>
                        <WalletTransactionForm type="deposit" onSubmit={handleWalletTransaction} />
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full py-4 text-white border-2 border-white/30 bg-white/20 hover:bg-white/30 hover:-translate-y-1 transition-all duration-300"
                          style={{
                            backdropFilter: "blur(10px)",
                            borderRadius: "10px",
                          }}
                        >
                          💸 Withdraw Funds
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Withdraw Funds</DialogTitle>
                          <DialogDescription>Transfer money from your investment account</DialogDescription>
                        </DialogHeader>
                        <WalletTransactionForm type="withdrawal" onSubmit={handleWalletTransaction} />
                      </DialogContent>
                    </Dialog>

                    <Button
                      className="w-full py-4 text-white border-2 border-white/30 bg-white/20 hover:bg-white/30 hover:-translate-y-1 transition-all duration-300"
                      style={{
                        backdropFilter: "blur(10px)",
                        borderRadius: "10px",
                      }}
                    >
                      🔄 Transfer Funds
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Transactions */}
              <Card
                className="p-8"
                style={{
                  background: "white",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-100">
                  <h3 className="text-xl font-semibold">Recent Transactions</h3>
                  <Button
                    onClick={refreshTransactions}
                    className="px-6 py-2 text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                    }}
                  >
                    Refresh
                  </Button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {transactions.slice(0, 8).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-50 hover:translate-x-1 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            transaction.type === "deposit"
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : transaction.type === "withdrawal"
                                ? "bg-gradient-to-r from-red-500 to-red-600"
                                : "bg-gradient-to-r from-blue-500 to-blue-600"
                          }`}
                        >
                          {transaction.type === "deposit" ? "↓" : transaction.type === "withdrawal" ? "↑" : "📊"}
                        </div>
                        <div>
                          <h4 className="font-medium">{transaction.note}</h4>
                          <p className="text-sm text-gray-600">
                            {transaction.method} • {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`font-bold text-lg ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Card>
          </section>

          {/* Plans Section - Same as before */}
          <section id="plans" className="py-16">
            <Card
              className="p-8"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2 className="text-3xl font-bold text-center mb-12 relative">
                Investment Plans
                <div
                  className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 rounded"
                  style={{
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                  }}
                ></div>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Starter Plan",
                    price: "$100",
                    period: "Minimum Investment",
                    features: [
                      "8-10% Annual Returns",
                      "Low Risk Investment",
                      "Monthly Progress Reports",
                      "Email Support",
                      "Flexible Withdrawal",
                      "Market Analysis Access",
                    ],
                    featured: false,
                  },
                  {
                    name: "Growth Plan",
                    price: "$1,000",
                    period: "Minimum Investment",
                    features: [
                      "12-15% Annual Returns",
                      "Medium Risk Investment",
                      "Weekly Progress Reports",
                      "Priority Phone Support",
                      "Quarterly Rebalancing",
                      "Personal Investment Advisor",
                      "Tax Optimization Strategies",
                    ],
                    featured: true,
                  },
                  {
                    name: "Premium Plan",
                    price: "$10,000",
                    period: "Minimum Investment",
                    features: [
                      "15-20% Annual Returns",
                      "High Risk, High Reward",
                      "Daily Market Updates",
                      "24/7 Dedicated Support",
                      "Monthly Strategy Reviews",
                      "Access to Premium Markets",
                      "Personalized Portfolio",
                      "VIP Investment Events",
                    ],
                    featured: false,
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl ${
                      plan.featured ? "scale-105 border-2 border-blue-500" : ""
                    }`}
                    style={{
                      background: "white",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: plan.featured
                          ? "linear-gradient(45deg, #ff6b6b, #ee5a24)"
                          : "linear-gradient(45deg, #667eea, #764ba2)",
                      }}
                    ></div>

                    <div className="text-center mb-8">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">{plan.price}</div>
                      <div className="text-sm text-gray-600">{plan.period}</div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <span className="text-green-500 font-bold mr-3">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => selectPlan(plan.name)}
                      className={`w-full py-3 font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 ${
                        plan.featured ? "text-white" : "text-white"
                      }`}
                      style={{
                        background: plan.featured
                          ? "linear-gradient(45deg, #ff6b6b, #ee5a24)"
                          : "linear-gradient(45deg, #667eea, #764ba2)",
                      }}
                    >
                      {plan.featured ? "Most Popular" : "Choose Plan"}
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-12 text-center text-white"
        style={{
          background: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="container mx-auto px-5">
          <p>&copy; 2025 InvestPro. All rights reserved. | Investments are subject to market risks.</p>
        </div>
      </footer>

      {/* Plan Modal */}
      <Dialog open={showPlanModal} onOpenChange={setShowPlanModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Plan Selected</DialogTitle>
            <DialogDescription>
              You've selected the {selectedPlan}. Our investment team will contact you within 24 hours to complete your
              enrollment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <strong>Next Steps:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Complete KYC verification</li>
              <li>Fund your account</li>
              <li>Start earning returns</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      {/* KYC Modal */}
      <Dialog open={showKYCModal} onOpenChange={setShowKYCModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile & KYC Verification
            </DialogTitle>
            <DialogDescription>Complete your profile and KYC verification to unlock all features</DialogDescription>
          </DialogHeader>
          <KYCVerificationForm
            user={user}
            kycStatus={kycStatus}
            onKYCSubmit={(status) => {
              setKycStatus(status)
              toast({
                title: "KYC Submitted",
                description: "Your KYC documents have been submitted for review. We'll notify you within 24-48 hours.",
              })
            }}
          />
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

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
        <Label htmlFor="amount">Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          step="0.01"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="method">Payment Method</Label>
        <Select value={method} onValueChange={setMethod} required>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bank">Bank Transfer</SelectItem>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="crypto">Cryptocurrency</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Textarea
          id="note"
          placeholder="Add a note for this transaction"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" className="px-8 py-2">
          {type === "deposit" ? "Deposit" : "Withdraw"}
        </Button>
      </div>
    </form>
  )
}
