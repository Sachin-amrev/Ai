"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  Wallet,
  PieChart,
  BarChart3,
  Activity,
  DollarSign,
  Sparkles,
  Shield,
  Zap,
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

export function ModernDashboard({ user, onLogout }: DashboardProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Modern Header with Glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
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
              <a
                href="#home"
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Dashboard
              </a>
              <a
                href="#plans"
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Plans
              </a>
              <a
                href="#wallet"
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Wallet
              </a>
              <a
                href="#portfolio"
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Portfolio
              </a>

              {/* Notification Bell */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-white hover:bg-white/10 rounded-xl backdrop-blur-sm"
                  >
                    {unreadCount > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 bg-slate-900/95 backdrop-blur-xl border-slate-700" align="end">
                  <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-slate-400">
                          Mark all read
                        </Button>
                      )}
                    </div>
                  </div>

                  <ScrollArea className="h-80">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-slate-400">No notifications yet</div>
                    ) : (
                      <div className="space-y-1">
                        {notifications.slice(0, 10).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 hover:bg-slate-800/50 cursor-pointer border-b border-slate-800 last:border-b-0 ${
                              !notification.read ? "bg-blue-900/20" : ""
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2 flex-1">
                                {notification.icon}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium truncate text-white">{notification.title}</p>
                                    {!notification.read && (
                                      <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-400 mt-1">{notification.message}</p>
                                  <p className="text-xs text-slate-500 mt-1">
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
                    <div className="p-3 border-t border-slate-700">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-white">Notification Settings</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Transactions</span>
                            <Switch
                              checked={notificationSettings.transactions}
                              onCheckedChange={(checked) =>
                                setNotificationSettings((prev) => ({ ...prev, transactions: checked }))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Market Updates</span>
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
                  <Button variant="ghost" className="relative h-10 w-10 rounded-xl">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-slate-900/95 backdrop-blur-xl border-slate-700"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                      <p className="text-xs leading-none text-slate-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem onClick={() => setShowKYCModal(true)} className="text-slate-300 hover:text-white">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile & KYC</span>
                    {kycStatus === "verified" && <CheckCircle className="ml-auto h-4 w-4 text-green-500" />}
                    {kycStatus === "pending" && <Clock className="ml-auto h-4 w-4 text-yellow-500" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem onClick={onLogout} className="text-slate-300 hover:text-white">
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
        {/* Modern Welcome Section */}
        <section className="py-12 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </h1>
              <p className="text-xl text-slate-300">Track your investments and grow your wealth with InvestPro</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6">
          {/* Modern Stats Section */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              {
                number: formatCurrency(walletBalance),
                label: "Portfolio Value",
                icon: DollarSign,
                gradient: "from-green-400 to-emerald-500",
                bgGradient: "from-green-500/20 to-emerald-500/20",
              },
              {
                number: "+8.6%",
                label: "Monthly Growth",
                icon: TrendingUp,
                gradient: "from-blue-400 to-cyan-500",
                bgGradient: "from-blue-500/20 to-cyan-500/20",
              },
              {
                number: "12.5%",
                label: "Annual Returns",
                icon: BarChart3,
                gradient: "from-purple-400 to-pink-500",
                bgGradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                number: "5",
                label: "Active Investments",
                icon: Activity,
                gradient: "from-orange-400 to-red-500",
                bgGradient: "from-orange-500/20 to-red-500/20",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
              </Card>
            ))}
          </section>

          {/* Modern Wallet Section */}
          <section id="wallet" className="py-16">
            <Card className="border-0 bg-slate-800/50 backdrop-blur-xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-white relative">
                  Your Wallet
                  <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 rounded bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                </h2>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  {/* Modern Balance Card */}
                  <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
                    <CardContent className="p-8 text-center text-white relative z-10">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500">
                          <Wallet className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="text-lg text-slate-300 mb-4">Total Balance</div>
                      <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {formatCurrency(walletBalance)}
                      </div>
                      <div className="text-sm text-green-400 flex items-center justify-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        +$1,250.00 (8.6%) this month
                      </div>
                    </CardContent>
                  </Card>

                  {/* Modern Actions Card */}
                  <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl">
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-xl transition-all duration-300 hover:scale-105">
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
                            <WalletTransactionForm type="deposit" onSubmit={handleWalletTransaction} />
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl transition-all duration-300 hover:scale-105">
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
                            <WalletTransactionForm type="withdrawal" onSubmit={handleWalletTransaction} />
                          </DialogContent>
                        </Dialog>

                        <Button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 rounded-xl transition-all duration-300 hover:scale-105">
                          <RefreshCw className="mr-2 h-5 w-5" />
                          Transfer Funds
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Modern Transactions */}
                <Card className="border-0 bg-slate-800/50 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Recent Transactions
                      </h3>
                      <Button
                        onClick={refreshTransactions}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                      </Button>
                    </div>

                    <div className="max-h-96 overflow-y-auto space-y-3">
                      {transactions.slice(0, 8).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex justify-between items-center p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
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
                              <h4 className="font-medium text-white">{transaction.note}</h4>
                              <p className="text-sm text-slate-400">
                                {transaction.method} • {formatDate(transaction.date)}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`font-bold text-lg ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </section>

          {/* Modern Plans Section */}
          <section id="plans" className="py-16">
            <Card className="border-0 bg-slate-800/50 backdrop-blur-xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-white relative">
                  Investment Plans
                  <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 rounded bg-gradient-to-r from-cyan-400 to-blue-500"></div>
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
                      gradient: "from-green-500/20 to-emerald-500/20",
                      buttonGradient: "from-green-500 to-emerald-600",
                      icon: Shield,
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
                      gradient: "from-blue-500/20 to-purple-500/20",
                      buttonGradient: "from-blue-500 to-purple-600",
                      icon: Zap,
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
                      gradient: "from-orange-500/20 to-red-500/20",
                      buttonGradient: "from-orange-500 to-red-600",
                      icon: Sparkles,
                    },
                  ].map((plan, index) => (
                    <Card
                      key={index}
                      className={`relative border-0 bg-gradient-to-br ${plan.gradient} backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden ${
                        plan.featured ? "ring-2 ring-blue-500/50" : ""
                      }`}
                    >
                      {plan.featured && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500" />
                      )}

                      <CardContent className="p-8 text-white relative z-10">
                        <div className="text-center mb-8">
                          <div className="flex justify-center mb-4">
                            <div className={`p-4 rounded-2xl bg-gradient-to-r ${plan.buttonGradient}`}>
                              <plan.icon className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
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
                          onClick={() => selectPlan(plan.name)}
                          className={`w-full py-3 font-bold rounded-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r ${plan.buttonGradient} hover:shadow-lg border-0`}
                        >
                          {plan.featured ? "Most Popular" : "Choose Plan"}
                        </Button>
                      </CardContent>

                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="py-12 text-center text-white bg-slate-900/50 backdrop-blur-xl border-t border-slate-800">
        <div className="container mx-auto px-6">
          <p className="text-slate-400">
            &copy; 2025 InvestPro. All rights reserved. | Investments are subject to market risks.
          </p>
        </div>
      </footer>

      {/* Plan Modal */}
      <Dialog open={showPlanModal} onOpenChange={setShowPlanModal}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Plan Selected</DialogTitle>
            <DialogDescription className="text-slate-400">
              You've selected the {selectedPlan}. Our investment team will contact you within 24 hours to complete your
              enrollment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-white">
              <strong>Next Steps:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
              <li>Complete KYC verification</li>
              <li>Fund your account</li>
              <li>Start earning returns</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      {/* KYC Modal */}
      <Dialog open={showKYCModal} onOpenChange={setShowKYCModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <User className="h-5 w-5" />
              Profile & KYC Verification
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Complete your profile and KYC verification to unlock all features
            </DialogDescription>
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
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="method" className="text-white">
          Payment Method
        </Label>
        <Select value={method} onValueChange={setMethod} required>
          <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
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
          className="bg-slate-800 border-slate-600 text-white"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="submit"
          className="px-8 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
        >
          {type === "deposit" ? "Deposit" : "Withdraw"}
        </Button>
      </div>
    </form>
  )
}
