"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Code,
  GitFork,
  Download,
  Star,
  Users,
  Coins,
  Palette,
  TrendingUp,
  Award,
  Shield,
  Network,
  Copy,
  ExternalLink,
  Plus,
  Eye,
  GitBranch,
  Activity,
  CheckCircle,
  Loader2,
  Sparkles,
  Crown,
  Rocket,
  Target,
} from "lucide-react"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"

interface Repository {
  id: string
  name: string
  description: string
  language: string
  stars: number
  forks: number
  contributors: number
  nftId: string
  ipfsHash: string
  dotEarned: number
  lastCommit: string
  isPrivate: boolean
  deployedChains: string[]
  aiScore: number
  governance: {
    proposals: number
    votes: number
  }
}

const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "polka-defi-protocol",
    description: "Advanced DeFi protocol with XCM integration and cross-chain yield farming",
    language: "Rust",
    stars: 1247,
    forks: 89,
    contributors: 23,
    nftId: "#001",
    ipfsHash: "QmXs7LhKnHuRQhgfgkDCNnSUXz8Xy5ZXorn6PcMMCQjTGr",
    dotEarned: 450.75,
    lastCommit: "2 hours ago",
    isPrivate: false,
    deployedChains: ["Polkadot", "Kusama", "Acala", "Moonbeam"],
    aiScore: 98,
    governance: { proposals: 5, votes: 234 },
  },
  {
    id: "2",
    name: "xcm-bridge-sdk",
    description: "Revolutionary XCM bridge SDK for seamless parachain communication",
    language: "TypeScript",
    stars: 892,
    forks: 67,
    contributors: 18,
    nftId: "#002",
    ipfsHash: "QmYt8LhKnHuRQhgfgkDCNnSUXz8Xy5ZXorn6PcMMCQjTGr",
    dotEarned: 325.5,
    lastCommit: "5 hours ago",
    isPrivate: false,
    deployedChains: ["Asset Hub", "Astar", "Parallel"],
    aiScore: 95,
    governance: { proposals: 3, votes: 156 },
  },
  {
    id: "3",
    name: "substrate-nft-marketplace",
    description: "Next-gen NFT marketplace with AI-powered pricing and governance",
    language: "Rust",
    stars: 634,
    forks: 45,
    contributors: 12,
    nftId: "#003",
    ipfsHash: "QmZt9LhKnHuRQhgfgkDCNnSUXz8Xy5ZXorn6PcMMCQjTGr",
    dotEarned: 275.25,
    lastCommit: "1 day ago",
    isPrivate: false,
    deployedChains: ["Asset Hub", "Unique"],
    aiScore: 92,
    governance: { proposals: 2, votes: 89 },
  },
]

export default function DashboardPage() {
  const [repositories, setRepositories] = useState<Repository[]>(mockRepositories)
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [isCloning, setIsCloning] = useState(false)
  const [isForking, setIsForking] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [dotBalance, setDotBalance] = useState("0")
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [nftCount, setNftCount] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Calculate totals
    const earnings = repositories.reduce((sum, repo) => sum + repo.dotEarned, 0)
    setTotalEarnings(earnings)
    setNftCount(repositories.length)
  }, [repositories])

  const connectTalismanWallet = async () => {
    try {
      // Check if Talisman is installed
      if (typeof window !== "undefined" && (window as any).injectedWeb3?.["talisman"]) {
        // Simulate connection
        setWalletConnected(true)
        setWalletAddress("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")
        setDotBalance("1,247.89")
      } else {
        alert("Please install Talisman wallet to continue!")
        window.open("https://talisman.xyz/", "_blank")
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  const handleCloneRepo = async (repo: Repository) => {
    setIsCloning(true)
    // Simulate cloning process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const cloneCommand = `git clone https://polkaforge.dev/${repo.name}.git`
    navigator.clipboard.writeText(cloneCommand)
    setIsCloning(false)
    alert(`Repository cloned! Command copied to clipboard:\n${cloneCommand}`)
  }

  const handleForkRepo = async (repo: Repository) => {
    setIsForking(true)
    // Simulate forking process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const forkedRepo = {
      ...repo,
      id: Date.now().toString(),
      name: `${repo.name}-fork`,
      forks: repo.forks + 1,
      nftId: `#${String(repositories.length + 1).padStart(3, "0")}`,
      dotEarned: 0,
      lastCommit: "just now",
    }

    setRepositories((prev) => [forkedRepo, ...prev])
    setIsForking(false)
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      Rust: "bg-orange-500",
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Solidity: "bg-purple-500",
      Python: "bg-green-500",
    }
    return colors[language] || "bg-gray-500"
  }

  const getAIScoreColor = (score: number) => {
    if (score >= 95) return "text-green-400"
    if (score >= 90) return "text-yellow-400"
    return "text-orange-400"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <NavBar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Wallet Connection */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              🚀 Developer Dashboard
            </h1>
            <p className="text-gray-400">Manage your blockchain repositories and earn DOT rewards</p>
          </div>

          {!walletConnected ? (
            <Button
              onClick={connectTalismanWallet}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8 py-3"
            >
              <Shield className="w-5 h-5 mr-2" />
              Connect Talisman Wallet
            </Button>
          ) : (
            <Card className="bg-gray-900/50 border-pink-500/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                      <span className="text-pink-400 font-semibold">{dotBalance} DOT</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-pink-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Repositories</p>
                  <p className="text-3xl font-bold text-white">{repositories.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">DOT Earned</p>
                  <p className="text-3xl font-bold text-green-400">{totalEarnings.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">NFTs Minted</p>
                  <p className="text-3xl font-bold text-blue-400">{nftCount}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border-yellow-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Hackathon Rank</p>
                  <p className="text-3xl font-bold text-yellow-400">#1</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-pink-500/20 mb-8">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
            >
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="repositories"
              className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
            >
              <Code className="w-4 h-4 mr-2" />
              Repositories
            </TabsTrigger>
            <TabsTrigger value="nfts" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">
              <Palette className="w-4 h-4 mr-2" />
              NFT Collection
            </TabsTrigger>
            <TabsTrigger
              value="governance"
              className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
            >
              <Target className="w-4 h-4 mr-2" />
              Governance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Code Quality Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full w-[95%]"></div>
                      </div>
                      <span className="text-green-400 font-semibold">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Community Engagement</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full w-[88%]"></div>
                      </div>
                      <span className="text-blue-400 font-semibold">88%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Cross-chain Deployment</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full w-[92%]"></div>
                      </div>
                      <span className="text-purple-400 font-semibold">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h4 className="text-white font-semibold">Polkadot Pioneer</h4>
                      <p className="text-xs text-gray-400">First 100 developers on PolkaForge</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                    <Rocket className="w-8 h-8 text-green-400" />
                    <div>
                      <h4 className="text-white font-semibold">XCM Master</h4>
                      <p className="text-xs text-gray-400">Successfully deployed cross-chain contracts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <Sparkles className="w-8 h-8 text-purple-400" />
                    <div>
                      <h4 className="text-white font-semibold">NFT Collector</h4>
                      <p className="text-xs text-gray-400">Minted 10+ code NFTs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="repositories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Repositories</h2>
              <Link href="/create-repo">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Repository
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {repositories.map((repo) => (
                <Card
                  key={repo.id}
                  className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Code className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white flex items-center">
                              {repo.name}
                              {repo.isPrivate && <Shield className="w-4 h-4 ml-2 text-gray-400" />}
                            </h3>
                            <p className="text-gray-400">{repo.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={`${getLanguageColor(repo.language)} text-white`}>{repo.language}</Badge>
                          <Badge variant="outline" className="border-pink-500/30 text-pink-400">
                            NFT {repo.nftId}
                          </Badge>
                          <Badge className={`${getAIScoreColor(repo.aiScore)} border-current`} variant="outline">
                            AI Score: {repo.aiScore}%
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{repo.stars}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <GitFork className="w-4 h-4 text-blue-400" />
                            <span>{repo.forks}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Users className="w-4 h-4 text-green-400" />
                            <span>{repo.contributors}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Coins className="w-4 h-4 text-pink-400" />
                            <span className="text-pink-400 font-semibold">{repo.dotEarned} DOT</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-sm text-gray-400">Deployed on:</span>
                          {repo.deployedChains.map((chain, index) => (
                            <Badge key={index} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              <Network className="w-3 h-3 mr-1" />
                              {chain}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>Last commit: {repo.lastCommit}</span>
                          <div className="flex items-center space-x-2">
                            <span>Governance:</span>
                            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                              {repo.governance.proposals} proposals
                            </Badge>
                            <Badge variant="outline" className="border-green-500/30 text-green-400">
                              {repo.governance.votes} votes
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-6">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
                          onClick={() => setSelectedRepo(repo)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                          onClick={() => handleCloneRepo(repo)}
                          disabled={isCloning}
                        >
                          {isCloning ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4 mr-1" />
                          )}
                          Clone
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                          onClick={() => handleForkRepo(repo)}
                          disabled={isForking}
                        >
                          {isForking ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <GitBranch className="w-4 h-4 mr-1" />
                          )}
                          Fork
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nfts" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo) => (
                <Card
                  key={repo.id}
                  className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 animate-pulse"></div>
                      <Code className="w-16 h-16 text-pink-400 relative z-10" />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">{repo.nftId}</Badge>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{repo.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{repo.description.slice(0, 80)}...</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">IPFS Hash:</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(repo.ipfsHash)}
                          className="text-pink-400 hover:text-pink-300 p-1"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-pink-400 font-mono bg-gray-800/50 p-2 rounded">
                        {repo.ipfsHash.slice(0, 20)}...
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {repo.dotEarned} DOT Earned
                      </Badge>
                      <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View on IPFS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400">Active Proposals</CardTitle>
                  <CardDescription className="text-gray-400">
                    Vote on platform improvements and feature requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-purple-500/20">
                    <h4 className="text-white font-semibold mb-2">Implement AI Code Review</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Add automated AI-powered code review for all repositories
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-500/20 text-green-400 border border-green-500/30">
                          ✓ Yes (234)
                        </Button>
                        <Button size="sm" className="bg-red-500/20 text-red-400 border border-red-500/30">
                          ✗ No (45)
                        </Button>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">2 days left</Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border border-purple-500/20">
                    <h4 className="text-white font-semibold mb-2">Cross-chain NFT Transfers</h4>
                    <p className="text-gray-400 text-sm mb-3">Enable NFT transfers between Polkadot parachains</p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-500/20 text-green-400 border border-green-500/30">
                          ✓ Yes (189)
                        </Button>
                        <Button size="sm" className="bg-red-500/20 text-red-400 border border-red-500/30">
                          ✗ No (23)
                        </Button>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">5 days left</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400">Your Governance Power</CardTitle>
                  <CardDescription className="text-gray-400">
                    Voting power based on your contributions and DOT holdings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-400 mb-2">1,247</div>
                    <p className="text-gray-400">Voting Power</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">DOT Holdings</span>
                      <span className="text-white font-semibold">800 votes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Code Contributions</span>
                      <span className="text-white font-semibold">347 votes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Community Engagement</span>
                      <span className="text-white font-semibold">100 votes</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Proposal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Repository Details Dialog */}
      {selectedRepo && (
        <Dialog open={!!selectedRepo} onOpenChange={() => setSelectedRepo(null)}>
          <DialogContent className="bg-gray-900 border-pink-500/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-pink-400 text-2xl flex items-center">
                <Code className="w-6 h-6 mr-2" />
                {selectedRepo.name}
              </DialogTitle>
              <DialogDescription className="text-gray-400">{selectedRepo.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Repository Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-400">{selectedRepo.stars}</div>
                      <div className="text-sm text-gray-400">Stars</div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{selectedRepo.forks}</div>
                      <div className="text-sm text-gray-400">Forks</div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{selectedRepo.contributors}</div>
                      <div className="text-sm text-gray-400">Contributors</div>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-pink-400">{selectedRepo.dotEarned}</div>
                      <div className="text-sm text-gray-400">DOT Earned</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">NFT Details</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400">NFT ID:</span>
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600">{selectedRepo.nftId}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">IPFS Hash:</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(selectedRepo.ipfsHash)}
                          className="text-pink-400 hover:text-pink-300 p-1"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-pink-400 font-mono bg-gray-900/50 p-2 rounded">
                        {selectedRepo.ipfsHash}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Deployment Status</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedRepo.deployedChains.map((chain, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Network className="w-4 h-4 text-blue-400" />
                        <span className="text-white">{chain}</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                  onClick={() => handleCloneRepo(selectedRepo)}
                  disabled={isCloning}
                >
                  {isCloning ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Clone Repository
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  onClick={() => handleForkRepo(selectedRepo)}
                  disabled={isForking}
                >
                  {isForking ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <GitBranch className="w-4 h-4 mr-2" />
                  )}
                  Fork Repository
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
