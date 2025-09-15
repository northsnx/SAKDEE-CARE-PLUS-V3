import React, { useState } from "react";

const ShopCreate = () => {
  const [shop, setShop] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    iconUrl: "",
  });

  const [machines, setMachines] = useState([
    { type: "", sizeKg: "", status: "" },
  ]);

  const [loading, setLoading] = useState(false);

  // handle shop info
  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  // handle machine info
  const handleMachineChange = (index, e) => {
    const updated = [...machines];
    updated[index][e.target.name] = e.target.value;
    setMachines(updated);
  };

  const addMachine = () => {
    setMachines([...machines, { type: "", sizeKg: "", status: "" }]);
  };

  const removeMachine = (index) => {
    const updated = machines.filter((_, i) => i !== index);
    setMachines(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...shop,
      latitude: parseFloat(shop.latitude),
      longitude: parseFloat(shop.longitude),
      machines: machines.map((m) => ({
        ...m,
        sizeKg: parseInt(m.sizeKg),
      })),
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/shops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("สร้างร้านไม่สำเร็จ");

      const data = await res.json();
      alert("สร้างร้านสำเร็จ!");
      console.log(data);

      // reset
      setShop({ name: "", address: "", latitude: "", longitude: "", iconUrl: "" });
      setMachines([{ type: "", sizeKg: "", status: "" }]);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-10">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-gray-100 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">🏪 Create Laundry Shop</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Shop Info */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={shop.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={shop.address}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={shop.latitude}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={shop.longitude}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Icon URL</label>
            <input
              type="text"
              name="iconUrl"
              value={shop.iconUrl}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          {/* Machines Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">🛠️ Machines</h3>
            {machines.map((m, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  name="type"
                  placeholder="Type (เช่น เครื่องซักผ้า)"
                  value={m.type}
                  onChange={(e) => handleMachineChange(index, e)}
                  className="flex-1 p-2 rounded bg-gray-700 border border-gray-600"
                />
                <input
                  type="number"
                  name="sizeKg"
                  placeholder="Kg"
                  value={m.sizeKg}
                  onChange={(e) => handleMachineChange(index, e)}
                  className="w-24 p-2 rounded bg-gray-700 border border-gray-600"
                />
                <select
                  name="status"
                  value={m.status}
                  onChange={(e) => handleMachineChange(index, e)}
                  className="w-28 p-2 rounded bg-gray-700 border border-gray-600"
                >
                  <option value="">เลือก</option>
                  <option value="ว่าง">ว่าง</option>
                  <option value="ไม่ว่าง">ไม่ว่าง</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeMachine(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMachine}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mt-2"
            >
              ➕ Add Machine
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition mt-4"
          >
            {loading ? "กำลังบันทึก..." : "บันทึกข้อมูลร้าน"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopCreate;
