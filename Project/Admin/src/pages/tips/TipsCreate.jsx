import React, { useState } from "react";

const TipsCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/tips", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      alert("Tips created successfully!");
      console.log(data);

      // reset form
      setTitle("");
      setContent("");
      setImage(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการอัพโหลด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-gray-100 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">💡 Create Tips</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="ใส่หัวข้อ Tips"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 text-sm font-medium">Content</label>
            <textarea
              placeholder="รายละเอียด Tips"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">Upload Image</label>
            <div className="flex items-center gap-3">
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Choose File
              </label>
              <span className="text-gray-400 text-sm">
                {image ? image.name : "ยังไม่ได้เลือกไฟล์"}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
          >
            {loading ? "กำลังบันทึก..." : "บันทึก Tips"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TipsCreate;
