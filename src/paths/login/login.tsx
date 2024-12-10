import { useState } from 'react';
import Nav from '../../components/nav';
import SidebarFin from '../../components/sidebar-fin';
import Footer from '../../components/footer';

export default function Login() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reset password logic here
  };

  const handleToggle = () => {
    const newIsOpen = !isSidebarOpen;
    setIsSidebarOpen(newIsOpen);
    localStorage.setItem('isOpen', newIsOpen.toString());
  };

  return (
    <>
      <Nav onToggle={handleToggle} />
      <SidebarFin isOpen={isSidebarOpen} onToggle={handleToggle} />
      <div className="min-h-screen flex flex-col">
        <main id="main" className={`transition-all duration-300 p-24 bg-gradient-to-br from-gray-50 to-gray-100 flex-grow ${isSidebarOpen ? 'ml-64' : ''}`}>
          <div className="max-w-md mx-auto">
            {/* Login Form */}
            <div className={`bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg ${showResetForm ? 'hidden' : ''}`}>
              <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Sign In
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Account ID
                  </label>
                  <input
                    type="text"
                    id="accountId"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value.replace(/\D/g, ''))}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setShowResetForm(true)}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Don't have an account?</span>
                  {' '}
                  <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up
                  </a>
                </div>
              </form>
            </div>

            {/* Reset Password Form */}
            <div className={`bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg ${!showResetForm ? 'hidden' : ''}`}>
              <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Reset Password
              </h2>

              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div>
                  <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="resetEmail"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Reset Link
                </button>

                <button
                  type="button"
                  onClick={() => setShowResetForm(false)}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer 
          socialLinks={[]} 
          links={[]}
        />
      </div>
    </>
  );
}
