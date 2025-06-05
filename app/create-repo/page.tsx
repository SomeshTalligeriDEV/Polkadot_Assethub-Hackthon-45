"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Wallet, Coins, FileCode, Palette, CheckCircle, Loader2, Bot, Shield, Network } from "lucide-react"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"

export default function CreateRepoPage() {
  const [repoName, setRepoName] = useState("")
  const [repoDescription, setRepoDescription] = useState("")
  const [repoVisibility, setRepoVisibility] = useState("public")
  const [repoLanguage, setRepoLanguage] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isNftMinted, setIsNftMinted] = useState(false)
  const [nftIpfsHash, setNftIpfsHash] = useState("")
  const [activeTab, setActiveTab] = useState("details")
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const connectWallet = () => {
    setIsWalletConnected(true)
  }

  const handleCreateRepo = async () => {
    if (!repoName) return

    setActiveTab("upload")
    // Simulate file upload
    setIsUploading(true)

    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setActiveTab("nft")

        // Simulate NFT minting after 2 seconds
        setTimeout(() => {
          setIsNftMinted(true)
          setNftIpfsHash("QmXs7LhKnHuRQhgfgkDCNnSUXz8Xy5ZXorn6PcMMCQjTGr")
        }, 2000)
      }
    }, 200)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black"></div>
      </div>

      <NavBar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent">
            Create New Repository
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-pink-400">Repository Details</CardTitle>
                <CardDescription className="text-gray-400">
                  Create a new blockchain-powered repository with automatic NFT generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-pink-500/20">
                    <TabsTrigger
                      value="details"
                      className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                    >
                      1. Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="upload"
                      className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                      disabled={!repoName}
                    >
                      2. Upload Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="nft"
                      className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                      disabled={!files.length}
                    >
                      3. Mint NFT
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="repo-name">Repository Name</Label>
                      <Input
                        id="repo-name"
                        placeholder="my-awesome-project"
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 focus:border-pink-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="repo-description">Description</Label>
                      <Textarea
                        id="repo-description"
                        placeholder="Describe your project..."
                        value={repoDescription}
                        onChange={(e) => setRepoDescription(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 focus:border-pink-500 min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="repo-visibility">Visibility</Label>
                        <Select value={repoVisibility} onValueChange={setRepoVisibility}>
                          <SelectTrigger className="bg-gray-800/50 border-gray-700">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="repo-language">Primary Language</Label>
                        <Select value={repoLanguage} onValueChange={setRepoLanguage}>
                          <SelectTrigger className="bg-gray-800/50 border-gray-700">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="rust">Rust</SelectItem>
                            <SelectItem value="solidity">Solidity</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={() => setActiveTab("upload")}
                        disabled={!repoName}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        Continue to Upload
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4 mt-4">
                    <div className="border-2 border-dashed border-pink-500/20 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Upload className="w-12 h-12 text-pink-400" />
                        <div>
                          <h3 className="text-lg font-medium text-white">Drag and drop files</h3>
                          <p className="text-sm text-gray-400">or click to browse</p>
                        </div>
                        <Input type="file" multiple onChange={handleFileChange} className="hidden" id="file-upload" />
                        <Label
                          htmlFor="file-upload"
                          className="bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 px-4 py-2 rounded-md cursor-pointer"
                        >
                          Select Files
                        </Label>
                      </div>
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-300">Selected Files ({files.length})</h3>
                        <div className="max-h-40 overflow-y-auto bg-gray-800/50 rounded-md p-2">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 py-1">
                              <FileCode className="w-4 h-4 text-pink-400" />
                              <span className="text-sm text-gray-300">{file.name}</span>
                              <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("details")}
                        className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleCreateRepo}
                        disabled={!files.length || isUploading}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading ({uploadProgress}%)
                          </>
                        ) : (
                          "Upload & Continue"
                        )}
                      </Button>
                    </div>

                    {isUploading && (
                      <div className="w-full bg-gray-800 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="nft" className="space-y-4 mt-4">
                    <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        {isNftMinted ? (
                          <>
                            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                              <Palette className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white">NFT Successfully Minted!</h3>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Stored on IPFS via Pinata
                            </Badge>
                            <div className="bg-gray-900/50 p-3 rounded-md">
                              <p className="text-sm text-gray-400">IPFS Hash:</p>
                              <p className="text-pink-400 font-mono">{nftIpfsHash}</p>
                            </div>
                            <Link href="/dashboard">
                              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                                View in Dashboard
                              </Button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <div className="w-24 h-24 bg-gray-900/50 rounded-lg flex items-center justify-center mb-4">
                              <Loader2 className="w-12 h-12 text-pink-400 animate-spin" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Minting NFT...</h3>
                            <p className="text-gray-400">Your code is being processed and stored on IPFS via Pinata</p>
                          </>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {!isWalletConnected ? (
              <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400">Connect Wallet</CardTitle>
                  <CardDescription className="text-gray-400">Connect your Talisman wallet to mint NFTs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={connectWallet}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Talisman
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-pink-400">Wallet Connected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Address</span>
                    <span className="text-sm text-white">5Grw...utQY</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Balance</span>
                    <div className="flex items-center">
                      <Coins className="w-4 h-4 text-pink-400 mr-1" />
                      <span className="text-pink-400 font-semibold">125.42 DOT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-pink-400">NFT Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mt-0.5">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Ownership Proof</h4>
                    <p className="text-sm text-gray-400">Verifiable on-chain proof of code ownership</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mt-0.5">
                    <Coins className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Earn DOT</h4>
                    <p className="text-sm text-gray-400">Monetize your code through NFT royalties</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mt-0.5">
                    <Network className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Cross-Chain</h4>
                    <p className="text-sm text-gray-400">Access your NFTs across the Polkadot ecosystem</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-pink-400">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-pink-500/30 text-pink-400 hover:bg-pink-500/10">
                  <Bot className="w-4 h-4 mr-2" />
                  Ask AI Assistant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
