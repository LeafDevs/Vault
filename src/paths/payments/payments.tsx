import { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import SidebarFin from '../../components/sidebar-fin';
import Footer from '../../components/footer';

export default function Payments() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [plan, setPlan] = useState('Free');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [cc, setCC] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');


  const [paymentPending, setPaymentPending] = useState(false);
  const [isPaymentError, setPaymentError] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

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

  const completePayment = () => {
    //   fetch(`${import.meta.env.VITE_APP_URL}/api/v1/payments/complete`, {
    //     method: "POST",
    //     body: JSON.stringify({ email, username, password, cc, expiry, cvc }),
    //   });
    console.log(cc, expiry, cvc);
    setPassword('123456');
    console.log(email, username, password);

      setPaymentPending(true);
      setTimeout(() => {
        setPaymentPending(false);
        if(paymentMethod === 'card') {
          setPaymentMessage("Your bank has rejected the payment. Please try again.");
          setPaymentError(true);
        } else {
            setPaymentMessage("Payment confirmed. Thank you!");
            setPaymentError(false);
        }
      }, 5000);
  }

  useEffect(() => {
    // Get plan and account info from URL parameters
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');
    const email = params.get('email');
    const username = params.get('username');

    console.log(planParam, email, username);
    
    // If valid plan found in params, update state
    if (planParam && plans.some(p => p.name.toLowerCase() === planParam.toLowerCase()) && email && username) {
      setPlan(planParam);
      setEmail(email);
      setUsername(username);
    }

    // Redirect if missing required params
    if (!email || !username) {
      window.location.href = '/register';
    }
  }, []);

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
          <div className="relative">
            <div className={`bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg ${paymentPending ? 'blur-sm' : ''}`}>
              {paymentMessage && (
                <div className={`${isPaymentError ? 'bg-red-500' : 'bg-green-500'} text-white p-4 rounded-lg mb-4`}>
                  {paymentMessage}
                </div>
              )}
              <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Payment Details
              </h2>

              <div className="mb-6">
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      paymentMethod === 'card' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Card</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('crypto')}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      paymentMethod === 'crypto'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Crypto</span>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length > 16) return;
                          const groups = value.match(/.{1,4}/g) || [];
                          e.target.value = groups.join(' ');
                          
                          // Validate card number using Luhn algorithm
                          const isValid = value.split('')
                            .reverse()
                            .map(x => parseInt(x))
                            .map((x, idx) => idx % 2 ? x * 2 : x)
                            .map(x => x > 9 ? (x % 10) + 1 : x)
                            .reduce((acc, x) => acc + x, 0) % 10 === 0;

                          // Check card type and validate length
                          const isAmex = /^3[47]/.test(value);
                          const isMastercard = /^5[1-5]/.test(value);
                          const isVisa = /^4/.test(value);
                          
                          const isValidLength = (
                            (isAmex && value.length === 15) ||
                            ((isMastercard || isVisa) && value.length === 16)
                          );

                          // Highlight red if number is invalid or wrong length
                          e.target.style.borderColor = (value.length && (!isValid || !isValidLength)) 
                            ? '#ef4444' // red-500
                            : '#d1d5db'; // gray-300
                            
                          setCC(value); // Store raw number without spaces
                        }}
                        className={`mt-1 block w-full rounded-lg border ${isPaymentError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          id="expiry"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length === 1 && parseInt(value) >= 2) {
                              e.target.value = '0' + value + '/';
                            } else if (value.length >= 2) {
                              e.target.value = value.slice(0,2) + '/' + value.slice(2,4);
                            } else {
                              e.target.value = value;
                            }
                            setExpiry(value);
                          }}
                          className={`mt-1 block w-full rounded-lg border ${isPaymentError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                        <input
                          type="text"
                          id="cvc"
                          className={`mt-1 block w-full rounded-lg border ${isPaymentError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          placeholder="123"
                          maxLength={3}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length > 3) return;
                            setCVC(value);
                          }}
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Send payment to:</p>
                      <code className="block p-2 bg-white rounded border border-gray-200 text-sm break-all">
                        0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                      </code>
                    </div>
                    <div className="text-sm text-gray-500">
                      * Payment will be confirmed after network verification
                    </div>
                  </div>
                )}

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Subscription total</span>
                    <span className="text-lg font-semibold">
                      ${plans.find(p => p.name.toLowerCase() === plan)?.price}/month
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={paymentMethod === 'card' && paymentPending}
                  className="mt-6 w-full px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={completePayment}
                >
                  <span>Complete Payment</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            {paymentPending && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
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
      />
    </>
  );
}
