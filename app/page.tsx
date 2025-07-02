"use client"

import { useState, useEffect } from "react"
import { ModernLandingPage } from "@/components/landing/modern-landing-page"
import { LoginPage } from "@/components/auth/login-page"
import { SignupPage } from "@/components/auth/signup-page"
import { ModernDashboard } from "@/components/dashboard/modern-dashboard"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
}

export default function InvestProPage() {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "signup" | "dashboard">("landing")
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("investpro_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setCurrentView("dashboard")
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (email: string, password: string) => {
    // Simulate login API call
    const mockUser: User = {
      id: "user_" + Date.now(),
      name: email.split("@")[0],
      email: email,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("investpro_user", JSON.stringify(mockUser))
    setUser(mockUser)
    setCurrentView("dashboard")
  }

  const handleSignup = (name: string, email: string, password: string, phone?: string) => {
    // Simulate signup API call
    const mockUser: User = {
      id: "user_" + Date.now(),
      name: name,
      email: email,
      phone: phone,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("investpro_user", JSON.stringify(mockUser))
    setUser(mockUser)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("investpro_user")
    setUser(null)
    setCurrentView("landing")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  if (currentView === "dashboard" && user) {
    return <ModernDashboard user={user} onLogout={handleLogout} />
  }

  if (currentView === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentView("signup")}
        onBackToLanding={() => setCurrentView("landing")}
      />
    )
  }

  if (currentView === "signup") {
    return (
      <SignupPage
        onSignup={handleSignup}
        onSwitchToLogin={() => setCurrentView("login")}
        onBackToLanding={() => setCurrentView("landing")}
      />
    )
  }

  return (
    <ModernLandingPage
      onSwitchToLogin={() => setCurrentView("login")}
      onSwitchToSignup={() => setCurrentView("signup")}
    />
  )
}
