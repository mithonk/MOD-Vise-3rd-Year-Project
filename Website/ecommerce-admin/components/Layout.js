import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div
        className="bg-cover bg-center min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('/backg.png')`,
        }}
      >
        <div className="bg-white bg-opacity-60 p-8 rounded-lg border border-gray-800 shadow-md max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Modvise Shoe Store
          </h1>
          <p className="text-lg text-gray-600 mb-8">Your Admin Panel</p>
          <button
            onClick={() => signIn("google")}
            className="bg-gray-800 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4" style={{ backgroundColor: "#FFFADA" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
