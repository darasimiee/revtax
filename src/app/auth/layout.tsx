import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid justify-center items-center grid-cols-12">
      <div className="hidden lg:block lg:col-span-6 relative h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        >
          <source src="/Abuja.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-[70%] left-0 right-0 z-30">
          <div className="flex flex-col justify-center items-center text-[40px] text-white font-normal ">
            <Image width={32} height={32} src="/Whitelogo.svg" alt="Logo" className="mb-[20px]"/>
            <h1>Navigating Taxes Made Easy</h1>
            <h1>-Stress-Free and Simple</h1>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6">{children}</div>
    </div>
  );
}
