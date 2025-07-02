"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Clock, AlertTriangle, User, Copy, Check, Wallet } from "lucide-react"

interface UserType {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
}

interface KYCVerificationFormProps {
  user: UserType
  kycStatus: "pending" | "verified" | "rejected" | "not_started"
  onKYCSubmit: (status: "pending") => void
}

interface KYCFormData {
  // Personal Information
  fullName: string
  dateOfBirth: string
  nationality: string
  address: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string

  // Financial Information
  occupation: string
  annualIncome: string
  sourceOfFunds: string

  // Account Details
  accountType: string
  bankName: string
  accountNumber: string
  accountHolderName: string
  routingNumber: string
  usdtTrc20Address: string
}

export function KYCVerificationForm({ user, kycStatus, onKYCSubmit }: KYCVerificationFormProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)

  // Our USDT TRC20 address for deposits
  const ourUSDTAddress = "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE"

  const [formData, setFormData] = useState<KYCFormData>({
    fullName: user.name || "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: user.phone || "",
    occupation: "",
    annualIncome: "",
    sourceOfFunds: "",
    accountType: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    routingNumber: "",
    usdtTrc20Address: "",
  })

  const updateFormData = (field: keyof KYCFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAddress(true)
      toast({
        title: "Copied!",
        description: "USDT address copied to clipboard",
      })
      setTimeout(() => setCopiedAddress(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the address manually",
        variant: "destructive",
      })
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.fullName &&
          formData.dateOfBirth &&
          formData.nationality &&
          formData.address &&
          formData.city &&
          formData.phoneNumber
        )
      case 2:
        return !!(formData.occupation && formData.annualIncome && formData.sourceOfFunds)
      case 3:
        return !!(
          formData.accountType &&
          (formData.accountType === "crypto"
            ? formData.usdtTrc20Address
            : formData.bankName && formData.accountNumber && formData.accountHolderName)
        )
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields before proceeding",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast({
        title: "Incomplete Information",
        description: "Please complete all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API submission
    setTimeout(() => {
      onKYCSubmit("pending")
      setCurrentStep(4)
      setIsSubmitting(false)
    }, 2000)
  }

  const getStatusBadge = () => {
    switch (kycStatus) {
      case "verified":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Not Started</Badge>
    }
  }

  if (kycStatus === "verified") {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              KYC Verification Complete
            </CardTitle>
            <CardDescription>Your account has been fully verified and all features are unlocked.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Account Holder</Label>
                <p className="text-sm text-gray-600">{user.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Verification Date</Label>
                <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <UserProfileCard user={user} />
      </div>
    )
  }

  if (currentStep === 4) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-blue-700">
            <Clock className="h-5 w-5" />
            KYC Submitted Successfully
          </CardTitle>
          <CardDescription>
            Your KYC information has been submitted for review. We'll notify you within 24-48 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Reference ID: KYC-{Date.now()}</p>
              <p>Submitted: {new Date().toLocaleString()}</p>
            </div>
            <Button onClick={() => setCurrentStep(1)} variant="outline">
              View Submitted Information
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                KYC Verification Status
              </CardTitle>
              <CardDescription>Complete your verification to unlock all features</CardDescription>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
      </Card>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-24 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Financial Information"}
              {currentStep === 3 && "Payment Details"}
            </h3>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    placeholder="Enter your full legal name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Select value={formData.nationality} onValueChange={(value) => updateFormData("nationality", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="JP">Japan</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => updateFormData("occupation", e.target.value)}
                    placeholder="Your current occupation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income *</Label>
                  <Select
                    value={formData.annualIncome}
                    onValueChange={(value) => updateFormData("annualIncome", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_25k">Under $25,000</SelectItem>
                      <SelectItem value="25k_50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k_250k">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250k_500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="over_500k">Over $500,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sourceOfFunds">Source of Funds *</Label>
                <Select
                  value={formData.sourceOfFunds}
                  onValueChange={(value) => updateFormData("sourceOfFunds", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source of funds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salary/Employment</SelectItem>
                    <SelectItem value="business">Business Income</SelectItem>
                    <SelectItem value="investments">Investment Returns</SelectItem>
                    <SelectItem value="inheritance">Inheritance</SelectItem>
                    <SelectItem value="savings">Personal Savings</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Why do we need this information?</h4>
                <p className="text-sm text-yellow-700">
                  This information helps us comply with anti-money laundering (AML) regulations and ensures the security
                  of our platform and your investments.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Payment Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="accountType">Preferred Payment Method *</Label>
                <Select value={formData.accountType} onValueChange={(value) => updateFormData("accountType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency (USDT TRC20)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.accountType === "bank" && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input
                        id="bankName"
                        value={formData.bankName}
                        onChange={(e) => updateFormData("bankName", e.target.value)}
                        placeholder="Enter bank name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                      <Input
                        id="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={(e) => updateFormData("accountHolderName", e.target.value)}
                        placeholder="Full name on account"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) => updateFormData("accountNumber", e.target.value)}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        value={formData.routingNumber}
                        onChange={(e) => updateFormData("routingNumber", e.target.value)}
                        placeholder="Enter routing number"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.accountType === "crypto" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="usdtTrc20Address">Your USDT TRC20 Address *</Label>
                    <Input
                      id="usdtTrc20Address"
                      value={formData.usdtTrc20Address}
                      onChange={(e) => updateFormData("usdtTrc20Address", e.target.value)}
                      placeholder="Enter your USDT TRC20 wallet address"
                    />
                    <p className="text-xs text-gray-600">
                      This address will be used for withdrawals. Make sure it's a valid TRC20 USDT address.
                    </p>
                  </div>

                  <Card className="p-4 border-blue-200 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                        <Wallet className="h-5 w-5" />
                        Our USDT TRC20 Deposit Address
                      </CardTitle>
                      <CardDescription className="text-blue-700">
                        Use this address to deposit USDT to your InvestPro account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono break-all">{ourUSDTAddress}</code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(ourUSDTAddress)}
                            className="ml-2 flex-shrink-0"
                          >
                            {copiedAddress ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-blue-700">
                        <p className="font-medium">Important:</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                          <li>Only send USDT on the TRC20 network</li>
                          <li>Minimum deposit: $10 USDT</li>
                          <li>Deposits are credited within 1-3 confirmations</li>
                          <li>Save this address for future deposits</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button onClick={nextStep}>Next</Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isSubmitting ? "Submitting..." : "Submit KYC"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UserProfileCard({ user }: { user: UserType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Full Name</Label>
            <p className="text-sm text-gray-600">{user.name}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Email Address</Label>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <Label className="text-sm font-medium">Phone Number</Label>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          )}
          <div>
            <Label className="text-sm font-medium">Member Since</Label>
            <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
