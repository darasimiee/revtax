import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="hidden lg:block lg:col-span-6 h-screen sticky top-0 bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80 bg-black"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        >
          <source src="/Abuja.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent z-20"></div>
          
          {/* Text content with improved positioning */}
          <div className="absolute bottom-0 left-0 right-0 z-30 pb-16">
            <div className="flex flex-col justify-center items-center text-[32px] text-white font-normal px-4">
              <Image 
                width={32} 
                height={32} 
                src="/Whitelogo.svg" 
                alt="Logo" 
                className="mb-5"
              />
              <h1 className="text-center">Navigating Taxes Made Easy</h1>
              <h1 className="text-center">- Stress-Free and Simple</h1>
            </div>
          </div>
        </div>
      
      <div className="col-span-12 lg:col-span-6">{children}</div>
    </div>
  );
}
