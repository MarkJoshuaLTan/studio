import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DevelopersPage() {
  const developers = [
    { name: "Mark Joshua L. Tan", url: "https://www.facebook.com/markjoshua.l.tan" },
    { name: "Reymart F. Baron", url: "https://www.facebook.com/reymart.baron.2024" },
    { name: "Macrow B. Ponferrada", url: "https://www.facebook.com/busygelo" },
    { name: "Ralph Andrew G. Dawa", url: "https://www.facebook.com/ralph213" },
    { name: "John Reyche B. Balmedina", url: "https://www.facebook.com/deathdeale01" }
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Team Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {developers.map((dev) => (
              <li key={dev.name}>
                <a 
                  href={dev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-lg font-medium p-3 rounded-md hover:bg-muted transition-all group"
                >
                  {dev.name}
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="mt-6">
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Button>
        </Link>
      </div>
    </div>
  );
}
