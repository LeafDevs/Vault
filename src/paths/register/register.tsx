import { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import SidebarFin from '../../components/sidebar-fin';
import Footer from '../../components/footer';

export default function Register() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [plan, setPlan] = useState("free");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const plans = [
    {
      name: "Free",
      price: 0,
    },
    {
      name: "Basic",
      price: 3.99,
    },
    {
      name: "Pro",
      price: 9.99,
    }
  ]

  const handleSubmit = () => {
    window.location.href = `/payments?plan=${plan}&email=${email}&username=${username}&password=${password}`;
  }

  useEffect(() => {
    // Get plan from URL parameters
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');
    
    // If valid plan found in params, update state
    if (planParam && plans.some(p => p.name.toLowerCase() === planParam.toLowerCase())) {
      setPlan(planParam.toLowerCase());
    }
  }, [plan]);

  const handleToggle = () => {
    const newIsOpen = !isSidebarOpen;
    setIsSidebarOpen(newIsOpen);
    localStorage.setItem('isOpen', newIsOpen.toString());
  };

  return (
    <>
      <Nav onToggle={handleToggle} />
      <SidebarFin isOpen={isSidebarOpen} onToggle={handleToggle} />
      <main id="main" className={`transition-all duration-300 p-24 bg-gradient-to-br from-gray-50 to-gray-100 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Create Account
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
                  Plan
                </label>
                <select
                  id="plan"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {plans.map((p) => (
                    <option key={p.name.toLowerCase()} value={p.name.toLowerCase()}>
                      {p.name} (${p.price}/month)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Create a password"
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Subscription total</span>
                  <span className="text-lg font-semibold">
                    ${plans.find(p => p.name.toLowerCase() === plan)?.price}/month
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                  onClick={handleSubmit}
                >
                  <span>Pay and Create Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer
        socialLinks={[
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            ),
            href: "https://twitter.com/vault"
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            ),
            href: "https://discord.gg/vault"
          }
        ]}
        links={[
          {
            title: "About",
            href: "/about"
          },
          {
            title: "Terms",
            href: "/terms"
          },
          {
            title: "Privacy Policy",
            href: "/privacy"
          },
          {
            title: "Contact",
            href: "/contact"
          }
        ]}
        bottomText="© 2024 Vault. Secure Minecraft monetization made simple."
      />
    </>
  );
}
