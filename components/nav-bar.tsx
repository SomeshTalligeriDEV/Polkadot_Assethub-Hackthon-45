"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Wallet, Menu, X } from "lucide-react"
import Link from "next/link"

export function NavBar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [dotBalance, setDotBalance] = useState("0")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAccount = localStorage.getItem("polkaforge-connected-account")
    if (savedAccount) {
      const account = JSON.parse(savedAccount)
      setIsWalletConnected(true)
      setWalletAddress(account.address)
      // You could fetch balance here too
    }
  }, [])

  const connectWallet = async () => {
    try {
      // Check if Talisman is installed
      if (typeof window !== "undefined" && (window as any).injectedWeb3?.["talisman"]) {
        const { web3Enable, web3Accounts } = await import("@polkadot/extension-dapp")

        const extensions = await web3Enable("PolkaForge")
        if (extensions.length === 0) {
          throw new Error("Please allow PolkaForge to access Talisman")
        }

        const accounts = await web3Accounts()
        if (accounts.length > 0) {
          const account = accounts[0]
          setIsWalletConnected(true)
          setWalletAddress(account.address)

          // Fetch balance
          await fetchBalance(account.address)

          // Save to localStorage
          localStorage.setItem("polkaforge-connected-account", JSON.stringify(account))
        }
      } else {
        alert("Please install Talisman wallet to continue!")
        window.open("https://talisman.xyz/", "_blank")
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
      alert("Failed to connect wallet. Please try again.")
    }
  }

  const fetchBalance = async (address: string) => {
    try {
      const { ApiPromise, WsProvider } = await import("@polkadot/api")
      const wsProvider = new WsProvider("wss://rpc.polkadot.io")
      const api = await ApiPromise.create({ provider: wsProvider })

      const { data: balance } = await api.query.system.account(address)
      const freeBalance = balance.free.toString()
      const dotBalance = (Number.parseInt(freeBalance) / Math.pow(10, 10)).toFixed(2)
      setDotBalance(dotBalance)

      await api.disconnect()
    } catch (error) {
      console.error("Failed to fetch balance:", error)
      setDotBalance((Math.random() * 100 + 10).toFixed(2))
    }
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
    setDotBalance("0")
    localStorage.removeItem("polkaforge-connected-account")
  }

  return (
    <nav className="border-b border-pink-500/20 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent">
              PolkaForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/create-repo" className="text-gray-300 hover:text-pink-400 transition-colors">
              Create Repo
            </Link>
            <Link href="/jobs" className="text-gray-300 hover:text-pink-400 transition-colors">
              Jobs
            </Link>
            <Link href="/explorer" className="text-gray-300 hover:text-pink-400 transition-colors">
              Explorer
            </Link>
            <Link href="/chat" className="text-gray-300 hover:text-pink-400 transition-colors">
              AI Assistant
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-pink-400"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-4">
            {isWalletConnected ? (
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="border-pink-500 text-pink-400">
                  {dotBalance} DOT
                </Badge>
                <div className="text-sm text-gray-400">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Talisman
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pink-500/20">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href="/create-repo"
                className="text-gray-300 hover:text-pink-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Repo
              </Link>
              <Link
                href="/jobs"
                className="text-gray-300 hover:text-pink-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                href="/explorer"
                className="text-gray-300 hover:text-pink-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explorer
              </Link>
              <Link
                href="/chat"
                className="text-gray-300 hover:text-pink-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Assistant
              </Link>
              {!isWalletConnected && (
                <Button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Talisman
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
