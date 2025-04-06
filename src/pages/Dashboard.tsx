import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'owner':
        return (
          <div>
            <h2 className="text-2xl font-bold">Owner Dashboard</h2>
            <p>View all stores, financial reports, and system settings</p>
          </div>
        );
      case 'manager':
        return (
          <div>
            <h2 className="text-2xl font-bold">Manager Dashboard</h2>
            <p>Manage inventory, view sales reports, and place orders</p>
          </div>
        );
      case 'admin':
        return (
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p>Manage users, system configuration, and integrations</p>
          </div>
        );
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Welcome, {user.name} ({user.role})
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              {getDashboardContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}