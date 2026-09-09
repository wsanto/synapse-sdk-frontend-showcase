import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CodeBlock } from "./code-block"

interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE"
  endpoint: string
  description: string
  parameters?: {
    name: string
    type: string
    required: boolean
    description: string
  }[]
  example?: {
    request?: string
    response: string
  }
}

export function ApiEndpoint({ method, endpoint, description, parameters, example }: ApiEndpointProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "POST":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "PUT":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "DELETE":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Badge className={getMethodColor(method)}>{method}</Badge>
          <code className="text-lg font-mono bg-muted px-2 py-1 rounded">{endpoint}</code>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {parameters && parameters.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Parameters</h4>
            <div className="space-y-3">
              {parameters.map((param) => (
                <div key={param.name} className="border rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <code className="font-mono text-sm bg-muted px-2 py-1 rounded">{param.name}</code>
                    <Badge variant="outline" className="text-xs">
                      {param.type}
                    </Badge>
                    {param.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{param.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {example && (
          <div className="space-y-4">
            <h4 className="font-semibold">Example</h4>
            {example.request && <CodeBlock code={example.request} language="bash" title="Request" />}
            <CodeBlock code={example.response} language="json" title="Response" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
