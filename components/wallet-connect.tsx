"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, CheckCircle } from "lucide-react"

interface WalletConnectProps {
  onConnect: (address: string, balance: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const connectTalisman = async () => {
    setIsConnecting(true)

    // Simulate wallet connection delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockAddress = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
    const mockBalance = "125.42"

    onConnect(mockAddress, mockBalance)
    setIsConnecting(false)
    setShowDetails(true)
  }

  return (
    <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-pink-400 flex items-center">
          <Wallet className="w-5 h-5 mr-2" />
          Connect Your Wallet
        </CardTitle>
        <CardDescription className="text-gray-400">
          Connect your Talisman wallet to start earning DOT and minting NFTs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={connectTalisman}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Talisman Wallet
            </>
          )}
        </Button>

        {showDetails && (
          <div className="space-y-3 p-4 bg-gray-800/50 rounded-lg border border-pink-500/20">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Network</span>
              <span className="text-white">Polkadot</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Balance</span>
              <span className="text-pink-400 font-semibold">125.42 DOT</span>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center">
          Don't have Talisman?
          <a href="#" className="text-pink-400 hover:text-pink-300 ml-1 inline-flex items-center">
            Download here <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
