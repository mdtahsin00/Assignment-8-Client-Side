import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#09090f]">
      <div className="container mx-auto flex justify-between p-5">

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

        <div className="flex gap-5">
        
          <Link href="/signUp">
            <button className="btn btn-soft btn-primary">
              Sign-Up
            </button>
          </Link>

          <Link href="/signIn">
            <button className="btn btn-soft btn-secondary">
              Sign-In
            </button>
          </Link>
       
        </div>

      </div>
    </div>
  );
};

export default Navbar;