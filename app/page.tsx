import Link from 'next/link';
import { TOOLS } from '@/lib/tools-config';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container max-w-6xl py-12 px-4 mx-auto">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Developer Tools Suite</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A collection of 8 essential productivity tools for developers. 
            All operations are performed client-side for maximum privacy and speed.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.id} href={tool.path}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        P{tool.priority}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="pt-8 border-t">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium">🚀 Fast & Responsive</h3>
                <p className="text-sm text-muted-foreground">
                  All operations run locally in your browser with no server delays
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">🔒 Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Your data never leaves your device - completely client-side
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">📋 Copy to Clipboard</h3>
                <p className="text-sm text-muted-foreground">
                  One-click copy functionality for all tool outputs
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">🎨 Beautiful UI</h3>
                <p className="text-sm text-muted-foreground">
                  Clean, modern interface built with Shadcn UI components
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

