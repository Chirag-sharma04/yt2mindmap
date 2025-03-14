import { Brain, Zap, Network, Edit3, Save, RefreshCw, BookOpen, Target, ArrowRight, Lightbulb, Users, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Features</h1>
          <p className="text-xl text-slate-700 mb-8">
            Discover how MindMapAI transforms your learning experience with powerful AI-driven tools designed for every step of your journey.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700">Try It Now</Button>
            <Button variant="outline" asChild className="border-purple-600 text-purple-600 hover:bg-purple-50">
              <a href="#journey-features">View All Features</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Core Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Mind Mapping",
                description: "Automatically generate structured mind maps from any YouTube video, extracting key concepts and relationships.",
                icon: <Brain className="h-10 w-10 text-purple-600" />
              },
              {
                title: "Real-Time Editing",
                description: "Refine and customize your mind maps while watching, adding personal insights and connections.",
                icon: <Edit3 className="h-10 w-10 text-purple-600" />
              },
              {
                title: "Knowledge Library",
                description: "Build a personal library of mind maps, organized by topic, for easy reference and review.",
                icon: <BookOpen className="h-10 w-10 text-purple-600" />
              },
              {
                title: "Concept Connections",
                description: "Discover relationships between ideas across different videos and topics in your library.",
                icon: <Network className="h-10 w-10 text-purple-600" />
              },
              {
                title: "Learning Analytics",
                description: "Track your learning progress and identify knowledge gaps with personalized insights.",
                icon: <Target className="h-10 w-10 text-purple-600" />
              },
              {
                title: "Collaborative Learning",
                description: "Share mind maps with friends or colleagues and collaborate on expanding knowledge together.",
                icon: <Users className="h-10 w-10 text-purple-600" />
              }
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center p-8">
                  <div className="mb-6 bg-purple-100 p-4 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Features */}
      <section id="journey-features" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Features for Every Step of Your Journey
            </h2>
            <p className="text-lg text-slate-700">
              Our tools are designed to support you through each phase of the 12-step learning transformation.
            </p>
          </div>

          <Tabs defaultValue="beginning" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="beginning">Beginning (Steps 1-4)</TabsTrigger>
              <TabsTrigger value="middle">Middle (Steps 5-8)</TabsTrigger>
              <TabsTrigger value="end">End (Steps 9-12)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="beginning" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recognition & Awareness Tools</CardTitle>
                  <CardDescription>Features that help you identify inefficient learning patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Learning Time Tracker</h3>
                        <p className="text-slate-600">Visualize how much time you spend watching vs. actively learning</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Retention Analysis</h3>
                        <p className="text-slate-600">Quick quizzes that measure how much you recall from watched content</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Lightbulb className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Insight Prompts</h3>
                        <p className="text-slate-600">Guided reflection questions that help you process what you're learning</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Learning Community</h3>
                        <p className="text-slate-600">Connect with others on similar learning journeys for motivation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="middle" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Transformation & Practice Tools</CardTitle>
                  <CardDescription>Features that help you develop new learning habits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Brain className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">AI Mind Map Generator</h3>
                        <p className="text-slate-600">Create structured visual representations of video content</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Edit3 className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Interactive Editor</h3>
                        <p className="text-slate-600">Customize and expand mind maps with your own insights</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <RefreshCw className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Habit Tracker</h3>
                        <p className="text-slate-600">Monitor your consistency in active learning practices</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Zap className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Challenge System</h3>
                        <p className="text-slate-600">Progressive learning challenges that build your skills</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="end" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Mastery & Integration Tools</CardTitle>
                  <CardDescription>Features that help you solidify and share your knowledge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Network className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Knowledge Graph</h3>
                        <p className="text-slate-600">Visualize connections between concepts across your entire library</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Save className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Export & Integration</h3>
                        <p className="text-slate-600">Share your mind maps with other learning tools and platforms</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Teaching Tools</h3>
                        <p className="text-slate-600">Transform your mind maps into teaching materials to share knowledge</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">Mastery Analytics</h3>
                        <p className="text-slate-600">Advanced insights into your learning patterns and knowledge growth</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">See It In Action</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Transform Any Video Into a Mind Map</h3>
              <p className="text-slate-700 mb-6">
                Simply paste a YouTube URL and watch as our AI analyzes the content, identifies key concepts, 
                and generates a structured mind map in real-time.
              </p>
              
              <div className="space-y-4">
                {[
                  "Automatic extraction of main topics and subtopics",
                  "Identification of relationships between concepts",
                  "Timestamp linking for easy reference back to the video",
                  "Customizable organization and styling options"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 text-purple-600">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              
              <Button className="mt-8 bg-purple-600 hover:bg-purple-700">Try It Now</Button>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="bg-slate-100 rounded-xl p-6 shadow-md">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="ml-2 text-sm text-slate-500">YouTube URL</div>
                  </div>
                  <div className="relative bg-slate-50 rounded border border-slate-200 p-2 flex items-center">
                    <input 
                      type="text" 
                      placeholder="https://youtube.com/watch?v=..." 
                      className="w-full bg-transparent border-none outline-none text-sm text-slate-700"
                      readOnly
                    />
                    <Button size="sm" className="absolute right-1 bg-purple-600 hover:bg-purple-700 text-xs py-1">
                      Generate
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-medium">Generated Mind Map</div>
                    <div className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">Processing...</div>
                  </div>
                  <div className="relative h-64 border border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center animate-pulse">
                          <span className="text-purple-600 font-medium text-sm">Main Topic</span>
                        </div>
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div key={i} 
                            className="absolute bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center animate-pulse"
                            style={{ 
                              top: `${50 + 40 * Math.sin(i * Math.PI * 2 / 5)}%`, 
                              left: `${50 + 40 * Math.cos(i * Math.PI * 2 / 5)}%`,
                              transform: 'translate(-50%, -50%)',
                              animationDelay: `${i * 0.2}s`
                            }}>
                            <span className="text-blue-600 font-medium text-xs">Subtopic</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-300 rounded-full opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-300 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "MindMapAI has completely transformed how I learn from YouTube. I retain so much more information now.",
                name: "Sarah J.",
                role: "Graduate Student",
                image: "/placeholder.svg?height=80&width=80"
              },
              {
                quote: "As a teacher, this tool has been invaluable for helping my students extract meaningful insights from video content.",
                name: "Michael T.",
                role: "High School Educator",
                image: "/placeholder.svg?height=80&width=80"
              },
              {
                quote: "I used to watch hours of videos and forget most of it. Now I have a structured library of knowledge I can actually use.",
                name: "Priya K.",
                role: "Self-Learner",
                image: "/placeholder.svg?height=80&width=80"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <p className="text-slate-700 italic">"{testimonial.quote}"</p>
                    </div>
                    <div className="mt-auto flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image || "/placeholder.svg"} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-slate-700 max-w-2xl mx-auto mb-16">
            Choose the plan that fits your learning journey
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for casual learners",
                features: [
                  "5 mind maps per month",
                  "Basic editing tools",
                  "7-day storage",
                  "Community support"
                ],
                buttonText: "Get Started",
                highlighted: false
              },
              {
                name: "Pro",
                price: "$9.99",
                period: "per month",
                description: "For dedicated self-learners",
                features: [
                  "Unlimited mind maps",
                  "Advanced editing tools",
                  "Unlimited storage",
                  "Knowledge connections",
                  "Export options",
                  "Priority support"
                ],
                buttonText: "Start Free Trial",
                highlighted: true
              },
              {
                name: "Team",
                price: "$19.99",
                period: "per user/month",
                description: "For educators and learning groups",
                features: [
                  "All Pro features",
                  "Collaborative editing",
                  "Team libraries",
                  "Admin controls",
                  "Analytics dashboard",
                  "Dedicated support"
                ],
                buttonText: "Contact Sales",
                highlighted: false
              }
            ].map((plan, i) => (
              <Card key={i} className={`${plan.highlighted ? 'border-purple-600 shadow-lg' : 'border-slate-200'}`}>
                {plan.highlighted && (
                  <div className="bg-purple-600 text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-slate-600 ml-1">{plan.period}</span>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${plan.highlighted ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-800 hover:bg-slate-900'}`}>
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-purple-100">
            Join thousands of learners who have already discovered the power of active learning through mind mapping.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Brain className="h-6 w-6 text-purple-400" />
              <span className="text-white font-bold">MindMapAI</span>
            </div>
            <div className="flex gap-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            © {new Date().getFullYear()} MindMapAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
