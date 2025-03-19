import { Brain, BookOpen, Lightbulb, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      
      
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Mission</h1>
          <p className="text-xl text-slate-700 mb-8">
            We&#39;re transforming how people learn from online content by bridging the gap between passive consumption and active mastery.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/features">Explore Features</Link>
            </Button>
            <Button variant="outline" asChild className="border-purple-600 text-purple-600 hover:bg-purple-50">
              <Link href="#journey">Our Philosophy</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-slate-700 mb-4">
                This app was born from a simple observation: despite the abundance of educational content online, 
                retention and application remain challenging for most learners.
              </p>
              <p className="text-slate-700 mb-4">
                Journaling is the best way to retain information, but many people watch hours of educational videos only to forget 
                key insights days later. This frustration led to a question: what if we could transform passive 
                watching into active learning?
              </p>
              <p className="text-slate-700">
                Bridge the gap between consumption and creation, Use AI to extract and organize data - use it as tool to help you get started on the process of  
                polishing and internalizing knowledge effectively through iteration over time.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-purple-50 rounded-xl p-8 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-4 aspect-square flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 aspect-square flex items-center justify-center">
                    <Brain className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 aspect-square flex items-center justify-center">
                    <Lightbulb className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 aspect-square flex items-center justify-center">
                    <Users className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="absolute top-8 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section id="journey" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The 12-Step Learning Journey
            </h2>
            <p className="text-lg text-slate-700">
              Our philosophy is built around a transformative journey from inefficient learning to mastery.
              Each step represents a milestone in your evolution as a learner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                {
                    "step": 1,
                    "title": "Current Journaling Habits",
                    "subtitle": "Living in Disorganization",
                    "description": "Recognize how inefficient journaling or mind mapping affects your daily productivity.",
                    "prompt": "If you continued journaling or mind mapping this way for 10 years, how would your personal growth and productivity look?"
                },
                {
                    "step": 2,
                    "title": "The Spark to Change",
                    "subtitle": "Realization of the Need for Structure",
                    "description": "Identify the moment when you realize your current journaling/mind mapping method isn’t working.",
                    "prompt": "What recent experience or frustration highlighted the need for a more organized approach to journaling or mind mapping?"
                },
                {
                    "step": 3,
                    "title": "Ignoring the Change",
                    "subtitle": "Excuses and Resistance",
                    "description": "Recognize the excuses or fears keeping you stuck in your current approach.",
                    "prompt": "What are the reasons you’ve been avoiding changing how you journal or use mind maps?"
                },
                {
                    "step": 4,
                    "title": "Finding a New Approach",
                    "subtitle": "Learning from Experts",
                    "description": "Look for new strategies, tools, or advice that can help guide your journaling or mind mapping improvements.",
                    "prompt": "Who do you know that has mastered effective journaling or mind mapping? How can you learn from them?"
                },
                {
                    "step": 5,
                    "title": "Making the First Change",
                    "subtitle": "Taking the Initial Step",
                    "description": "Commit to trying new methods or tools that will enhance your journaling or mind mapping process.",
                    "prompt": "What’s the first specific action you can take today to improve your journaling or mind mapping?"
                },
                {
                    "step": 6,
                    "title": "Obstacles and Support",
                    "subtitle": "Facing Challenges and Seeking Accountability",
                    "description": "Recognize the struggles and identify people who can support you through this transformation.",
                    "prompt": "Who can help you stay accountable or provide feedback as you work on improving your journaling or mind mapping?"
                },
                {
                    "step": 7,
                    "title": "The Toughest Challenge",
                    "subtitle": "Struggling with New Methods",
                    "description": "Identify the toughest part of adapting to a new way of journaling or mind mapping.",
                    "prompt": "What’s the most difficult aspect of changing how you journal or create mind maps?"
                },
                {
                    "step": 8,
                    "title": "Breaking Old Habits",
                    "subtitle": "Confronting Your Past Patterns",
                    "description": "Examine how your old journaling or mind mapping habits may conflict with new strategies.",
                    "prompt": "What part of your identity is most tied to the old, inefficient ways you used to journal or map out ideas?"
                },
                {
                    "step": 9,
                    "title": "First Signs of Improvement",
                    "subtitle": "Experiencing Success with New Methods",
                    "description": "Celebrate small victories in adopting more efficient journaling or mind mapping techniques.",
                    "prompt": "What was the first moment you realized your journaling or mind mapping is improving and more effective?"
                },
                {
                    "step": 10,
                    "title": "Avoiding Setbacks",
                    "subtitle": "Fighting the Urge to Fall Back into Old Patterns",
                    "description": "Recognize the temptations to revert to old journaling habits and reinforce your new practices.",
                    "prompt": "What old journaling habits are still tempting you to go back to your previous approach? How can you resist them?"
                },
                {
                    "step": 11,
                    "title": "Full Transformation",
                    "subtitle": "Achieving a Lasting Shift in Your Process",
                    "description": "Feel the deep, lasting change in your journaling or mind mapping habits that empowers your growth.",
                    "prompt": "If you could give advice to your past self about improving your journaling or mind mapping, what would it be?"
                },
                {
                    "step": 12,
                    "title": "Sharing the Knowledge",
                    "subtitle": "Helping Others with Your New Approach",
                    "description": "Integrate your effective journaling and mind mapping methods into your life and share them with others.",
                    "prompt": "Who in your life could benefit from your new journaling or mind mapping insights? How can you support them?"
                }
                ]
                .map((item, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="bg-purple-600 py-2 px-4 text-white flex justify-between items-center">
                  <span className="font-medium">Step {item.step}</span>
                  <span className="text-sm text-purple-200">{item.subtitle}</span>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-700 mb-4">{item.description}</p>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                    <p className="text-sm italic text-slate-700">{item.prompt}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        
      <div className="max-w-4xl mx-auto py-12">
        
  
   
  <div className="flex flex-col md:flex-row items-center gap-8">
    
    {/* Left: Profile Section */}
    <div className="flex-1 text-center md:text-left">
      <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden mb-4">
        <img 
          src="https://eobemzviqxxlcrwuygkr.supabase.co/storage/v1/object/public/sparklog//1689921010749.jpg" 
          alt="Agney Nalapat" 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-slate-900">Agney Nalapat</h3>
      <p className="text-purple-600 mb-2">Founder & CEO</p>
      <p className="text-slate-600 max-w-md">
        Indie hacker with a passion for data - Author of <i>The Curse of the Fire Thief.</i> 
        Explore the Tech stack that helped me build multiple AI apps and social media 
        agents
      </p>
    </div>

    {/* Right: Banner Image */}
    <div className="flex-85 mt-36">
      <img 
        src="https://eobemzviqxxlcrwuygkr.supabase.co/storage/v1/object/public/sparklog//AI%20writes%20the%20code.%20You%20accept%20all.%20But%20can%20you%20still%20think%20sequentially.jpg" 
        alt="Banner" 
        className="w-full h-auto rounded-lg shadow-md"
      />
      {/* Buy Now Button */}
      <div className="mt-4 text-center">
        <a 
          href="https://your-buy-link.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Buy Now
        </a>
      </div>
    </div>
    
  </div>
  
</div>


      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us on This Learning Journey
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-purple-100">
            Transform how you learn from online content and unlock your full intellectual potential.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
            Start Your Journey
          </Button>
        </div>
      </section>

      
    </div>
  );
}
