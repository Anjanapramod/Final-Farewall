import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter} from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Final Farewell
        </Link>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={()=>router.push("/auth/login")}>Log In</Button>
          <Button  onClick={()=>router.push("/auth/register")}>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
