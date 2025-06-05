"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Briefcase,
  Clock,
  Coins,
  User,
  CheckCircle,
  Plus,
  Calendar,
  FileText,
  Loader2,
} from "lucide-react"
import { NavBar } from "@/components/nav-bar"

const jobs = [
  {
    id: 1,
    title: "Smart Contract Auditor",
    company: "DeFi Protocol",
    description:
      "We're looking for an experienced smart contract auditor to review our DeFi protocol before mainnet launch. Must have experience with Solidity and security best practices.",
    location: "Remote",
    type: "Contract",
    reward: 500,
    deadline: "2 weeks",
    skills: ["Solidity", "Security", "DeFi"],
    applicants: 12,
  },
  {
    id: 2,
    title: "Substrate Developer",
    company: "ParaChain Labs",
    description:
      "Join our team to build custom pallets for our Substrate-based parachain. Experience with Rust and Substrate framework required.",
    location: "Remote",
    type: "Full-time",
    reward: 750,
    deadline: "1 month",
    skills: ["Rust", "Substrate", "Blockchain"],
    applicants: 8,
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "PolkaDEX",
    description:
      "Build modern, responsive UI for our decentralized exchange. Experience with React, TypeScript and Web3 libraries needed.",
    location: "Remote",
    type: "Part-time",
    reward: 300,
    deadline: "3 weeks",
    skills: ["React", "TypeScript", "Web3.js"],
    applicants: 24,
  },
  {
    id: 4,
    title: "XCM Integration Specialist",
    company: "Bridge Protocol",
    description:
      "Help us implement cross-chain messaging between Polkadot parachains. Deep understanding of XCM format and XCMP required.",
    location: "Remote",
    type: "Contract",
    reward: 1200,
    deadline: "1 month",
    skills: ["XCM", "Polkadot", "Rust"],
    applicants: 5,
  },
  {
    id: 5,
    title: "Technical Writer",
    company: "Polkadot Foundation",
    description:
      "Create comprehensive documentation for Polkadot developers. Strong technical writing skills and blockchain knowledge required.",
    location: "Remote",
    type: "Part-time",
    reward: 250,
    deadline: "Ongoing",
    skills: ["Technical Writing", "Documentation", "Blockchain"],
    applicants: 18,
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [isPostingJob, setIsPostingJob] = useState(false)
  const [jobPosted, setJobPosted] = useState(false)

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleApply = () => {
    setIsApplying(true)
    // Simulate application process
    setTimeout(() => {
      setIsApplying(false)
      setApplicationSubmitted(true)
    }, 2000)
  }

  const handlePostJob = () => {
    setIsPostingJob(true)
    // Simulate job posting
    setTimeout(() => {
      setIsPostingJob(false)
      setJobPosted(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black"></div>
      </div>

      <NavBar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-white bg-clip-text text-transparent mb-2">
              Blockchain Jobs
            </h1>
            <p className="text-gray-400">Find opportunities and earn DOT by contributing to projects</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-pink-500/20 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-pink-400">Post a New Job</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a job listing and set DOT rewards for completion
                </DialogDescription>
              </DialogHeader>

              {jobPosted ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Job Posted Successfully!</h3>
                  <p className="text-gray-400 mb-6">
                    Your job listing is now live and visible to all developers on PolkaForge
                  </p>
                  <Button
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    onClick={() => setJobPosted(false)}
                  >
                    Post Another Job
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input
                      id="job-title"
                      placeholder="e.g. Substrate Developer"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Project Name</Label>
                    <Input id="company" placeholder="e.g. ParaChain Labs" className="bg-gray-800 border-gray-700" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-description">Job Description</Label>
                    <Textarea
                      id="job-description"
                      placeholder="Describe the job requirements and responsibilities..."
                      className="bg-gray-800 border-gray-700 min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-type">Job Type</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g. Remote" className="bg-gray-800 border-gray-700" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reward">DOT Reward</Label>
                      <Input id="reward" type="number" placeholder="500" className="bg-gray-800 border-gray-700" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select deadline" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="1-week">1 week</SelectItem>
                          <SelectItem value="2-weeks">2 weeks</SelectItem>
                          <SelectItem value="1-month">1 month</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills (comma separated)</Label>
                    <Input
                      id="skills"
                      placeholder="e.g. Rust, Substrate, Polkadot"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      onClick={handlePostJob}
                      disabled={isPostingJob}
                    >
                      {isPostingJob ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Posting Job...
                        </>
                      ) : (
                        "Post Job & Lock DOT Reward"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-pink-500/20"
                />
              </div>
              <Button variant="outline" className="border-pink-500/30 text-pink-400 hover:bg-pink-500/10">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <Badge variant="outline" className="border-pink-500/30 text-pink-400">
                            {job.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-gray-400 mb-4">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span>{job.company}</span>
                          <span className="mx-2">•</span>
                          <span>{job.location}</span>
                        </div>
                        <p className="text-gray-300 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4 text-pink-400" />
                            <span className="text-pink-400 font-semibold">{job.reward} DOT</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.deadline}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{job.applicants} applicants</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button
                          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-pink-400">Job Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Jobs</span>
                  <span className="text-xl font-bold text-white">{jobs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total DOT Rewards</span>
                  <span className="text-xl font-bold text-pink-400">
                    {jobs.reduce((sum, job) => sum + job.reward, 0)} DOT
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Your Applications</span>
                  <span className="text-xl font-bold text-white">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Completed Jobs</span>
                  <span className="text-xl font-bold text-white">0</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-pink-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-pink-400">Top Skills in Demand</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Rust</span>
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Substrate</span>
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full w-[75%]"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Solidity</span>
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full w-[65%]"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">React</span>
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full w-[60%]"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">XCM</span>
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full w-[50%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Job Details Dialog */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="bg-gray-900 border-pink-500/20 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-pink-400 text-2xl">{selectedJob.title}</DialogTitle>
              <DialogDescription className="text-gray-400 flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                {selectedJob.company}
                <span className="mx-2">•</span>
                {selectedJob.location}
              </DialogDescription>
            </DialogHeader>

            {applicationSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                <p className="text-gray-400 mb-6">
                  Your application has been sent to {selectedJob.company}. You'll be notified if you're selected.
                </p>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => {
                    setApplicationSubmitted(false)
                    setSelectedJob(null)
                  }}
                >
                  Browse More Jobs
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">Job Description</h3>
                  <p className="text-gray-300">{selectedJob.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-white">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill: string, index: number) => (
                      <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Coins className="w-5 h-5 text-pink-400" />
                      <h3 className="text-lg font-medium text-white">Reward</h3>
                    </div>
                    <p className="text-2xl font-bold text-pink-400">{selectedJob.reward} DOT</p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5 text-pink-400" />
                      <h3 className="text-lg font-medium text-white">Deadline</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedJob.deadline}</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-5 h-5 text-pink-400" />
                    <h3 className="text-lg font-medium text-white">Apply for this Position</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cover-letter">Cover Letter</Label>
                      <Textarea
                        id="cover-letter"
                        placeholder="Explain why you're a good fit for this position..."
                        className="bg-gray-800 border-gray-700 min-h-[120px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio/GitHub Link</Label>
                      <Input
                        id="portfolio"
                        placeholder="https://github.com/yourusername"
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      onClick={handleApply}
                      disabled={isApplying}
                    >
                      {isApplying ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
