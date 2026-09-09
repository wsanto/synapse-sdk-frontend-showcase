import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Zap, BarChart3, Brain, Heart, TrendingUp, Twitter, Mail } from "lucide-react"
import Link from "next/link"

const PARTNERSHIPS_EMAIL = "partnerships@kaikostudios.xyz"
const PARTNERSHIPS_MAILTO = `mailto:${PARTNERSHIPS_EMAIL}?subject=Synapse%20SDK%20Partnership%20Inquiry`

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <img src="/images/kaiko-logo.png" alt="Kaiko" className="h-8 w-8" />
                <span className="text-2xl font-bold">Kaiko Synapse SDK</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>

                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="https://x.com/KAIKOEQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://discord.gg/HnVSQjr9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </Link>
              <Button asChild>
                <a href={PARTNERSHIPS_MAILTO}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Partnerships
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-20 md:py-32 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kaiko%20background-uX8Os1PINXMpJ3lWZroUNETtkvnbSl.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Emotional Intelligence for AI Agents
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Build AI agents that understand how users feel, not just what they say. Real-time emotional state tracking
            and emotionally tagged memory for more human-like interactions.
          </p>

          <p className="text-base text-muted-foreground/90 max-w-2xl mx-auto">
            Synapse SDK is now available through partnerships only. Reach out to discuss usage, integrations, and access.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 h-12" asChild>
              <a href={PARTNERSHIPS_MAILTO}>
                Contact Partnerships
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12 bg-transparent" asChild>
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span>Real-Time EQ</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>Emotion Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Seamless Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
            <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-sm text-muted-foreground ml-4">quick-start.ts</span>
            </div>
            <div className="p-6 font-mono text-sm bg-black/40">
              <pre className="text-foreground">
                <code>{`import { KaikoSynapseSDK } from '@kaiko/synapse-sdk';

const synapse = new KaikoSynapseSDK({
  apiKey: process.env.KAIKO_API_KEY
});

// Track emotional state in real-time
const emotionalState = await synapse.analyzeEmotion({
  text: "I'm really frustrated with this issue",
  context: conversationHistory
});

console.log(emotionalState);
// { emotion: 'frustration', intensity: 0.85, sentiment: -0.7 }

// Retrieve emotionally tagged memories
const memories = await synapse.recallEmotionalMemories({
  userId: 'user_123',
  emotionFilter: ['joy', 'satisfaction']
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20 md:py-32">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Complete Emotional Intelligence Stack</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Real-time empathy in conversations, plus the data backbone to train and refine emotionally aware AI systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="Real-Time Emotional Tracking"
            description="Detect frustration, joy, or uncertainty instantly. Adjust agent tone to defuse, reassure, or encourage based on user emotions."
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8" />}
            title="Emotionally Tagged Memory"
            description="Agents remember emotionally significant moments, creating deeper context for coaching, therapy, or long-term support."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Seamless Integration"
            description="Works with leading LLMs and agent frameworks including OpenAI, Anthropic, and AWS Bedrock via simple APIs."
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="Real-Time Analytics"
            description="Track customer emotions across chat, voice, and other channels. Trigger alerts based on mood shifts and emotional resonance."
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8" />}
            title="Emotion-Tagged Training Data"
            description="Enrich your ML pipelines by tagging data with emotional context. Access proprietary Kaiko EQ datasets for training."
          />
          <FeatureCard
            icon={<Code2 className="h-8 w-8" />}
            title="Developer-First SDK"
            description="Clean, intuitive APIs with TypeScript support. Comprehensive documentation and code examples for rapid integration."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="10+" label="Emotion States" />
            <StatCard value="Real-Time" label="Detection" />
            <StatCard value="99.9%" label="Uptime" />
            <StatCard value="<100ms" label="Latency" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 rounded-2xl border border-border bg-card p-12 md:p-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Interested in building with Synapse?</h2>
          <p className="text-xl text-muted-foreground text-balance">
            Synapse SDK access is now partnerships-only. Reach out to discuss usage, integrations, and setup tailored to your team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 h-12" asChild>
              <a href={PARTNERSHIPS_MAILTO}>
                Contact Partnerships
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12 bg-transparent" asChild>
              <Link href="/docs">Explore Documentation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Kaiko Synapse SDK</h3>
              <p className="text-sm text-muted-foreground">
                Emotional intelligence layer for AI agents. Build systems that understand how users feel.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/docs/guides" className="hover:text-foreground transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/docs/whitepaper" className="hover:text-foreground transition-colors">
                    EQ+ Whitepaper
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href={PARTNERSHIPS_MAILTO} className="hover:text-foreground transition-colors">
                    Partnerships
                  </a>
                </li>
                <li>
                  <a href="mailto:support@kaikostudios.xyz" className="hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="mailto:security@kaikostudios.xyz" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Kaiko Synapse SDK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}
