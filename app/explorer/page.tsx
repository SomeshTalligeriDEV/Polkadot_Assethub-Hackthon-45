"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Book, FileText, ExternalLink, BookOpen, Star, MessageSquare } from "lucide-react"
import { NavBar } from "@/components/nav-bar"

const polkadotDocs = [
  {
    id: 1,
    title: "Introduction to Polkadot",
    description: "Learn about Polkadot's architecture and core concepts",
    category: "Getting Started",
    url: "https://wiki.polkadot.network/docs/learn-introduction",
    stars: 245,
    comments: 32,
  },
  {
    id: 2,
    title: "Cross-Consensus Message Format (XCM)",
    description: "Understanding the cross-chain messaging protocol",
    category: "Advanced",
    url: "https://wiki.polkadot.network/docs/learn-xcm",
    stars: 189,
    comments: 27,
  },
  {
    id: 3,
    title: "Substrate Development",
    description: "Build blockchain applications with Substrate framework",
    category: "Development",
    url: "https://docs.substrate.io/",
    stars: 412,
    comments: 56,
  },
  {
    id: 4,
    title: "Asset Hub (formerly Statemint)",
    description: "Learn about Polkadot's native asset parachain",
    category: "Parachains",
    url: "https://wiki.polkadot.network/docs/learn-assets",
    stars: 156,
    comments: 18,
  },
  {
    id: 5,
    title: "EVM Compatibility",
    description: "How to use Ethereum Virtual Machine on Polkadot",
    category: "Development",
    url: "https://wiki.polkadot.network/docs/build-evm",
    stars: 278,
    comments: 41,
  },
  {
    id: 6,
    title: "Polkadot JS API",
    description: "JavaScript library for interacting with Polkadot",
    category: "Development",
    url: "https://polkadot.js.org/docs/",
    stars: 324,
    comments: 47,
  },
]

const tutorials = [
  {
    id: 1,
    title: "Building Your First Substrate Chain",
    description: "Step-by-step guide to creating a custom blockchain",
    difficulty: "Beginner",
    duration: "2 hours",
    url: "#",
  },
  {
    id: 2,
    title: "Implementing XCM Transfers",
    description: "Learn how to transfer assets between parachains",
    difficulty: "Advanced",
    duration: "3 hours",
    url: "#",
  },
  {
    id: 3,
    title: "NFT Minting on Asset Hub",
    description: "Create and manage NFTs on Polkadot's Asset Hub",
    difficulty: "Intermediate",
    duration: "1.5 hours",
    url: "#",
  },
]

const categories = ["All", "Getting Started", "Development", "Parachains", "Advanced", "Security", "Governance"]

export default function ExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredDocs = polkadotDocs.filter(
    (doc) =>
      (selectedCategory === "All" || doc.category === selectedCategory) &&
      (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black"></div>
      </div>

      <NavBar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent">
            Polkadot Explorer
          </h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-pink-500/20"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-pink-400 flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 p-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={
                        selectedCategory === category
                          ? "w-full justify-start bg-pink-500/20 text-pink-400 hover:bg-pink-500/30"
                          : "w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800/50"
                      }
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="documentation" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-pink-500/20">
                <TabsTrigger
                  value="documentation"
                  className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                >
                  Documentation
                </TabsTrigger>
                <TabsTrigger
                  value="tutorials"
                  className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                >
                  Tutorials
                </TabsTrigger>
                <TabsTrigger
                  value="examples"
                  className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                >
                  Code Examples
                </TabsTrigger>
              </TabsList>

              <TabsContent value="documentation" className="mt-6 space-y-6">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <Card
                      key={doc.id}
                      className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <FileText className="w-5 h-5 text-pink-400" />
                              <h3 className="text-xl font-semibold text-white">{doc.title}</h3>
                              <Badge variant="outline" className="border-pink-500/30 text-pink-400">
                                {doc.category}
                              </Badge>
                            </div>
                            <p className="text-gray-400 mb-4">{doc.description}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center text-gray-500">
                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                <span>{doc.stars}</span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                <span>{doc.comments}</span>
                              </div>
                            </div>
                          </div>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-pink-400 hover:text-pink-300"
                          >
                            <span className="mr-1">View</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No documentation found</h3>
                    <p className="text-gray-400">Try adjusting your search or category filter</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tutorials" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {tutorials.map((tutorial) => (
                    <Card
                      key={tutorial.id}
                      className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{tutorial.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-4">{tutorial.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge
                              className={
                                tutorial.difficulty === "Beginner"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : tutorial.difficulty === "Intermediate"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {tutorial.difficulty}
                            </Badge>
                            <span className="text-sm text-gray-500">{tutorial.duration}</span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                          >
                            Start Tutorial
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="examples" className="mt-6">
                <Card className="bg-gray-900/50 border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-pink-400">Code Examples</CardTitle>
                    <CardDescription className="text-gray-400">
                      Ready-to-use code snippets for Polkadot development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-pink-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-white">Connect to Polkadot with Talisman</h3>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
                          >
                            Copy Code
                          </Button>
                        </div>
                        <pre className="bg-gray-900/50 p-4 rounded-md overflow-x-auto text-sm text-gray-300">
                          <code>{`// Connect to Talisman wallet
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

async function connectWallet() {
  // Enable the extension
  const extensions = await web3Enable('PolkaForge');
  
  if (extensions.length === 0) {
    console.error('No extension found');
    return;
  }
  
  // Get all accounts
  const allAccounts = await web3Accounts();
  
  if (allAccounts.length > 0) {
    const account = allAccounts[0];
    console.log('Connected account:', account.address);
    return account;
  }
}`}</code>
                        </pre>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-pink-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-white">Mint NFT on Asset Hub</h3>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
                          >
                            Copy Code
                          </Button>
                        </div>
                        <pre className="bg-gray-900/50 p-4 rounded-md overflow-x-auto text-sm text-gray-300">
                          <code>{`// Mint NFT on Asset Hub
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

async function mintNFT(metadata, owner) {
  // Connect to Asset Hub
  const wsProvider = new WsProvider('wss://statemint-rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  
  // Setup account
  const keyring = new Keyring({ type: 'sr25519' });
  const account = keyring.addFromUri('//Alice');
  
  // Create collection
  const collectionId = 1;
  const itemId = 1;
  
  // Mint NFT
  const tx = api.tx.uniques.mint(collectionId, itemId, owner);
  const hash = await tx.signAndSend(account);
  
  console.log('NFT minted with hash:', hash.toHex());
  return hash.toHex();
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
