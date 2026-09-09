"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
              <p className="text-muted-foreground text-lg">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="#" onClick={() => router.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go back
                </Link>
              </Button>
              <Button asChild>
                <Link href="/">Go home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
