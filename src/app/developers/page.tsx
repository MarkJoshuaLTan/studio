import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DevelopersPage() {
  const developers = [
    "Mark Joshua L. Tan",
    "Ralph Andrew G. Dawa",
    "Macrow Ponferada",
    "Reymart F. Baron"
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Meet the Developers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {developers.map((name) => (
              <li key={name} className="text-center text-lg font-medium">
                {name}
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
