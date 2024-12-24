import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Connecting Compassionate Care with Those in Need
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Final Farewell brings together funeral service providers and families,
          ensuring dignified farewells for your loved ones.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => {
              router.push("/auth/register");
            }}
            size="lg"
          >
            For Funeral Homes
          </Button>
          <Button
            onClick={() => {
              router.push("/auth/register");
            }}
            size="lg"
            variant="outline"
          >
            For Families
          </Button>
        </div>
        {/* <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Find a Funeral Home Near You
          </h2>
          <form className="flex justify-center max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Enter your zip code"
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              Search
            </Button>
          </form>
        </div> */}
      </div>
    </section>
  );
}
