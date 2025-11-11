import { FC } from "react";

interface NavbarProps {
  isOpen: boolean;
}

export const Navbar: FC<NavbarProps> = ({ isOpen }) => {
  return (
    <aside className="fixed lg:static h-screen right-0">
      <nav
        className={`
        flex flex-col h-full shadow-sm
        w-64 bg-gray-800 text-white p-4
        transform transition-transform duration-300 ease-in-out z-1
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-bold text-center">
            Chat Log <span className="text-xs block p-1">The AI Banker</span>
          </h2>
        </div>
        {/* Chat */}

        <div className="flex-1 px-3 py-4">
          <p>Banker: What is your name?</p>
          <p>You: My name is ...</p>
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium">
                The Banker AI: Crack the Code! | doc
              </p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
