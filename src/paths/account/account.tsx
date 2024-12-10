import { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import SidebarFin from '../../components/sidebar-fin';
import Footer from '../../components/footer';

export default function Account() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(localStorage.getItem('isOpen') === 'true');
  const [email, setEmail] = useState("user@example.com");
  const [username, setUsername] = useState("user123");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("account"); // New state for tabs
  const [billingInfo, setBillingInfo] = useState({} as any);



  const handleToggle = () => {
    const newIsOpen = !isSidebarOpen;
    setIsSidebarOpen(newIsOpen);
    localStorage.setItem('isOpen', newIsOpen.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle account update logic here
    setIsEditing(false);
  };

  useEffect(() => {
    
    // Check URL hash and set active tab accordingly
    const hash = window.location.hash;
    if (hash === '#billing') {
      setActiveTab('billing');
    } else if (hash === '#security') {
      setActiveTab('security'); 
    } else {
      setActiveTab('account');
    }

    setBillingInfo({
        cardNumber: "**** **** **** 4242",
        expiryDate: "7/28",
        plan: "Pro",
        nextBilling: "January 1, 2025",
        amount: "$9.99"
      })

  }, []);

  return (
    <>
      <Nav onToggle={handleToggle} />
      <SidebarFin isOpen={isSidebarOpen} onToggle={handleToggle} />
      <div className="min-h-screen flex flex-col">
        <main id="main" className={`transition-all duration-300 p-24 bg-gradient-to-br from-gray-50 to-gray-100 flex-grow ${isSidebarOpen ? 'ml-64' : ''}`}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              {/* Tabs */}
              <div className="flex space-x-4 mb-8 border-b">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`pb-2 px-4 ${activeTab === "account" ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                  Account Settings
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`pb-2 px-4 ${activeTab === "billing" ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                  Billing & Plan
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`pb-2 px-4 ${activeTab === "security" ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                  Security
                </button>
              </div>

              {activeTab === "account" && (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                      Account Settings
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
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
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>

                    {isEditing && (
                      <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save Changes
                      </button>
                    )}
                  </form>
                </>
              )}

              {activeTab === "billing" && (
                <>
                  <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Billing & Plan
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{billingInfo.plan}</p>
                          <p className="text-gray-600">Next billing on {billingInfo.nextBilling}</p>
                          <p className="text-gray-600">Amount: {billingInfo.amount}/month</p>
                        </div>
                        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                          Change Plan
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-600">Card ending in {billingInfo.cardNumber.slice(-4)}</p>
                          <p className="text-gray-600">Expires {billingInfo.expiryDate}</p>
                        </div>
                        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                      <div className="space-y-4">
                        {[
                          {
                            id: 1,
                            date: "September 5, 2024",
                            plan: "Basic Plan - Lifetime", 
                            amount: "$0.00"
                          },
                          {
                            id: 2,
                            date: "October 9, 2024",
                            plan: "Pro Plan - Monthly",
                            amount: "$9.99"
                          },
                          {
                            id: 3, 
                            date: "November 11, 2024",
                            plan: "Pro Plan - Monthly",
                            amount: "$9.99"
                          }
                        ].map((item) => (
                          <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                            <div>
                              <p className="font-medium">{item.date}</p>
                              <p className="text-gray-600">{item.plan}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{item.amount}</p>
                              <button className="text-blue-600 text-sm">Download</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "security" && (
                <>
                  <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Security Settings
                  </h2>
                  
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Update Password
                    </button>
                  </form>
                </>
              )}
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
