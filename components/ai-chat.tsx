"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, Send, Code, Coins, Zap } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  actions?: Array<{
    type: "transfer" | "code" | "nft"
    label: string
    data?: any
  }>
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your PolkaForge AI assistant. I can help you debug code, transfer DOT tokens, generate NFTs, and find job opportunities. What would you like to do?",
      timestamp: new Date(),
      actions: [
        { type: "code", label: "Debug Code" },
        { type: "transfer", label: "Transfer DOT" },
        { type: "nft", label: "Mint NFT" },
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(input),
        timestamp: new Date(),
        actions: getBotActions(input),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("debug") || input.includes("error") || input.includes("code")) {
      return "I can help you debug that code! Please share your code snippet and I'll analyze it for potential issues, suggest optimizations, and provide fixes."
    }

    if (input.includes("transfer") || input.includes("dot") || input.includes("send")) {
      return "I can help you transfer DOT tokens! Please specify the recipient address and amount. I'll prepare the transaction for you to sign with your Talisman wallet."
    }

    if (input.includes("nft") || input.includes("mint")) {
      return "Great! I can help you mint an NFT for your code. Your latest commits can be automatically converted into unique NFTs on Polkadot Asset Hub. Would you like me to start the minting process?"
    }

    if (input.includes("job") || input.includes("work")) {
      return "I found several job opportunities that match your skills! Based on your repository activity, here are some relevant positions with DOT rewards."
    }

    return "I understand you need help with that. Could you be more specific about what you'd like to do? I can assist with code debugging, DOT transfers, NFT minting, or finding job opportunities."
  }

  const getBotActions = (userInput: string) => {
    const input = userInput.toLowerCase()

    if (input.includes("debug") || input.includes("code")) {
      return [
        { type: "code", label: "Analyze Code", data: { action: "analyze" } },
        { type: "code", label: "Fix Issues", data: { action: "fix" } },
      ]
    }

    if (input.includes("transfer") || input.includes("dot")) {
      return [
        { type: "transfer", label: "Send 10 DOT", data: { amount: 10 } },
        { type: "transfer", label: "Send 50 DOT", data: { amount: 50 } },
        { type: "transfer", label: "Custom Amount", data: { amount: "custom" } },
      ]
    }

    if (input.includes("nft")) {
      return [
        { type: "nft", label: "Mint from Latest Commit", data: { source: "latest" } },
        { type: "nft", label: "Mint from Repository", data: { source: "repo" } },
      ]
    }

    return []
  }

  const handleAction = (action: any) => {
    const actionMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content: `Executing ${action.label}... This would normally trigger the ${action.type} functionality.`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, actionMessage])
  }

  return (
    <Card className="bg-gray-900/50 border-pink-500/20 h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-pink-400 flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          PolkaForge AI Assistant
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`flex items-start space-x-2 ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user" ? "bg-gray-700" : "bg-gradient-to-r from-pink-500 to-purple-600"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user" ? "bg-pink-500/20 text-white" : "bg-gray-800/50 text-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction(action)}
                            className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10"
                          >
                            {action.type === "code" && <Code className="w-3 h-3 mr-1" />}
                            {action.type === "transfer" && <Coins className="w-3 h-3 mr-1" />}
                            {action.type === "nft" && <Zap className="w-3 h-3 mr-1" />}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${message.type === "user" ? "text-right" : "text-left"}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me to debug code, transfer DOT, mint NFTs..."
            className="bg-gray-800/50 border-pink-500/20 text-white placeholder-gray-400"
          />
          <Button
            onClick={sendMessage}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
