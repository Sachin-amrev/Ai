"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Shield, Users, BarChart3, ArrowLeft, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface LoginPageProps {
  onLogin: (email: string, password: string) => void
  onSwitchToSignup: () => void
  onBackToLanding?: () => void
}

export function LoginPage({ onLogin, onSwitchToSignup, onBackToLanding }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (!email.includes("@")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onLogin(email, password)
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in to InvestPro",
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          {onBackToLanding && (
            <Button variant="ghost" onClick={onBackToLanding} className="mb-6 text-white hover:bg-white/10 rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          )}

          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
              <CardDescription className="text-slate-300">
                Sign in to your InvestPro account to continue your investment journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-slate-300">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" className="text-sm p-0 h-auto text-cyan-400 hover:text-cyan-300">
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-slate-400">Don't have an account? </span>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold text-cyan-400 hover:text-cyan-300"
                    onClick={onSwitchToSignup}
                  >
                    Sign up
                  </Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700"
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700"
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Smart Investment Solutions</h1>
          <p className="text-xl mb-8 text-slate-300">
            Join thousands of investors who trust InvestPro to grow their wealth with professional investment
            management.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Bank-Level Security</h3>
                <p className="text-sm text-slate-400">Your investments are protected with advanced encryption</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur">
                <BarChart3 className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">Real-Time Analytics</h3>
                <p className="text-sm text-slate-400">Track your portfolio performance with detailed insights</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">Expert Advisors</h3>
                <p className="text-sm text-slate-400">Get guidance from certified financial professionals</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-white/10 backdrop-blur">
            <div className="text-center">
              <div className="text-2xl font-bold">$2.5B+</div>
              <div className="text-sm text-slate-400">Assets Under Management</div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
