import React, { useEffect, useState } from "react";

const AdminClimate = () => {
  const [climates, setClimates] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTc5MjAxOTYsImV4cCI6MTc1NzkyMDc5Nn0.Cez1NPrnfEhG5-tfRNQX_4dDLm3-vGeJpKlD_RJu9UM";

  const cities = [
  "Bangkok",
  "Amnat Charoen",
  "Ang Thong",
  "Bueng Kan",
  "Buri Ram",
  "Chachoengsao",
  "Chai Nat",
  "Chaiyaphum",
  "Chanthaburi",
  "Chiang Mai",
  "Chiang Rai",
  "Chonburi",
  "Chumphon",
  "Kalasin",
  "Kamphaeng Phet",
  "Kanchanaburi",
  "Khon Kaen",
  "Krabi",
  "Lampang",
  "Lamphun",
  "Loei",
  "Lopburi",
  "Mae Hong Son",
  "Maha Sarakham",
  "Mukdahan",
  "Nakhon Nayok",
  "Nakhon Pathom",
  "Nakhon Phanom",
  "Nakhon Ratchasima",
  "Nakhon Sawan",
  "Nakhon Si Thammarat",
  "Nan",
  "Narathiwat",
  "Nong Bua Lamphu",
  "Nong Khai",
  "Nonthaburi",
  "Pathum Thani",
  "Pattani",
  "Phang Nga",
  "Phatthalung",
  "Phayao",
  "Phetchabun",
  "Phetchaburi",
  "Phichit",
  "Phitsanulok",
  "Phra Nakhon Si Ayutthaya",
  "Phrae",
  "Phuket",
  "Prachinburi",
  "Prachuap Khiri Khan",
  "Ranong",
  "Ratchaburi",
  "Rayong",
  "Roi Et",
  "Sa Kaeo",
  "Sakon Nakhon",
  "Samut Prakan",
  "Samut Sakhon",
  "Samut Songkhram",
  "Saraburi",
  "Satun",
  "Sing Buri",
  "Sisaket",
  "Songkhla",
  "Sukhothai",
  "Suphan Buri",
  "Surat Thani",
  "Surin",
  "Tak",
  "Trang",
  "Trat",
  "Ubon Ratchathani",
  "Udon Thani",
  "Uthai Thani",
  "Uttaradit",
  "Yala",
  "Yasothon"
];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          cities.map(async (city) => {
            const res = await fetch(
              `http://localhost:3000/api/climate?city=${city}`,
              {
                headers: { Authorization: token },
              }
            );
            return res.json();
          })
        );
        setClimates(results);
      } catch (err) {
        console.error("Error fetching climate data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // pagination slice
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentClimates = climates.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(climates.length / itemsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        กำลังโหลดข้อมูล...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">🌤 Climate Dashboard</h1>
      
      {/* card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentClimates.map((c, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-2">
              {c.data?.city || "Unknown"}
            </h2>
            <p>🌡 Temp: {c.data?.temp} °C</p>
            <p>💧 Humidity: {c.data?.humidity}%</p>
            <p>☁ Weather: {c.data?.weather}</p>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-red-400 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminClimate;
