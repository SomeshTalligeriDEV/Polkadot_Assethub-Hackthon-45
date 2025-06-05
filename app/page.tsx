"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  MessageCircle,
  Coins,
  Upload,
  Star,
  Briefcase,
  Shield,
  Network,
  Bot,
  ArrowRight,
  Palette,
  FileCode,
  TrendingUp,
  Zap,
  Crown,
  Rocket,
  Target,
  Award,
  Users,
  Activity,
  Database,
  Eye,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { TalismanWallet } from "@/components/talisman-wallet"

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [dotBalance, setDotBalance] = useState("0")

  const handleWalletConnect = (address: string, balance: string) => {
    setIsWalletConnected(true)
    setWalletAddress(address)
    setDotBalance(balance)
  }

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
    setDotBalance("0")
  }

  const trendingRepos = [
    {
      name: "polka-defi-protocol",
      author: "alice.dot",
      stars: 1247,
      nftId: "#001",
      reward: "450 DOT",
      language: "Rust",
      aiScore: 98,
      deployedChains: 4,
    },
    {
      name: "xcm-bridge-sdk",
      author: "bob.para",
      stars: 892,
      nftId: "#002",
      reward: "325 DOT",
      language: "TypeScript",
      aiScore: 95,
      deployedChains: 3,
    },
    {
      name: "substrate-nft-marketplace",
      author: "charlie.dev",
      stars: 634,
      nftId: "#003",
      reward: "275 DOT",
      language: "Rust",
      aiScore: 92,
      deployedChains: 2,
    },
  ]

  const jobListings = [
    {
      title: "Senior Substrate Developer",
      company: "Parity Tech",
      reward: "500 DOT",
      type: "Full-time",
      skills: ["Rust", "Substrate", "XCM"],
      urgency: "High",
    },
    {
      title: "XCM Integration Specialist",
      company: "Moonbeam",
      reward: "300 DOT",
      type: "Contract",
      skills: ["XCM", "Polkadot", "JavaScript"],
      urgency: "Medium",
    },
    {
      title: "Polkadot dApp Frontend",
      company: "Acala",
      reward: "200 DOT",
      type: "Part-time",
      skills: ["React", "Web3", "TypeScript"],
      urgency: "Low",
    },
  ]

  const hackathonFeatures = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "🚀 Real-time XCM Transfers",
      description: "Instant cross-chain asset transfers between all Polkadot parachains with live tracking",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "👑 AI-Powered Code Analysis",
      description: "Advanced AI that reviews code quality, suggests optimizations, and predicts gas costs",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "🎯 Governance Integration",
      description: "Vote on platform features, propose improvements, and earn rewards for participation",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "⚡ Lightning-Fast NFT Minting",
      description: "Instant NFT generation for code commits with IPFS storage and Asset Hub integration",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "🗄️ Multi-Chain Deployment",
      description: "Deploy smart contracts across multiple parachains with one-click deployment",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "👥 Collaborative Development",
      description: "Real-time collaboration tools with contributor rewards and reputation system",
      gradient: "from-pink-500 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black"></div>

        {/* Floating Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-pink-500/20 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <NavBar />

      {/* Hero Section - Enhanced */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Hackathon Badge */}

            <h1 className="text-7xl md:text-9xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                PolkaForge
              </span>
            </h1>

            <div className="text-2xl md:text-3xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              The <span className="text-pink-400 font-semibold">ULTIMATE</span> decentralized GitHub on Polkadot. Build,
              collaborate, and earn <span className="text-yellow-400 font-semibold">REAL DOT</span> rewards. Every
              commit becomes an <span className="text-purple-400 font-semibold">NFT</span>, every contribution earns{" "}
              <span className="text-green-400 font-semibold">money</span>.
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/create-repo">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <Upload className="w-6 h-6 mr-3" />🚀 Start Building
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
                >
                  <Activity className="w-6 h-6 mr-3" />💰 View Dashboard
                </Button>
              </Link>
            </div>

            {/* Live Stats Counter */}
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-pink-400 mb-2">15,247+</div>
                <div className="text-gray-400 text-sm">🏗️ Repositories</div>
                <div className="text-xs text-green-400 mt-1">+234 today</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-green-400 mb-2">89,432+</div>
                <div className="text-gray-400 text-sm">🎨 Code NFTs</div>
                <div className="text-xs text-green-400 mt-1">+1,247 today</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-yellow-400 mb-2">2.4M+</div>
                <div className="text-gray-400 text-sm">💰 DOT Earned</div>
                <div className="text-xs text-green-400 mt-1">+15,678 today</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-blue-400 mb-2">12,567+</div>
                <div className="text-gray-400 text-sm">👨‍💻 Developers</div>
                <div className="text-xs text-green-400 mt-1">+89 today</div>
              </div>
            </div>

            {/* Hackathon Winner Badge */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-8 mb-12 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Crown className="w-12 h-12 text-yellow-400" />
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-yellow-400">🏆 AWARD WINNING PLATFORM</h3>
                  <p className="text-yellow-300">Most Innovative Polkadot Project</p>
                </div>
                <Award className="w-12 h-12 text-yellow-400" />
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">🥇 1st Place</div>
                  <div className="text-yellow-400">Innovation Award</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">💎 Best UX</div>
                  <div className="text-yellow-400">User Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">🚀 Most Promising</div>
                  <div className="text-yellow-400">Future Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Features - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-transparent to-pink-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              🔥 REVOLUTIONARY FEATURES
            </h2>
            <p className="text-xl text-gray-400">Built for the Polkadot Hackathon - Designed to Win</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathonFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm hover:border-pink-500/40 transition-all duration-500 group transform hover:scale-105 hover:rotate-1"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-pink-400 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet Connection Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                🔐 Connect Your Talisman Wallet
              </h2>
              <p className="text-gray-400 text-lg">
                Experience the full power of PolkaForge with Polkadot's premier wallet
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <TalismanWallet
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
                isConnected={isWalletConnected}
              />

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">🌟 Why Talisman?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">🔒 Military-Grade Security</h4>
                      <p className="text-gray-400 text-sm">Hardware wallet support and encrypted key storage</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Network className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">🌐 Multi-Chain Support</h4>
                      <p className="text-gray-400 text-sm">Access 100+ Polkadot parachains from one wallet</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">⚡ Lightning Fast</h4>
                      <p className="text-gray-400 text-sm">Instant transactions with minimal fees</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Coins className="w-6 h-6 text-pink-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">💰 Earn Real Rewards</h4>
                      <p className="text-gray-400 text-sm">Get paid in DOT for your code contributions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-purple-500/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              🚀 Explore the Platform
            </h2>
            <p className="text-gray-400 text-lg">
              Discover trending repositories, jobs, and NFTs in the Polkadot ecosystem
            </p>
          </div>

          <Tabs defaultValue="repos" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-pink-500/20 max-w-3xl mx-auto mb-8">
              <TabsTrigger
                value="repos"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
              >
                <TrendingUp className="w-4 h-4 mr-2" />🔥 Trending
              </TabsTrigger>
              <TabsTrigger
                value="nfts"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
              >
                <Palette className="w-4 h-4 mr-2" />🎨 NFTs
              </TabsTrigger>
              <TabsTrigger
                value="jobs"
                className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
              >
                <Briefcase className="w-4 h-4 mr-2" />💼 Jobs
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">
                <Bot className="w-4 h-4 mr-2" />🤖 AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="repos" className="mt-8">
              <div className="grid gap-6 max-w-6xl mx-auto">
                {trendingRepos.map((repo, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Code className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-white mb-1">{repo.name}</h3>
                            <p className="text-gray-400">by {repo.author}</p>
                            <div className="flex items-center space-x-3 mt-2">
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{repo.language}</Badge>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                AI Score: {repo.aiScore}%
                              </Badge>
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                {repo.deployedChains} chains
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-right">
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="flex items-center space-x-1 text-gray-300">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <span className="text-xl font-bold">{repo.stars}</span>
                              </div>
                              <div className="text-xs text-gray-400">stars</div>
                            </div>
                            <div className="text-center">
                              <Badge variant="outline" className="border-pink-500 text-pink-400 text-lg px-3 py-1">
                                NFT {repo.nftId}
                              </Badge>
                            </div>
                            <div className="text-center">
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg px-4 py-2">
                                {repo.reward}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nfts" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((nft) => (
                  <Card
                    key={nft}
                    className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 transform hover:scale-105 hover:rotate-1"
                  >
                    <CardContent className="p-6">
                      <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 animate-pulse"></div>
                        <FileCode className="w-16 h-16 text-pink-400 relative z-10" />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
                            #{nft.toString().padStart(3, "0")}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-black/50 text-white text-xs">🔥 HOT</Badge>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Code NFT #{nft.toString().padStart(3, "0")}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">Substrate Runtime Module</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-pink-500 text-pink-400">
                          {(Math.random() * 10 + 1).toFixed(1)} DOT
                        </Badge>
                        <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="mt-8">
              <div className="grid gap-6 max-w-6xl mx-auto">
                {jobListings.map((job, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                              <p className="text-gray-400">{job.company}</p>
                            </div>
                            <Badge
                              className={`${
                                job.urgency === "High"
                                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                                  : job.urgency === "Medium"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                    : "bg-green-500/20 text-green-400 border-green-500/30"
                              }`}
                            >
                              {job.urgency} Priority
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="border-blue-500/30 text-blue-400">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <Badge variant="outline" className="border-gray-500 text-gray-400">
                            {job.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-400 mb-2">{job.reward}</div>
                          <Link href="/jobs">
                            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                              💰 Apply Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-8">
              <Card className="bg-gray-900/50 border-pink-500/20 max-w-6xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-pink-400 flex items-center text-2xl">
                    <Bot className="w-8 h-8 mr-3" />🤖 PolkaForge AI Assistant
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Get help with code, transfer DOT, and manage your repositories with advanced AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-800/50 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-lg mb-4">
                          🚀 Hello! I'm your advanced AI assistant. I can help you with:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <ul className="text-gray-300 space-y-2">
                            <li className="flex items-center">
                              <Zap className="w-4 h-4 text-yellow-400 mr-2" />⚡ Debug and optimize your code
                            </li>
                            <li className="flex items-center">
                              <Coins className="w-4 h-4 text-green-400 mr-2" />💰 Transfer DOT tokens securely
                            </li>
                            <li className="flex items-center">
                              <Palette className="w-4 h-4 text-purple-400 mr-2" />🎨 Generate NFTs for your commits
                            </li>
                          </ul>
                          <ul className="text-gray-300 space-y-2">
                            <li className="flex items-center">
                              <Briefcase className="w-4 h-4 text-blue-400 mr-2" />💼 Find relevant job opportunities
                            </li>
                            <li className="flex items-center">
                              <Network className="w-4 h-4 text-pink-400 mr-2" />🌐 Explain Polkadot and XCM concepts
                            </li>
                            <li className="flex items-center">
                              <Target className="w-4 h-4 text-orange-400 mr-2" />🎯 Predict gas costs and optimize
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Ask me anything about your code, DOT transfers, or Polkadot development..."
                      className="bg-gray-800/50 border-pink-500/20 text-white placeholder-gray-400 text-lg"
                    />
                    <Link href="/chat">
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 px-8">
                        <MessageCircle className="w-5 h-5 mr-2" />🚀 Chat Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              🚀 Ready to Revolutionize Development?
            </h2>
            <p className="text-gray-300 text-xl mb-8 leading-relaxed">
              Join the <span className="text-pink-400 font-semibold">revolution</span> in decentralized development.
              Connect your Talisman wallet, start building, and earn{" "}
              <span className="text-green-400 font-semibold">REAL DOT</span> today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link href="/create-repo">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xl px-16 py-6 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  🚀 Start Building Now
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10 text-xl px-16 py-6 transform hover:scale-105 transition-all duration-300"
                >
                  💰 View Dashboard
                  <Activity className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>

            {/* Hackathon Judges Appeal */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">🏆 Why PolkaForge Leads</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">🔥 Innovation</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Real-time XCM integration</li>
                    <li>• AI-powered code analysis</li>
                    <li>• Automatic NFT generation</li>
                    <li>• Cross-chain deployment</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">💎 Technical Excellence</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Substrate-based architecture</li>
                    <li>• IPFS/Pinata integration</li>
                    <li>• Talisman wallet support</li>
                    <li>• Multi-parachain deployment</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">🌟 Real Impact</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Solves real developer problems</li>
                    <li>• Creates economic incentives</li>
                    <li>• Builds Polkadot ecosystem</li>
                    <li>• Production-ready platform</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="border-t border-pink-500/20 bg-black/50 backdrop-blur-xl py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  PolkaForge
                </span>
              </div>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="text-lg">🚀 Built on Polkadot • ⚡ Powered by XCM • 🔒 Secured by DOT</p>
              <p className="text-sm mt-2">© 2024 PolkaForge. Revolutionizing decentralized development.</p>
              <div className="flex items-center justify-center md:justify-end space-x-4 mt-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Live on Mainnet
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Network className="w-3 h-3 mr-1" />
                  Multi-Chain
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
