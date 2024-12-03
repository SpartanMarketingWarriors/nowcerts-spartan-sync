const { useState } = React;

function AccountManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'your-secure-password'; // Change this

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('auth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  const [accounts, setAccounts] = useState({
    ghl: [],
    nowcerts: []
  });

  // Account management functions
  const addGHLSubaccount = () => {
    setAccounts(prev => ({
      ...prev,
      ghl: [...prev.ghl, { locationId: '', apiKey: '', nowcertsAgencyId: '' }]
    }));
  };

  const addNowcertsAccount = () => {
    setAccounts(prev => ({
      ...prev,
      nowcerts: [...prev.nowcerts, { agencyId: '', apiKey: '' }]
    }));
  };

  const updateGHL = (index, field, value) => {
    setAccounts(prev => ({
      ...prev,
      ghl: prev.ghl.map((account, i) => 
        i === index ? { ...account, [field]: value } : account
      )
    }));
  };

  const updateNowcerts = (index, field, value) => {
    setAccounts(prev => ({
      ...prev,
      nowcerts: prev.nowcerts.map((account, i) => 
        i === index ? { ...account, [field]: value } : account
      )
    }));
  };

  const generateConfig = () => {
    const config = {
      GHL_SUBACCOUNTS: JSON.stringify(accounts.ghl, null, 2),
      NOWCERTS_ACCOUNTS: JSON.stringify(accounts.nowcerts, null, 2)
    };
    return Object.entries(config)
      .map(([key, value]) => `${key}='${value}'`)
      .join('\n');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Account Manager Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">GoHighLevel Subaccounts</h2>
        {accounts.ghl.map((account, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location ID</label>
              <input
                type="text"
                value={account.locationId}
                onChange={e => updateGHL(index, 'locationId', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="GHL Location ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">API Key</label>
              <input
                type="password"
                value={account.apiKey}
                onChange={e => updateGHL(index, 'apiKey', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="GHL API Key"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">NowCerts Agency ID</label>
              <input
                type="text"
                value={account.nowcertsAgencyId}
                onChange={e => updateGHL(index, 'nowcertsAgencyId', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Corresponding NowCerts Agency ID"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addGHLSubaccount}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add GHL Subaccount
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">NowCerts Agencies</h2>
        {accounts.nowcerts.map((account, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Agency ID</label>
              <input
                type="text"
                value={account.agencyId}
                onChange={e => updateNowcerts(index, 'agencyId', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="NowCerts Agency ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">API Key</label>
              <input
                type="password"
                value={account.apiKey}
                onChange={e => updateNowcerts(index, 'apiKey', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="NowCerts API Key"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addNowcertsAccount}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add NowCerts Agency
        </button>
      </div>

      {(accounts.ghl.length > 0 || accounts.nowcerts.length > 0) && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Generated Configuration</h3>
          <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto">
            {generateConfig()}
          </pre>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<AccountManager />, document.getElementById('root'));