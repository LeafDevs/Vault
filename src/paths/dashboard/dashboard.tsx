import { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import SidebarFin from '../../components/sidebar-fin';
import Footer from '../../components/footer';

import '../../App.css';
import Table from '../../components/table';

interface MonthData {
  month: string;
  value: number;
}
export default function Dashboard() {
  const [yearly, setYearly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [weekly, setWeekly] = useState(0);
  
  const [months, setMonths] = useState<MonthData[]>([]);
  const [weeks, setWeeks] = useState<MonthData[]>([]);
  const [days, setDays] = useState<MonthData[]>([]);
  
  const [selectedPeriod, setSelectedPeriod] = useState('yearly');
  const [selectedData, setSelectedData] = useState<MonthData[]>([]);
  
  const [isOpen, setIsOpen] = useState(localStorage.getItem('isOpen') === 'true');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Generate target revenues
    const yearRevenue = Math.floor(Math.random() * (500000 - 50000) + 50000);
    const last10WeeksRevenue = Math.floor(Math.random() * (16000 - 4000) + 4000);
    const weeklyRevenue = Math.floor(Math.random() * (4000 - 120) + 120);

    // Helper function to generate random proportional values that sum to a target
    const generateRandomValues = (count: number, target: number) => {
      const values = [];
      let remaining = target;
      
      // Calculate average value per item
      const avgValue = target / count;
      // Allow 30% deviation from average
      const maxDeviation = avgValue * 0.3;
      
      for(let i = 0; i < count - 1; i++) {
        // Generate value within 30% of average
        const minValue = Math.max(avgValue - maxDeviation, target < 1000 ? 30 : 0);
        const maxValue = Math.min(avgValue + maxDeviation, remaining - minValue * (count - i - 1));
        const value = Math.floor(Math.random() * (maxValue - minValue) + minValue);
        values.push(value);
        remaining -= value;
      }
      
      // Add remaining amount as last value
      values.push(remaining);
      
      return values.sort(() => Math.random() - 0.5);
    };

    const monthValues = generateRandomValues(12, yearRevenue);
    const weekValues = generateRandomValues(10, last10WeeksRevenue);
    const dayValues = generateRandomValues(10, weeklyRevenue);

    const monthData = [
      { month: 'Jan', value: monthValues[0] },
      { month: 'Feb', value: monthValues[1] },
      { month: 'Mar', value: monthValues[2] },
      { month: 'Apr', value: monthValues[3] },
      { month: 'May', value: monthValues[4] },
      { month: 'Jun', value: monthValues[5] },
      { month: 'Jul', value: monthValues[6] },
      { month: 'Aug', value: monthValues[7] },
      { month: 'Sep', value: monthValues[8] },
      { month: 'Oct', value: monthValues[9] },
      { month: 'Nov', value: monthValues[10] },
      { month: 'Dec', value: monthValues[11] }
    ];

    const weekData = [
      { month: 'Week 1', value: weekValues[0] },
      { month: 'Week 2', value: weekValues[1] },
      { month: 'Week 3', value: weekValues[2] },
      { month: 'Week 4', value: weekValues[3] },
      { month: 'Week 5', value: weekValues[4] },
      { month: 'Week 6', value: weekValues[5] },
      { month: 'Week 7', value: weekValues[6] },
      { month: 'Week 8', value: weekValues[7] },
      { month: 'Week 9', value: weekValues[8] },
      { month: 'Week 10', value: weekValues[9] }
    ];

    const dayData = [
      { month: 'Dec 1', value: dayValues[0] },
      { month: 'Dec 2', value: dayValues[1] },
      { month: 'Dec 3', value: dayValues[2] },
      { month: 'Dec 4', value: dayValues[3] },
      { month: 'Dec 5', value: dayValues[4] },
      { month: 'Dec 6', value: dayValues[5] },
      { month: 'Dec 7', value: dayValues[6] },
      { month: 'Dec 8', value: dayValues[7] },
      { month: 'Dec 9', value: dayValues[8] },
      { month: 'Dec 10', value: dayValues[9] }
    ];

    // Set states with the generated data
    setMonths(monthData);
    setWeeks(weekData);
    setDays(dayData);
    setYearly(yearRevenue);
    setMonthly(last10WeeksRevenue);
    setWeekly(weeklyRevenue);
    
    // Set initial selected data to yearly view
    setSelectedData(monthData);
  }, []);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem('isOpen', newIsOpen.toString());
  };

  return (
    <>
      <Nav onToggle={handleToggle} />
      <SidebarFin isOpen={isOpen} onToggle={handleToggle} />
      <main id="main" className={`transition-all duration-300 p-24 bg-gradient-to-br from-gray-900 to-gray-800 ${isOpen ? 'ml-64' : ''}`}>
        <div className="max-w-7xl mx-auto">
          
          {/* Revenue Chart */}
          <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Revenue Overview</h3>
                <p className="text-lg font-medium text-gray-200">{selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <select 
                  className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer appearance-none pr-8 pl-3 bg-no-repeat bg-[length:16px] bg-[center_right_0.5rem] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQgNmw0IDQgNC00IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] transition-all duration-200"
                  onChange={(e) => {
                    setSelectedPeriod(e.target.value);
                    switch(e.target.value) {
                      case 'yearly':
                        setSelectedData(months);
                        break;
                      case 'weeks':
                        setSelectedData(weeks);
                        break;
                      case 'days':
                        setSelectedData(days);
                        break;
                    }
                  }}
                  defaultValue="yearly"
                >
                  <option value="yearly">Yearly</option>
                  <option value="weeks">Last 10 Weeks</option>
                  <option value="days">Last 10 Days</option>
                </select>
                <span className="p-2 bg-blue-900 rounded-lg">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <p className="text-3xl font-bold text-gray-100">${selectedPeriod === 'yearly' ? yearly.toLocaleString() : selectedPeriod === 'weeks' ? monthly.toLocaleString() : weekly.toLocaleString()}</p>
              <div className="flex items-center px-2.5 py-1 bg-green-900 rounded-full">
                <svg className="w-4 h-4 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="text-green-400 text-sm font-medium">+218.2%</span>
              </div>
            </div>
            
            <div className="h-80">
              <div className="relative h-full flex items-end justify-between">
                <div className="absolute inset-0 grid grid-rows-4 -z-10">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-t border-gray-700 w-full"></div>
                  ))}
                </div>
                <div className="flex-1 flex items-end justify-between h-full">
                  {selectedData.map((bar) => {
                    const maxValue = Math.max(...selectedData.map(item => item.value));
                    const heightPercentage = (bar.value / maxValue) * 100;
                    const heightPx = Math.max(20, (heightPercentage * 270) / 100);
                    const animationDuration = (heightPercentage / 100) * 2;
                    
                    return (
                    <div key={bar.month} className="w-16 group relative">
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-gray-900 text-gray-100 px-3 py-1.5 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="text-center">${bar.value.toLocaleString()}</div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                      <div 
                        className="bg-blue-600 opacity-80 hover:opacity-100 transition-opacity rounded overflow-hidden"
                        style={{ 
                          '--target-height': `${heightPx}px`,
                          animation: `moving-bars ${animationDuration}s ease-out forwards`,
                          transformOrigin: 'bottom',
                          animationFillMode: 'forwards',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h2v2H1V1zm4 0h2v2H5V1zm4 0h2v2H9V1zm4 0h2v2h-2V1zm4 0h2v2h-2V1z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd'/%3E%3C/svg%3E")`
                        } as React.CSSProperties}
                      />
                      <div className="text-sm font-medium text-gray-400 text-center mt-3">
                        {bar.month}
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">Balance</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button 
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    <div 
                      className={`absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg py-2 z-10 transform origin-top-right transition-all duration-200 ease-out ${
                        isMenuOpen 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <a 
                        href="#" 
                        className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-900 hover:text-blue-400 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span>Deposit Funds</span>
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-900 hover:text-blue-400 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span>Withdraw Funds</span>
                      </a>
                    </div>
                  </div>
                  <span className="p-2 bg-green-900 rounded-lg">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-100">${yearly.toLocaleString()}</p>
              <p className="text-green-400 text-sm">+2.5% from last month</p>
            </div>

            {/* Sales Card */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">Sales</h3>
                <span className="p-2 bg-purple-900 rounded-lg">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-100">384</p>
              <p className="text-purple-400 text-sm">+12.4% from last month</p>
            </div>

            {/* Active Users Card */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">Active Users</h3>
                <span className="p-2 bg-orange-900 rounded-lg">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-100">1,429</p>
              <p className="text-orange-400 text-sm">+5.7% from last month</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <a href="/transactions" className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
              <span className="p-2 bg-indigo-900 rounded-lg">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </span>
              <div>
                <h3 className="font-medium text-gray-200">Payments</h3>
                <p className="text-sm text-gray-400">View transactions</p>
              </div>
            </a>

            <a href="/account" className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
              <span className="p-2 bg-pink-900 rounded-lg">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <div>
                <h3 className="font-medium text-gray-200">Settings</h3>
                <p className="text-sm text-gray-400">Manage account</p>
              </div>
            </a>

            <a href="/reports" className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
              <span className="p-2 bg-yellow-900 rounded-lg">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <div>
                <h3 className="font-medium text-gray-200">Reports</h3>
                <p className="text-sm text-gray-400">View analytics</p>
              </div>
            </a>

            <a href="/support" className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
              <span className="p-2 bg-teal-900 rounded-lg">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <div>
                <h3 className="font-medium text-gray-200">Support</h3>
                <p className="text-sm text-gray-400">Get help</p>
              </div>
            </a>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-100">Your Servers (3/5)</h2>
                <p className="text-sm text-gray-400">You have 5 servers in total. You can add more servers by upgrading your plan.</p>
              </div>
              <button className="p-2 bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <Table
              columns={[
                {
                  header: 'ID',
                  accessor: 'id',
                  className: 'font-mono text-sm text-gray-400'
                },
                {
                  header: 'Server Name',
                  accessor: 'name',
                  className: 'font-medium text-gray-200'
                },
                {
                  header: 'Status',
                  accessor: (server) => (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      server.status === 'online' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                    }`}>
                      {server.status}
                    </span>
                  )
                },
                {
                  header: 'Players',
                  accessor: 'players',
                  className: 'text-gray-300'
                },
                {
                  header: 'Revenue',
                  accessor: (server) => `$${server.revenue.toFixed(2)}`,
                  className: 'text-gray-300'
                }
              ]}
              data={[
                {
                  name: 'Minecraft Server - BungeeCord',
                  status: 'online',
                  players: '24/50',
                  revenue: 156.99,
                  id: "xKjLmNp"
                },
                {
                  name: 'Rust',
                  status: 'online', 
                  players: '12/30',
                  revenue: 89.99,
                  id: "kLmNpQr"
                },
                {
                  name: 'FiveM',
                  status: 'offline',
                  players: '0/100', 
                  revenue: 45.50,
                  id: "aBcDeFg"
                }
              ]}
              onRowClick={(server) => console.log('Clicked server:', server.name)}
            />
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
