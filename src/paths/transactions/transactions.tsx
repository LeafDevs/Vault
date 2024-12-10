import { useState } from 'react';
import Nav from '../../components/nav';
import SidebarFin from '../../components/sidebar-fin';
import Table from '../../components/table';
import { TableColumn } from '../../components/table';
import Footer from '../../components/footer';

interface Transaction {
  id: string;
  date: string;
  playerName: string;
  serverName: string;
  itemName: string;
  amount: number;
  status: string;
  paymentMethod: string;
}

export default function Transactions() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggle = () => {
    const newIsOpen = !isSidebarOpen;
    setIsSidebarOpen(newIsOpen);
    localStorage.setItem('isOpen', newIsOpen.toString());
  };

  const transactions: Transaction[] = [
    // Minecraft Server - BungeeCord transactions
    {
      id: "TX123",
      date: "2024-01-15",
      playerName: "DragonSlayer99",
      serverName: "Minecraft Server - BungeeCord",
      itemName: "Diamond Sword Pack",
      amount: 9.99,
      status: "Completed",
      paymentMethod: "Apple Pay"
    },
    {
      id: "TX124",
      date: "2024-01-14", 
      playerName: "CraftMaster2000",
      serverName: "Minecraft Server - BungeeCord",
      itemName: "Builder's Bundle",
      amount: 24.99,
      status: "Completed",
      paymentMethod: "Google Pay"
    },
    {
      id: "TX125",
      date: "2024-01-13",
      playerName: "PvPChampion", 
      serverName: "Minecraft Server - BungeeCord",
      itemName: "Premium Armor Set",
      amount: 15.99,
      status: "Completed",
      paymentMethod: "Card"
    },
    {
      id: "TX126",
      date: "2024-01-12",
      playerName: "MinecraftPro",
      serverName: "Minecraft Server - BungeeCord", 
      itemName: "VIP Rank",
      amount: 49.99,
      status: "Completed",
      paymentMethod: "PayPal"
    },
    {
      id: "TX127",
      date: "2024-01-11",
      playerName: "BlockBuilder",
      serverName: "Minecraft Server - BungeeCord",
      itemName: "Resource Pack Bundle",
      amount: 19.99,
      status: "Completed",
      paymentMethod: "Crypto"
    },
    {
      id: "TX138",
      date: "2024-01-10",
      playerName: "EnderQueen",
      serverName: "Minecraft Server - BungeeCord",
      itemName: "End Dragon Pet",
      amount: 29.99,
      status: "Completed",
      paymentMethod: "Apple Pay"
    },
    {
      id: "TX139",
      date: "2024-01-09",
      playerName: "RedstoneWizard",
      serverName: "Minecraft Server - BungeeCord",
      itemName: "Technical Bundle",
      amount: 34.99,
      status: "Pending",
      paymentMethod: "Google Pay"
    },
    {
      id: "TX145",
      date: "2024-01-08",
      playerName: "NetherKnight",
      serverName: "Minecraft Server - BungeeCord",
      itemName: "Nether Warrior Pack",
      amount: 39.99,
      status: "Completed",
      paymentMethod: "PayPal"
    },
    {
      id: "TX146",
      date: "2024-01-07",
      playerName: "OceanExplorer",
      serverName: "Minecraft Server - BungeeCord",
      itemName: "Aquatic Bundle",
      amount: 27.99,
      status: "Completed",
      paymentMethod: "Card"
    },
    {
      id: "TX147",
      date: "2024-01-06",
      playerName: "SkyBuilder",
      serverName: "Minecraft Server - BungeeCord",
      itemName: "Flying Pack",
      amount: 22.99,
      status: "Pending",
      paymentMethod: "Crypto"
    },

    // Rust transactions
    {
      id: "TX128",
      date: "2024-01-15",
      playerName: "RustRaider",
      serverName: "Rust",
      itemName: "Weapon Skin Pack",
      amount: 12.99,
      status: "Completed",
      paymentMethod: "Apple Pay"
    },
    {
      id: "TX129",
      date: "2024-01-14",
      playerName: "SurvivalPro",
      serverName: "Rust",
      itemName: "Base Building Kit",
      amount: 29.99,
      status: "Pending",
      paymentMethod: "PayPal"
    },
    {
      id: "TX130",
      date: "2024-01-13",
      playerName: "RustWarrior",
      serverName: "Rust",
      itemName: "Premium Tools",
      amount: 19.99,
      status: "Completed",
      paymentMethod: "Google Pay"
    },
    {
      id: "TX131",
      date: "2024-01-12",
      playerName: "RaidMaster",
      serverName: "Rust",
      itemName: "Elite Pass",
      amount: 39.99,
      status: "Completed",
      paymentMethod: "Card"
    },
    {
      id: "TX132",
      date: "2024-01-11",
      playerName: "RustKing",
      serverName: "Rust",
      itemName: "Vehicle Package",
      amount: 34.99,
      status: "Completed",
      paymentMethod: "Crypto"
    },
    {
      id: "TX140",
      date: "2024-01-10",
      playerName: "BaseBuilder",
      serverName: "Rust",
      itemName: "Fortification Pack",
      amount: 24.99,
      status: "Completed",
      paymentMethod: "PayPal"
    },
    {
      id: "TX141",
      date: "2024-01-09",
      playerName: "ScrapHunter",
      serverName: "Rust",
      itemName: "Resource Booster",
      amount: 15.99,
      status: "Pending",
      paymentMethod: "Apple Pay"
    },
    {
      id: "TX148",
      date: "2024-01-08",
      playerName: "RadiationKing",
      serverName: "Rust",
      itemName: "Hazmat Bundle",
      amount: 45.99,
      status: "Completed",
      paymentMethod: "Google Pay"
    },
    {
      id: "TX149",
      date: "2024-01-07",
      playerName: "HeliPilot",
      serverName: "Rust",
      itemName: "Aircraft Pack",
      amount: 59.99,
      status: "Completed",
      paymentMethod: "Card"
    },
    {
      id: "TX150",
      date: "2024-01-06",
      playerName: "CoastalRaider",
      serverName: "Rust",
      itemName: "Naval Warfare Pack",
      amount: 32.99,
      status: "Pending",
      paymentMethod: "PayPal"
    },

    // FiveM transactions
    {
      id: "TX133",
      date: "2024-01-15",
      playerName: "RPMaster",
      serverName: "FiveM",
      itemName: "Car Pack Premium",
      amount: 59.99,
      status: "Completed",
      paymentMethod: "Crypto"
    },
    {
      id: "TX134",
      date: "2024-01-14",
      playerName: "CityLife",
      serverName: "FiveM",
      itemName: "Property Bundle",
      amount: 79.99,
      status: "Pending",
      paymentMethod: "Apple Pay"
    },
    {
      id: "TX135",
      date: "2024-01-13",
      playerName: "StreetRacer",
      serverName: "FiveM",
      itemName: "Custom Garage",
      amount: 44.99,
      status: "Completed",
      paymentMethod: "Google Pay"
    },
    {
      id: "TX136",
      date: "2024-01-12",
      playerName: "CopLife",
      serverName: "FiveM",
      itemName: "Police Pack",
      amount: 29.99,
      status: "Completed",
      paymentMethod: "PayPal"
    },
    {
      id: "TX137",
      date: "2024-01-11",
      playerName: "DriftKing",
      serverName: "FiveM",
      itemName: "Drift Car Bundle",
      amount: 49.99,
      status: "Completed",
      paymentMethod: "Card"
    },
    {
      id: "TX142",
      date: "2024-01-10",
      playerName: "MedicHero",
      serverName: "FiveM",
      itemName: "Emergency Services Pack",
      amount: 39.99,
      status: "Completed",
      paymentMethod: "Crypto"
    },
    {
      id: "TX143",
      date: "2024-01-09",
      playerName: "GangLeader",
      serverName: "FiveM",
      itemName: "Criminal Enterprise Pack",
      amount: 69.99,
      status: "Pending",
      paymentMethod: "Apple Pay"
    },
    {
      id: "TX144",
      date: "2024-01-08",
      playerName: "RacingPro",
      serverName: "FiveM",
      itemName: "Racing Circuit Bundle",
      amount: 54.99,
      status: "Completed",
      paymentMethod: "Google Pay"
    },
    {
      id: "TX151",
      date: "2024-01-07",
      playerName: "TaxiDriver",
      serverName: "FiveM",
      itemName: "Transport Business Pack",
      amount: 42.99,
      status: "Completed",
      paymentMethod: "PayPal"
    },
    {
      id: "TX152",
      date: "2024-01-06",
      playerName: "RestaurantOwner",
      serverName: "FiveM",
      itemName: "Business Starter Pack",
      amount: 89.99,
      status: "Pending",
      paymentMethod: "Card"
    }
  ];

  const columns: TableColumn<Transaction>[] = [
    {
      header: "Transaction ID",
      accessor: "id" as keyof Transaction
    },
    {
      header: "Date",
      accessor: "date" as keyof Transaction
    },
    {
      header: "Player",
      accessor: "playerName" as keyof Transaction
    },
    {
      header: "Server",
      accessor: "serverName" as keyof Transaction
    },
    {
      header: "Item",
      accessor: "itemName" as keyof Transaction
    },
    {
      header: "Amount",
      accessor: (transaction: Transaction) => `$${transaction.amount.toFixed(2)}`
    },
    {
      header: "Payment Method",
      accessor: "paymentMethod" as keyof Transaction
    },
    {
      header: "Status",
      accessor: (transaction: Transaction) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {transaction.status}
        </span>
      )
    }
  ];

  return (
    <>
      <Nav onToggle={handleToggle} />
      <SidebarFin isOpen={isSidebarOpen} onToggle={handleToggle} />
      <main id="main" className={`transition-all duration-300 p-24 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="mt-2 text-gray-600">View all transactions across your game servers</p>
          </div>

          <div className="mb-6">
            <div className="max-w-md">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Transaction ID
              </label>
              <input
                type="text"
                id="search"
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter transaction ID... (e.g. TX14* or TX141-TX151)"
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  if (searchValue === '') {
                    setFilteredTransactions([]);
                  } else if (searchValue.includes('*')) {
                    // Handle wildcard search
                    const searchPattern = searchValue.replace('*', '');
                    const filteredData = transactions.filter(transaction =>
                      transaction.id.toLowerCase().startsWith(searchPattern)
                    );
                    setFilteredTransactions(filteredData);
                  } else if (searchValue.includes('-')) {
                    // Handle range search
                    const [start, end] = searchValue.split('-');
                    const startNum = parseInt(start.replace(/\D/g, ''));
                    const endNum = parseInt(end.replace(/\D/g, ''));
                    const prefix = start.replace(/[0-9]/g, '');
                    
                    const filteredData = transactions.filter(transaction => {
                      const txNum = parseInt(transaction.id.replace(/\D/g, ''));
                      return transaction.id.startsWith(prefix) && 
                             txNum >= startNum && 
                             txNum <= endNum;
                    });
                    setFilteredTransactions(filteredData);
                  } else {
                    // Handle normal search
                    const filteredData = transactions.filter(transaction =>
                      transaction.id.toLowerCase().includes(searchValue)
                    );
                    setFilteredTransactions(filteredData);
                  }
                }}
              />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
            <Table 
              data={filteredTransactions.length > 0 ? 
                filteredTransactions.slice((currentPage - 1) * 20, currentPage * 20) :
                transactions.slice((currentPage - 1) * 20, currentPage * 20)
              }
              columns={columns}
            />
            
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{((currentPage - 1) * 20) + 1}</span>
                  {' '}-{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * 20, (filteredTransactions.length > 0 ? filteredTransactions.length : transactions.length))}
                  </span>
                  {' '}of{' '}
                  <span className="font-medium">{filteredTransactions.length > 0 ? filteredTransactions.length : transactions.length}</span>
                  {' '}results
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-gray-700">
                  Page {currentPage} of {Math.ceil((filteredTransactions.length > 0 ? filteredTransactions.length : transactions.length) / 20)}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil((filteredTransactions.length > 0 ? filteredTransactions.length : transactions.length) / 20), p + 1))}
                  disabled={currentPage >= Math.ceil((filteredTransactions.length > 0 ? filteredTransactions.length : transactions.length) / 20)}
                  className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

