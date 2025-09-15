import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // โหลด user ทั้งหมด
  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ฟังก์ชันลบ user
  const handleDelete = async (id) => {
    if (!window.confirm("คุณแน่ใจว่าจะลบ user นี้?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Delete failed");
      }

      // refresh users หลังลบ
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("ลบไม่สำเร็จ");
    }
  };

  // slice data ตาม page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <div className="overflow-x-auto border border-gray-700 rounded">
            <table className="w-full bg-gray-800 text-gray-100 text-sm">
              <thead>
                <tr className="bg-gray-700">
                  <th className="border px-2 py-1 text-left">ID</th>
                  <th className="border px-2 py-1 text-left">Name</th>
                  <th className="border px-2 py-1 text-left">Email</th>
                  <th className="border px-2 py-1 text-left">Verified</th>
                  <th className="border px-2 py-1 text-left">Role</th>
                  <th className="border px-2 py-1 text-left">Created At</th>
                  <th className="border px-2 py-1 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((u) => (
                  <tr key={u.user_id} className="hover:bg-gray-700">
                    <td className="border px-2 py-1">{u.user_id}</td>
                    <td className="border px-2 py-1">{u.name}</td>
                    <td className="border px-2 py-1">{u.email}</td>
                    <td className="border px-2 py-1">
                      {u.isVerified ? "✅" : "❌"}
                    </td>
                    <td className="border px-3 py-3">{u.role}</td>
                    <td className="border px-3 py-3">
                      {new Date(u.created_at).toLocaleString()}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      <button
                        onClick={() => handleDelete(u.user_id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 space-x-2 min-h-[60px]">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-red-400 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-gray-200 hover:bg-blue-400"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-red-400 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
