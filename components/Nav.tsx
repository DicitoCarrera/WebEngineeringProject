interface NavProps {
  loggedIn: boolean;
  menuOpen: boolean; // Added menuOpen prop to handle the open state
}

export default function Nav({ loggedIn, menuOpen }: NavProps) {
  const menus = [
    { name: "Home", href: "/" },
  ];

  const loggedInMenus = [
    { name: "Logout", href: "/logout" },
  ];

  const nonLoggedInMenus = [
    { name: "Login", href: "/login" },
    { name: "SignUp", href: "/signup" },
  ];

  return (
    <nav class="bg-white shadow-md py-4">
      <div class="max-w-screen-xl flex items-center justify-between mx-auto px-6">
        {/* Logo */}
        <div class="text-2xl font-bold text-blue-600">
          Fresh
        </div>

        {/* Desktop Menu */}
        <div class="hidden md:flex gap-8">
          <ul class="flex space-x-6">
            {menus.map((menu) => (
              <li key={menu.name}>
                <a
                  href={menu.href}
                  class="text-gray-700 hover:text-blue-600 transition duration-300 py-1"
                >
                  {menu.name}
                </a>
              </li>
            ))}

            {loggedIn
              ? loggedInMenus.map((menu) => (
                <li key={menu.name}>
                  <a
                    href={menu.href}
                    class="text-gray-700 hover:text-blue-600 transition duration-300 py-1"
                  >
                    {menu.name}
                  </a>
                </li>
              ))
              : nonLoggedInMenus.map((menu) => (
                <li key={menu.name}>
                  <a
                    href={menu.href}
                    class="text-gray-700 hover:text-blue-600 transition duration-300 py-1"
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div class="md:hidden flex items-center">
          <button
            class="text-gray-700 hover:text-blue-600"
            onClick={() => {
              // Triggering a server-side or navigation mechanism for toggling
              // Maybe using query strings or form submission (e.g., /menu-toggle)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered based on menuOpen prop) */}
      <div class={`md:hidden ${menuOpen ? "block" : "hidden"} flex flex-col items-center gap-4 bg-gray-100 p-6 mt-4`}>
        <ul class="space-y-4">
          {menus.map((menu) => (
            <li key={menu.name}>
              <a
                href={menu.href}
                class="text-gray-700 hover:text-blue-600 transition duration-300"
              >
                {menu.name}
              </a>
            </li>
          ))}
          {loggedIn
            ? loggedInMenus.map((menu) => (
              <li key={menu.name}>
                <a
                  href={menu.href}
                  class="text-gray-700 hover:text-blue-600 transition duration-300"
                >
                  {menu.name}
                </a>
              </li>
            ))
            : nonLoggedInMenus.map((menu) => (
              <li key={menu.name}>
                <a
                  href={menu.href}
                  class="text-gray-700 hover:text-blue-600 transition duration-300"
                >
                  {menu.name}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
