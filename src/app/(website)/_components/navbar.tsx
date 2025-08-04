import Link from "next/link";
import React from "react";

type NavbarProps = object;

const LandingPageNavbar = (props: NavbarProps) => {
    return (
        <div {...props}>
        <nav className="mx-auto px-6 py-2 flex justify-between items-center">
         <div className=" flex text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
           VisionAI
        </div>

      <div className="hidden md:flex space-x-8">
     {['home', 'pricing', 'about', 'contact'].map((section) => (
              <Link
                key={section}
                href={`/${section}`}
                className="text-white hover:text-cyan-400 transition-colors duration-300 relative group "
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          
          <Link href="/auth/sign-in">
          <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5 transition-all duration-300">
            Start Free Trial
          </button>
          </Link>
        </nav>
        </div>
    )
}

export default LandingPageNavbar;