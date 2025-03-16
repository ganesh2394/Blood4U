const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <ul className="mt-4">
        <li className="py-2">
          <a href="/dashboard">Home</a>
        </li>
        <li className="py-2">
          <a href="/profile">Profile</a>
        </li>
        <li className="py-2">
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
