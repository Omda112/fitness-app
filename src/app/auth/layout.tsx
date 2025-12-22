import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className="relative min-h-screen bg-[url('/auth-background.png')] bg-cover bg-center flex flex-row">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>

      {/* Left side */}
      <div className="relative text-white w-1/2 flex flex-col  justify-center items-center gap-10">
        {/* Logo */}
        <img src="/logo.png" alt="fitness-logo" className="w-60" />

        {/* Gym Guy */}
        <img
          src="/gym-guy.png"
          alt="gym-guy"
          className="w-132 object-cover object-[50%_20%] -mt-50"
        />
      </div>

      {/* Right Side - Children */}
      <div className="relative w-1/2 ">
        <Outlet />
      </div>
    </main>
  );
}
