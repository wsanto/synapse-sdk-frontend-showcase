import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/docs/code-block"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, Globe, Brain, BarChart3, Lock, Bell, Download, Sparkles } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  const quickStartCode = `curl -X POST https://api.kaikostudios.xyz/v2/emotions/analysis \\
  -H "x-api-key: $KAIKO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "emotion-v2",
    "messages": [
      {
        "role": "user",
        "content": {"text": "I am so excited about this new project!"}
      }
    ]
  }'`

  const quickStartResponse = `{
  "object": "emotions.analysis",
  "model": "emotion-v2",
  "emotions": {
    "user": {
      "category": "joy",
      "intensity": 0.85,
      "intensityLevel": "high",
      "valence": 0.78,
      "arousal": 0.82,
      "complexity": "simple",
      "wonderIndex": 0.45,
      "discoveryLevel": "significant"
    }
  }
}`

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <img src="/images/kaiko-logo.png" alt="Kaiko" className="h-8 w-8" />
          <h1 className="text-4xl font-bold text-balance">Kaiko Developer Platform</h1>
          <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">V2</Badge>
        </div>
        <p className="text-xl text-muted-foreground text-pretty">
          Welcome to the Kaiko Developer Docs — your gateway to building emotionally intelligent AI systems. Kaiko
          provides an EQ+ layer that bridges LLMs and agents, enabling them to detect emotions, adapt responses, and
          maintain emotional memory across interactions.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/docs/quickstart">
            <Button>
              Get Started with V2
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/docs/api/unified-chat">
            <Button variant="outline">API Reference</Button>
          </Link>
          <a href="/docs/SYNAPSE_SDK_V2_LLM_REFERENCE.md" download>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download LLM Reference
            </Button>
          </a>
        </div>
      </div>

      {/* V2 Announcement */}
      <Card className="border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-300">Synapse SDK V2 Now Available</h3>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                V2 introduces 6 EQ dimensions (intensity, valence, arousal, complexity, wonderIndex, discoveryLevel),
                trajectory tracking, growth insights, and conversation mode detection. V1 will be sunset on March 31, 2026.
              </p>
              <Link href="/docs/changelog" className="text-sm text-green-600 dark:text-green-400 hover:underline mt-2 inline-block">
                View Changelog →
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What You Can Build */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What You Can Build</h2>
        <p className="text-muted-foreground">With Kaiko V2, you can:</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <Brain className="h-8 w-8 text-primary mb-3" />
              <p className="text-sm">Build empathetic chatbots that adapt tone based on user emotions and intensity levels.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <p className="text-sm">Track emotional trajectories and detect breakthroughs across multi-turn conversations.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <BarChart3 className="h-8 w-8 text-primary mb-3" />
              <p className="text-sm">Analyze social media sentiment with batch processing for high-throughput pipelines.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Zap className="h-8 w-8 text-primary mb-3" />
              <p className="text-sm">Combine LLM generation + emotion inference + EQ dimensions in a single API call.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Globe className="h-8 w-8 text-primary mb-3" />
              <p className="text-sm">Detect conversation modes and automatically adjust response strategies.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Start */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Start</h2>
        <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
          <li>
            Request an API Key by emailing{" "}
            <a
              href="mailto:partnerships@kaikostudios.xyz?subject=Synapse%20SDK%20API%20Key%20Request"
              className="text-primary hover:underline"
            >
              partnerships@kaikostudios.xyz
            </a>{" "}
            (format: <code className="text-xs bg-muted px-1 py-0.5 rounded">kaiko_live_xxxxxxxxxxxxx</code>)
          </li>
          <li>
            Use the V2 base URL: <code className="text-xs bg-muted px-1 py-0.5 rounded">https://api.kaikostudios.xyz/v2</code>
          </li>
          <li>Make your first V2 request:</li>
        </ol>
        <CodeBlock code={quickStartCode} language="bash" />
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Response:</p>
          <CodeBlock code={quickStartResponse} language="json" />
        </div>
        <p className="text-sm text-muted-foreground">
          See{" "}
          <Link href="/docs/quickstart" className="text-primary hover:underline">
            Quickstart
          </Link>{" "}
          for more examples including chat completions with emotions.
        </p>
      </div>

      {/* Core APIs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Core APIs</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/docs/api/unified-chat" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Unified Chat API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Chat completions + emotional analysis + 6 EQ dimensions in one call.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/api/emotions" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Emotion APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analyze text with V2 EQ dimensions, trajectory tracking, and batch processing.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/concepts" className="block">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle>V2 EQ Dimensions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Intensity, valence, arousal, complexity, wonderIndex, discoveryLevel.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* SDKs & Tools */}
      <Card>
        <CardHeader>
          <CardTitle>SDKs & Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="text-muted-foreground space-y-1 list-disc list-inside">
            <li>Python and Node.js SDKs</li>
            <li>Postman Collection for testing</li>
            <li>
              <a href="/docs/SYNAPSE_SDK_V2_LLM_REFERENCE.md" download className="text-primary hover:underline">
                LLM-optimized reference file
              </a>{" "}
              for AI coding assistants
            </li>
          </ul>
          <Link href="/docs/sdks">
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              View SDKs & Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Key Topics Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/docs/authentication" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <Lock className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">Authentication & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                All requests use API keys via the <code className="text-xs">x-api-key</code> header. Support for
                idempotency keys, rotation, and usage logging.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/rate-limits" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <Bell className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">Monitoring & Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                V2 rate limits: 1,000 RPM, 100K tokens/month. Clear error codes with troubleshooting steps.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/changelog" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Updates & Lifecycle</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                V2 release notes, V1 deprecation timeline (March 31, 2026), and migration guide.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/support" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Support & Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Docs (always up to date), status page (uptime + incidents), community forum / Discord, priority support
                for enterprise.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* V1 Legacy Notice */}
      <Card className="border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/10">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-300">Looking for V1 Documentation?</h3>
              <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                V1 documentation is available in the{" "}
                <Link href="/docs/v1-legacy" className="underline">
                  Legacy API Reference
                </Link>{" "}
                section. V1 will be sunset on March 31, 2026.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Where to Go Next */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Where to Go Next</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/docs/quickstart">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ArrowRight className="mr-2 h-4 w-4" />
                Quickstart — Run your first V2 request
              </Button>
            </Link>
            <Link href="/docs/api/unified-chat">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ArrowRight className="mr-2 h-4 w-4" />
                Unified Chat API — LLM + emotions + EQ dimensions
              </Button>
            </Link>
            <Link href="/docs/api/emotions">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ArrowRight className="mr-2 h-4 w-4" />
                Emotion APIs — Analyze with V2 features
              </Button>
            </Link>
            <Link href="/docs/guides">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ArrowRight className="mr-2 h-4 w-4" />
                Guides — Empathetic Chatbot & Sentiment Analysis
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground text-center pt-4">
            You're ready to start building with Kaiko V2.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
