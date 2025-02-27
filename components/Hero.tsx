import React from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[75vh]">
      <div className="container mx-auto px-6 md:flex md:items-center md:justify-between mt-16">
        {/* Left Section */}
        <div className="md:w-1/2 pl-10">
          <h1 className="text-5xl font-bold leading-tight font-cormorant-garamond">
            SAHAY <br />
            <span className="text-blue-900 mt-1"> सेवा, आशा और विश्वास का संगम</span>
          </h1>
          <p className="mt-6 mr-20 text-gray-500 text-lg font-serif">
          SAHAY is a movement focused on creating lasting impact through collaboration, support, and empowerment. We provide access to resources, education, and community engagement to ensure everyone has the tools and support they need to thrive. Join us in building a brighter, more inclusive future. Together, we can make a difference.
          </p>

          <button className="mt-10 px-6 py-3 text-blue-800 rounded-md transition-transform transform hover:scale-105 hover:bg-blue-900 hover:text-white">
            <Link href="/learn-more" className="transition-colors">
              Learn More
            </Link>
          </button>
        </div>

        <div className=" md:mt-0 md:w-1/2 relative pl-56">
          <img
            src="/images/Hero.png"
            alt="Hero Image"
            className="hidden md:block animate-slide-in-right rounded-xl"
            width={420}
            height="auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
