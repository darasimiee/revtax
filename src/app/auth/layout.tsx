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
      </div>
      <div className="col-span-12 lg:col-span-6">{children}</div>
    </div>
  );
}