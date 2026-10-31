import Link from "next/link";

const Navbar = () => {
  return (
    <div>
    <div className="flex justify-between mx-auto container p-5">
      <div className="font-bold text-3xl">
        <Link href={"/"}>StudioSpace</Link>
      </div>
      <div className="flex justify-between gap-8">
        <Link href={"/"}>Home</Link>
        <Link href="/exploreStudios">Explore Studios</Link>
        <Link href="/HowItWorks">How It Works</Link>
        <Link href="/aboutUs">About Us</Link>
      </div>
      <div className="flex justify-between gap-5">
        <Link href="/signUp">
        <button className="btn btn-soft btn-primary">Sign-Up</button>
        </Link>
        <Link href="/signIn">
        <button className="btn btn-soft btn-secondary">Sign-Ip</button>
        </Link>
        
        
      </div>
    </div>
    </div>
  );
};

export default Navbar;
