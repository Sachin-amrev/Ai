"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  Sparkles,
  Target,
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
import { DashboardView, PlansView, WalletView, PortfolioView, TransactionsView } from "./dashboard-views"

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
  const [currentView, setCurrentView] = useState<"dashboard" | "plans" | "wallet" | "portfolio" | "transactions">(
    "dashboard",
  )
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

            {/* Mobile & Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                  currentView === "dashboard" ? "bg-white/20 text-white" : ""
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView("plans")}
                className={`text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                  currentView === "plans" ? "bg-white/20 text-white" : ""
                }`}
              >
                Plans
              </button>
              <button
                onClick={() => setCurrentView("wallet")}
                className={`text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                  currentView === "wallet" ? "bg-white/20 text-white" : ""
                }`}
              >
                Wallet
              </button>
              <button
                onClick={() => setCurrentView("portfolio")}
                className={`text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                  currentView === "portfolio" ? "bg-white/20 text-white" : ""
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setCurrentView("transactions")}
                className={`text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                  currentView === "transactions" ? "bg-white/20 text-white" : ""
                }`}
              >
                Transactions
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10 rounded-xl backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                  }`}
                ></span>
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                  }`}
                ></span>
              </div>
            </Button>

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
          </nav>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="py-4 space-y-2 border-t border-white/10 mt-4">
              {[
                { key: "dashboard", label: "Dashboard", icon: BarChart3 },
                { key: "plans", label: "Plans", icon: Target },
                { key: "wallet", label: "Wallet", icon: Wallet },
                { key: "portfolio", label: "Portfolio", icon: PieChart },
                { key: "transactions", label: "Transactions", icon: Activity },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setCurrentView(item.key as any)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentView === item.key ? "bg-white/20 text-white" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main>
        {currentView === "dashboard" && <DashboardView onNavigate={setCurrentView} />}
        {currentView === "plans" && <PlansView onSelectPlan={selectPlan} />}
        {currentView === "wallet" && (
          <WalletView
            walletBalance={walletBalance}
            transactions={transactions}
            onTransaction={handleWalletTransaction}
            onRefresh={refreshTransactions}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        )}
        {currentView === "portfolio" && <PortfolioView />}
        {currentView === "transactions" && (
          <TransactionsView transactions={transactions} formatCurrency={formatCurrency} formatDate={formatDate} />
        )}
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
