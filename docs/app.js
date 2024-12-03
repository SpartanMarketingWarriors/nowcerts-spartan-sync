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

  // ... [Rest of the AccountManager component code from previous artifact]

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
    // ... [Previous AccountManager JSX from the artifact]
  );
}

ReactDOM.render(<AccountManager />, document.getElementById('root'));