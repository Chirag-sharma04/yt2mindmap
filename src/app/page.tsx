import { Brain, PlayCircle, Zap, BookOpen, Network, Edit3, Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Unlock Research and Insights   with <span className="text-purple-600">Mind Mapping</span>
          </h1>
          <p className="text-lg text-slate-700">
            Transform passive YouTube watching into active learning. Extract insights, visualize connections, and master
            self-efficacy through AI-powered mind mapping and a bit of creativity!
          </p>
          <div className="flex gap-4 pt-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6">Start Mapping</Button>
            
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="bg-white rounded-xl shadow-xl p-6 relative z-10">
            <div className="w-full h-64 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Network className="w-32 h-32 text-purple-500 opacity-80" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-slate-200 rounded-full"></div>
              <div className="h-4 w-1/2 bg-slate-200 rounded-full"></div>
              <div className="h-4 w-2/3 bg-slate-200 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-8 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-30"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300 rounded-full opacity-30"></div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            The Limitations of <span className="text-purple-400">Passive Watching</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <PlayCircle className="h-10 w-10 text-purple-400" />,
                text: "Hours of content, but struggling to recall key points",
              },
              {
                icon: <BookOpen className="h-10 w-10 text-purple-400" />,
                text: "Often missing crucial ideas buried in long discussions",
              },
              {
                icon: <Zap className="h-10 w-10 text-purple-400" />,
                text: "Linear absorption of information without clear connections",
              },
              {
                icon: <RefreshCw className="h-10 w-10 text-purple-400" />,
                text: "Relying on repetition and 1.5x audio instead of structured recall",
              },
              {
                icon: <PlayCircle className="h-10 w-10 text-purple-400" />,
                text: "Wasting time rewatching when reading would be faster",
              },
            ].map((item, i) => (
              <Card key={i} className="bg-slate-800 border-none">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    {item.icon}
                    <p className="text-slate-200">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Transform Your Learning with <span className="text-purple-600">Mind Mapping</span>
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16">
            Don't just watch - engage with knowledge and turn insights into mastery.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    icon: <Zap className="h-6 w-6 text-purple-600" />,
                    title: "Extract key insights instantly",
                    desc: "Quickly identify and save the most important concepts for faster review within the first 2 minutes of video-playback",
                  },
                  {
                    icon: <Network className="h-6 w-6 text-purple-600" />,
                    title: "Visualize connections",
                    desc: "See how ideas relate to each other for deeper understanding",
                  },
                  {
                    icon: <Edit3 className="h-6 w-6 text-purple-600" />,
                    title: "Edit and refine while watching",
                    desc: "Customize AI-generated maps to match your understanding",
                  },
                  {
                    icon: <RefreshCw className="h-6 w-6 text-purple-600" />,
                    title: "Structured reflection",
                    desc: "Reinforce learning through active engagement with content, iterate and build better maps",
                  },
                  {
                    icon: <Save className="h-6 w-6 text-purple-600" />,
                    title: "Save and revisit effortlessly",
                    desc: "Access your insights anytime without rewatching entire videos",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-purple-100 p-2 rounded-lg h-fit">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-purple-50 rounded-xl p-8 relative z-10">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="ml-2 text-sm text-slate-500">YouTube Video</div>
                  </div>
                  <div className="h-40 bg-slate-200 rounded flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-slate-400" />
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-600 animate-bounce"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-medium">Mind Map</div>
                    <div className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">AI Generated</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <span className="text-purple-600 font-medium text-sm">Main Idea</span>
                      </div>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="absolute bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center"
                          style={{
                            top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 5)}%`,
                            left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 5)}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <span className="text-blue-600 font-medium text-xs">Point {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 -right-4 w-24 h-24 bg-purple-300 rounded-full opacity-30"></div>
              <div className="absolute bottom-10 -left-4 w-16 h-16 bg-yellow-300 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The Pareto Principle of Learning</h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16">
            You'll only use 20% of what you watch. Make that 20% count.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { hours: 64, type: "lectures", color: "bg-blue-500" },
              { hours: 72, type: "discussions", color: "bg-purple-500" },
              { hours: 32, type: "expert interviews", color: "bg-pink-500" },
              { hours: 16, type: "book summaries", color: "bg-orange-500" },
            ].map((item, i) => (
              <Card key={i} className="overflow-hidden">
                <div className={`h-2 ${item.color}`}></div>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900">{item.hours}</div>
                    <div className="text-slate-500 mt-2">hours of {item.type}</div>
                    <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full w-1/5 ${item.color}`}></div>
                    </div>
                    <div className="mt-2 text-sm text-slate-500">but only 20% is retained</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Break Free from Passive Consumption</h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16">
            AI-powered mind mapping makes learning more efficient by summarizing content, highlighting key insights, and
            organizing ideas visually.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Capture Only Essentials",
                desc: "No information overload - focus on what truly matters",
                icon: <Zap className="h-10 w-10 text-purple-600" />,
              },
              {
                title: "AI-Structured Insights",
                desc: "Let AI organize your learning effortlessly",
                icon: <Brain className="h-10 w-10 text-purple-600" />,
              },
              {
                title: "Deeper Understanding",
                desc: "Turn videos into tools for meaningful learning",
                icon: <BookOpen className="h-10 w-10 text-purple-600" />,
              },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center p-8">
                  <div className="mb-6 bg-purple-100 p-4 rounded-full">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Balance Consumption and Creation</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-purple-100">
            Passive watching is forgettable. Structured learning turns knowledge into mastery. Engage with knowledge,
            refine key takeaways, and Swap scrolling for self reflection.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
            Free Forever
          </Button>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  )
}

