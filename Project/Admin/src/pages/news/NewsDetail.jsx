import React, { useState } from "react";

const NewsDetail = () => {
  const [id, setId] = useState(""); // id ที่ user กรอก
  const [news, setNews] = useState(null); // ข้อมูลข่าว
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันกดปุ่มหรือ Enter เพื่อ fetch API
  const handleFetch = async (e) => {
    if (e) e.preventDefault(); // กัน reload หน้าเวลา submit form

    if (!id) {
      alert("กรุณากรอก ID ก่อน");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/news/${id}`);
      const data = await res.json();
      setNews(data.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-gray-100 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          🔍 ค้นหา News ด้วย ID
        </h2>

        {/* ใช้ form เพื่อรองรับ Enter */}
        <form onSubmit={handleFetch} className="flex gap-2 mb-6 justify-center">
          <input
            type="number"
            placeholder="ใส่ News ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border p-2 rounded w-40 bg-gray-700 text-white focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            ค้นหา
          </button>
        </form>

        {/* loading */}
        {loading && <p className="text-center text-gray-400">Loading...</p>}

        {/* แสดงข้อมูล */}
        {news && (
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
            <p className="text-gray-300 mb-4">{news.content}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {news.images?.map((img) => (
                <img
                  key={img.image_id}
                  src={img.url}
                  alt="news"
                  className="w-48 rounded-lg shadow-md border border-gray-700"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
