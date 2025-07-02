"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bell, TrendingUp, AlertTriangle, Mail } from "lucide-react"

interface NotificationSettings {
  transactions: boolean
  marketUpdates: boolean
  systemAlerts: boolean
  priceAlerts: boolean
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  monthlyStatements: boolean
}

export function NotificationPreferences() {
  const [settings, setSettings] = useState<NotificationSettings>({
    transactions: true,
    marketUpdates: true,
    systemAlerts: true,
    priceAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    monthlyStatements: true,
  })

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("Saving notification preferences:", settings)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>Customize how and when you receive notifications about your investments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Real-time Notifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Real-time Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="transactions">Transaction Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when deposits, withdrawals, or investments are processed
                </p>
              </div>
              <Switch
                id="transactions"
                checked={settings.transactions}
                onCheckedChange={(checked) => updateSetting("transactions", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketUpdates">Market Updates</Label>
                <p className="text-xs text-muted-foreground">
                  Receive alerts for significant market movements and opportunities
                </p>
              </div>
              <Switch
                id="marketUpdates"
                checked={settings.marketUpdates}
                onCheckedChange={(checked) => updateSetting("marketUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="priceAlerts">Price Alerts</Label>
                <p className="text-xs text-muted-foreground">Get notified when your investments hit target prices</p>
              </div>
              <Switch
                id="priceAlerts"
                checked={settings.priceAlerts}
                onCheckedChange={(checked) => updateSetting("priceAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="systemAlerts">System Alerts</Label>
                <p className="text-xs text-muted-foreground">Important system updates and maintenance notifications</p>
              </div>
              <Switch
                id="systemAlerts"
                checked={settings.systemAlerts}
                onCheckedChange={(checked) => updateSetting("systemAlerts", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Delivery Methods */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Delivery Methods
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Reports */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Reports & Summaries
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weeklyReports">Weekly Performance Reports</Label>
                <p className="text-xs text-muted-foreground">Weekly summary of your portfolio performance</p>
              </div>
              <Switch
                id="weeklyReports"
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => updateSetting("weeklyReports", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="monthlyStatements">Monthly Statements</Label>
                <p className="text-xs text-muted-foreground">Detailed monthly account statements</p>
              </div>
              <Switch
                id="monthlyStatements"
                checked={settings.monthlyStatements}
                onCheckedChange={(checked) => updateSetting("monthlyStatements", checked)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}
