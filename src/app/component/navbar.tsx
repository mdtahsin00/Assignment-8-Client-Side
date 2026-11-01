import Link from "next/link";
import Userinfo from "./Userinfo";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#09090f]">
      <div className="container mx-auto flex justify-between p-5 items-center">

        <div className="text-3xl font-bold">
          <Link href="/">StudioSpace</Link>
        </div>

        <div className="flex gap-8">
          <Link href="/">Home</Link>

          <Link href="/exploreStudios">
            Explore Studios
          </Link>

          <Link href="/#howItWork">
            How It Works
          </Link>

          <Link href="/#aboutUs">
            About Us
          </Link>
        </div>

        <div >
        
          <Userinfo></Userinfo>
       
        </div>

      </div>
    </div>
  );
};

export default Navbar;