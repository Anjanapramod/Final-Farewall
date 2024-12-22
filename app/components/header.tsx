import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Final Farewell
        </Link>

        <div className="flex space-x-4">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
