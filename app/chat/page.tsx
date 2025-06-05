"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, Code, Coins, Copy, CheckCircle, Palette, MessageSquare } from "lucide-react"
import { NavBar } from "@/components/nav-bar"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
  codeBlock?: string
  action?: "transfer" | "debug" | "optimize" | "nft"
  metadata?: any
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    content:
      "Hello! I'm your PolkaForge AI assistant. I can help you with:\n\n• Debug and optimize your code\n• Transfer DOT tokens securely\n• Generate NFTs for your repositories\n• Find relevant job opportunities\n• Explain Polkadot concepts\n\nWhat would you like to work on today?",
    timestamp: new Date(),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()

    if (input.includes("transfer") || input.includes("send") || input.includes("dot")) {
      return {
        id: messages.length + 2,
        type: "bot",
        content: "I can help you transfer DOT tokens! Here's a secure transfer function using Polkadot JS API:",
        timestamp: new Date(),
        action: "transfer",
        codeBlock: `// Secure DOT Transfer Function
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';

async function transferDOT(recipientAddress: string, amount: string, senderAddress: string) {
  try {
    // Connect to Polkadot network
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    
    // Get the sender's injector
    const injector = await web3FromAddress(senderAddress);
    
    // Create transfer transaction
    const transfer = api.tx.balances.transfer(recipientAddress, amount);
    
    // Sign and send transaction
    const hash = await transfer.signAndSend(senderAddress, { signer: injector.signer });
    
    console.log('Transfer hash:', hash.toString());
    return hash.toString();
  } catch (error) {
    console.error('Transfer failed:', error);
    throw error;
  }
}

// Usage example:
// transferDOT('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', '1000000000000', yourAddress);`,
        metadata: { amount: "10 DOT", recipient: "5Grw...utQY" },
      }
    }

    if (input.includes("debug") || input.includes("error") || input.includes("fix")) {
      return {
        id: messages.length + 2,
        type: "bot",
        content: "I'll help you debug your code! Here's an optimized Substrate pallet with error handling:",
        timestamp: new Date(),
        action: "debug",
        codeBlock: `// Debugged Substrate Pallet
#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
    decl_module, decl_storage, decl_event, decl_error,
    traits::{Get, Randomness},
    dispatch::{DispatchResult, DispatchError},
};
use frame_system::ensure_signed;
use sp_std::vec::Vec;

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
    type Randomness: Randomness<Self::Hash>;
}

decl_storage! {
    trait Store for Module<T: Config> as MyPallet {
        /// Storage for user data with proper error handling
        UserData get(fn user_data): 
            map hasher(blake2_128_concat) T::AccountId => Option<Vec<u8>>;
    }
}

decl_event!(
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        /// Data stored successfully [who, data_hash]
        DataStored(AccountId, T::Hash),
    }
);

decl_error! {
    pub enum Error for Module<T: Config> {
        /// Data is too large
        DataTooLarge,
        /// Data already exists
        DataAlreadyExists,
        /// Invalid data format
        InvalidData,
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        type Error = Error<T>;
        fn deposit_event() = default;
        
        /// Store data with proper validation
        #[weight = 10_000]
        pub fn store_data(
            origin,
            data: Vec<u8>
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            
            // Validate data size
            ensure!(data.len() <= 1024, Error::<T>::DataTooLarge);
            
            // Check if data already exists
            ensure!(!UserData::<T>::contains_key(&who), Error::<T>::DataAlreadyExists);
            
            // Validate data is not empty
            ensure!(!data.is_empty(), Error::<T>::InvalidData);
            
            // Store the data
            UserData::<T>::insert(&who, &data);
            
            // Generate hash for event
            let data_hash = T::Randomness::random_seed();
            
            // Emit event
            Self::deposit_event(RawEvent::DataStored(who, data_hash));
            
            Ok(())
        }
    }
}`,
      }
    }

    if (input.includes("nft") || input.includes("mint")) {
      return {
        id: messages.length + 2,
        type: "bot",
        content: "Great! I can help you mint an NFT for your code. Here's how to mint NFTs on Polkadot Asset Hub:",
        timestamp: new Date(),
        action: "nft",
        codeBlock: `// NFT Minting on Asset Hub
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';

async function mintCodeNFT(
  codeHash: string,
  metadata: any,
  ownerAddress: string
) {
  try {
    // Connect to Asset Hub
    const wsProvider = new WsProvider('wss://statemint-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    
    // Get injector for signing
    const injector = await web3FromAddress(ownerAddress);
    
    // Collection ID for code NFTs
    const collectionId = 1;
    
    // Generate unique item ID based on code hash
    const itemId = parseInt(codeHash.slice(0, 8), 16);
    
    // Prepare metadata
    const nftMetadata = {
      name: metadata.repoName,
      description: metadata.description,
      image: \`ipfs://\${metadata.ipfsHash}\`,
      attributes: [
        { trait_type: "Language", value: metadata.language },
        { trait_type: "Lines of Code", value: metadata.loc },
        { trait_type: "Created", value: new Date().toISOString() }
      ]
    };
    
    // Upload metadata to IPFS (Pinata)
    const metadataHash = await uploadToPinata(nftMetadata);
    
    // Mint NFT
    const mintTx = api.tx.uniques.mint(
      collectionId,
      itemId,
      ownerAddress
    );
    
    // Set metadata
    const setMetadataTx = api.tx.uniques.setMetadata(
      collectionId,
      itemId,
      \`ipfs://\${metadataHash}\`,
      false
    );
    
    // Batch transactions
    const batchTx = api.tx.utility.batch([mintTx, setMetadataTx]);
    
    // Sign and send
    const hash = await batchTx.signAndSend(ownerAddress, { signer: injector.signer });
    
    console.log('NFT minted with hash:', hash.toString());
    return { hash: hash.toString(), itemId, metadataHash };
    
  } catch (error) {
    console.error('NFT minting failed:', error);
    throw error;
  }
}

async function uploadToPinata(metadata: any): Promise<string> {
  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${process.env.PINATA_JWT}\`
    },
    body: JSON.stringify(metadata)
  });
  
  const result = await response.json();
  return result.IpfsHash;
}`,
        metadata: { ipfsHash: "QmXs7LhKnHuRQhgfgkDCNnSUXz8Xy5ZXorn6PcMMCQjTGr" },
      }
    }

    if (input.includes("optimize") || input.includes("gas") || input.includes("performance")) {
      return {
        id: messages.length + 2,
        type: "bot",
        content: "Here's an optimized smart contract with gas efficiency improvements:",
        timestamp: new Date(),
        action: "optimize",
        codeBlock: `// Gas-Optimized Smart Contract
pragma solidity ^0.8.19;

contract OptimizedContract {
    // Use packed structs to save storage slots
    struct UserData {
        uint128 balance;      // 16 bytes
        uint64 lastUpdate;    // 8 bytes
        uint32 level;         // 4 bytes
        uint32 score;         // 4 bytes
        // Total: 32 bytes (1 storage slot)
    }
    
    mapping(address => UserData) private userData;
    
    // Use events for data that doesn't need on-chain storage
    event UserAction(address indexed user, uint256 action, uint256 value);
    
    // Batch operations to reduce gas costs
    function batchUpdateUsers(
        address[] calldata users,
        uint128[] calldata balances
    ) external {
        require(users.length == balances.length, "Array length mismatch");
        
        uint256 length = users.length;
        for (uint256 i; i < length;) {
            userData[users[i]].balance = balances[i];
            userData[users[i]].lastUpdate = uint64(block.timestamp);
            
            unchecked { ++i; }
        }
    }
    
    // Use unchecked for safe arithmetic to save gas
    function transfer(address to, uint128 amount) external {
        UserData storage sender = userData[msg.sender];
        require(sender.balance >= amount, "Insufficient balance");
        
        unchecked {
            sender.balance -= amount;
            userData[to].balance += amount;
        }
        
        emit UserAction(msg.sender, 1, amount);
    }
    
    // Pack multiple boolean flags into a single uint256
    uint256 private flags;
    
    function setFlag(uint8 flagIndex, bool value) external {
        if (value) {
            flags |= (1 << flagIndex);
        } else {
            flags &= ~(1 << flagIndex);
        }
    }
    
    function getFlag(uint8 flagIndex) external view returns (bool) {
        return (flags >> flagIndex) & 1 == 1;
    }
}`,
      }
    }

    if (input.includes("xcm") || input.includes("cross-chain")) {
      return {
        id: messages.length + 2,
        type: "bot",
        content: "Here's how to implement XCM (Cross-Consensus Message) transfers between parachains:",
        timestamp: new Date(),
        action: "debug",
        codeBlock: `// XCM Cross-Chain Transfer Implementation
use xcm::latest::{
    Junction, Junctions, MultiAsset, MultiAssets, MultiLocation,
    WeightLimit, Xcm, XcmContext,
};
use xcm_executor::traits::WeightBounds;

// Transfer assets from current parachain to another parachain
pub fn transfer_to_parachain(
    dest_para_id: u32,
    beneficiary: AccountId,
    amount: Balance,
) -> Result<(), XcmError> {
    // Define destination parachain
    let dest = MultiLocation {
        parents: 1,
        interior: Junctions::X1(Junction::Parachain(dest_para_id)),
    };
    
    // Define beneficiary account on destination
    let beneficiary_location = MultiLocation {
        parents: 0,
        interior: Junctions::X1(Junction::AccountId32 {
            network: NetworkId::Any,
            id: beneficiary.into(),
        }),
    };
    
    // Define the asset to transfer
    let asset = MultiAsset {
        id: AssetId::Concrete(MultiLocation::here()),
        fun: Fungibility::Fungible(amount),
    };
    
    // Create XCM message
    let xcm = Xcm(vec![
        // Withdraw asset from origin
        WithdrawAsset(asset.clone().into()),
        
        // Clear origin to prevent issues
        ClearOrigin,
        
        // Buy execution on destination
        BuyExecution {
            fees: asset.clone(),
            weight_limit: WeightLimit::Limited(1_000_000_000),
        },
        
        // Deposit asset to beneficiary
        DepositAsset {
            assets: Wild(All),
            max_assets: 1,
            beneficiary: beneficiary_location,
        },
    ]);
    
    // Send XCM message
    pallet_xcm::Pallet::<T>::send_xcm(Here, dest, xcm)
        .map_err(|_| XcmError::SendFailure)?;
    
    Ok(())
}

// Reserve-based transfer (for trusted parachains)
pub fn reserve_transfer_assets(
    dest: MultiLocation,
    beneficiary: MultiLocation,
    assets: MultiAssets,
) -> Result<(), XcmError> {
    let xcm = Xcm(vec![
        // Transfer reserve asset
        TransferReserveAsset {
            assets,
            dest,
            xcm: Xcm(vec![
                BuyExecution {
                    fees: MultiAsset::from((Concrete(MultiLocation::here()), 1_000_000_000u128)),
                    weight_limit: WeightLimit::Limited(1_000_000_000),
                },
                DepositAsset {
                    assets: Wild(All),
                    max_assets: 1,
                    beneficiary,
                },
            ]),
        },
    ]);
    
    pallet_xcm::Pallet::<T>::execute_xcm(Here, xcm, 1_000_000_000)
        .map_err(|_| XcmError::ExecutionFailed)?;
    
    Ok(())
}`,
      }
    }

    return {
      id: messages.length + 2,
      type: "bot",
      content:
        "I understand you need help with that. I can assist with:\n\n• **Code Debugging**: Share your code and I'll help fix issues\n• **DOT Transfers**: Secure token transfers using Polkadot JS API\n• **NFT Minting**: Generate NFTs for your code repositories\n• **XCM Integration**: Cross-chain messaging between parachains\n• **Gas Optimization**: Improve smart contract efficiency\n• **Polkadot Concepts**: Explain parachains, validators, nominators\n\nWhat specific challenge are you facing?",
      timestamp: new Date(),
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const quickActions = [
    { label: "Debug Code", prompt: "Help me debug this smart contract error" },
    { label: "Transfer DOT", prompt: "Transfer 10 DOT to another address" },
    { label: "Mint NFT", prompt: "Generate an NFT for my latest repository" },
    { label: "Optimize Gas", prompt: "Optimize my contract for gas efficiency" },
    { label: "XCM Transfer", prompt: "How do I transfer assets between parachains?" },
    { label: "Polkadot Docs", prompt: "Explain Polkadot's consensus mechanism" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black"></div>
      </div>

      <NavBar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent mb-2">
            AI Code Assistant
          </h1>
          <p className="text-gray-400">Your intelligent companion for Polkadot development</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-3">
            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm h-[700px] flex flex-col">
              <CardHeader className="border-b border-pink-500/20">
                <CardTitle className="flex items-center space-x-2 text-pink-400">
                  <Bot className="w-5 h-5" />
                  <span>PolkaForge AI Assistant</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex space-x-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user" ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gray-700"
                        }`}
                      >
                        {message.type === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-pink-400" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-4 ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                            : "bg-gray-800/50 text-gray-100"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>

                        {message.codeBlock && (
                          <div className="mt-4 bg-black/50 rounded-lg border border-pink-500/20 overflow-hidden">
                            <div className="flex items-center justify-between p-3 border-b border-pink-500/20">
                              <div className="flex items-center space-x-2">
                                <Code className="w-4 h-4 text-pink-400" />
                                <span className="text-sm text-pink-400 font-semibold">
                                  {message.action === "transfer"
                                    ? "DOT Transfer Code"
                                    : message.action === "debug"
                                      ? "Debugged Code"
                                      : message.action === "optimize"
                                        ? "Optimized Code"
                                        : message.action === "nft"
                                          ? "NFT Minting Code"
                                          : "Code Example"}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(message.codeBlock!)}
                                className="text-gray-400 hover:text-pink-400"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                              <code>{message.codeBlock}</code>
                            </pre>
                          </div>
                        )}

                        {message.metadata && (
                          <div className="mt-3 p-3 bg-gray-900/50 rounded-md border border-pink-500/20">
                            <div className="text-xs text-gray-400 mb-1">Metadata:</div>
                            {message.action === "transfer" && (
                              <div className="text-sm">
                                <span className="text-pink-400">Amount:</span> {message.metadata.amount}
                                <br />
                                <span className="text-pink-400">Recipient:</span> {message.metadata.recipient}
                              </div>
                            )}
                            {message.action === "nft" && (
                              <div className="text-sm">
                                <span className="text-pink-400">IPFS Hash:</span> {message.metadata.ipfsHash}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="text-xs text-gray-400 mt-3">{message.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-pink-400" />
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="border-t border-pink-500/20 p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me about code debugging, DOT transfers, NFT minting, or Polkadot development..."
                    className="flex-1 bg-gray-800 border-gray-700 focus:border-pink-500"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-pink-400">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-pink-500/30 text-pink-400 hover:bg-pink-500/10 text-xs"
                    onClick={() => setInputValue(action.prompt)}
                  >
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-pink-400">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mt-0.5">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Code Analysis</h4>
                    <p className="text-xs text-gray-400">Debug, optimize, and review your code</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mt-0.5">
                    <Coins className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">DOT Operations</h4>
                    <p className="text-xs text-gray-400">Secure token transfers and staking</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mt-0.5">
                    <Palette className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">NFT Creation</h4>
                    <p className="text-xs text-gray-400">Generate and manage code NFTs</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mt-0.5">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Polkadot Expert</h4>
                    <p className="text-xs text-gray-400">XCM, parachains, and ecosystem guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
