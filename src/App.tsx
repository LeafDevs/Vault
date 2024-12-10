import { useState } from 'react'
import Nav from './components/nav';
import SidebarFin from './components/sidebar-fin';
import Footer from './components/footer';

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

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
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-8">
              Welcome to Vault
            </h1>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              The secure and simple way to monetize your game server content
            </p>
          </section>

          {/* Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="bg-blue-100 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Access</h3>
              <p className="text-gray-600 leading-relaxed">Control access to your premium Minecraft content with robust authentication</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="bg-blue-100 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Easy Payments</h3>
              <p className="text-gray-600 leading-relaxed">Accept payments seamlessly with integrated payment processing</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="bg-blue-100 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Track your server's performance with detailed analytics and insights</p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-24">
            <button 
              onClick={() => setIsPricingOpen(true)}
              className="px-10 py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
              Get Started
            </button>
          </section>

          {/* Pricing Modal */}
          {isPricingOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 relative">
                <button 
                  onClick={() => setIsPricingOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Free",
                      price: 0,
                      features: [
                        "Free forever",
                        "1 Server"
                      ],
                      highlighted: false,
                      buttonText: "Select Plan"
                    },
                    {
                      name: "Basic",
                      price: 3.99,
                      features: [
                        "Basic analytics",
                        "Customizable Pages",
                        "Priority support",
                        "Coupons",
                        "2 Servers"
                      ],
                      highlighted: false,
                      buttonText: "Select Plan"
                    },
                    {
                      name: "Pro",
                      price: 9.99,
                      features: [
                        "Advanced analytics",
                        "Priority support",
                        "Custom Domain",
                        "Giftcards",
                        "Creator Codes",
                        "5 Servers"
                      ],
                      highlighted: true,
                      buttonText: "Select Plan"
                    }
                  ].map((plan, index) => (
                    <div 
                      key={index}
                      className={`border rounded-xl p-6 hover:shadow-lg transition-shadow h-full flex flex-col justify-between ${
                        plan.highlighted ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div>
                        <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                        <p className="text-3xl font-bold mb-6">
                          ${plan.price}<span className="text-sm text-gray-500">/month</span>
                        </p>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center">
                              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => {
                        setIsPricingOpen(false);
                        window.location.href = `/register?plan=${plan.name.toLowerCase()}`;
                      }}>
                        {plan.buttonText}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Section */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              What Our Users Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  initial: "M",
                  name: "Marcus Chen",
                  rating: 5,
                  text: "As someone running a 500+ player Minecraft server, Vault has been a game-changer. The payment processing is rock-solid and I love how it handles user authentication. Haven't had a single security issue since switching."
                },
                {
                  initial: "C",
                  name: "Claire Thompson", 
                  rating: 5,
                  text: "The analytics dashboard is pure gold! I can track everything from popular items to peak purchase times. This data helped me optimize my store and increase revenue by 40% in just two months. Best investment I've made for my server."
                },
                {
                  initial: "R",
                  name: "Ryan Martinez",
                  rating: 5,
                  text: "Running both Minecraft and Rust servers, I needed something flexible. Vault handles both perfectly! Had it running on my Minecraft server in under 10 minutes, and Rust was just as smooth. The API is fantastic for custom integrations too."
                },
                {
                  initial: "S",
                  name: "Sarah Williams",
                  rating: 5,
                  text: "After trying 3 other platforms, Vault is by far the best. The interface is clean and intuitive, and my staff picked it up instantly. We use it across our network of FiveM and Minecraft servers - the multi-server support is exactly what we needed."
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-blue-600">{testimonial.initial}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </section>
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
  )
}

export default App
