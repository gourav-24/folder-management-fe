// components/MenuForm.tsx
import React from "react";

const MenuForm = () => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <form>
        <div>
          <label>Menu ID</label>
          <input
            type="text"
            value="56320ee9-6af6-11ed-a7ba-f220afe5e4a9"
            className="w-full p-2 border rounded bg-gray-100"
            disabled
          />
        </div>
        <div>
          <label>Depth</label>
          <input type="text" value="3" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label>Parent Data</label>
          <input type="text" value="Systems" className="w-full p-2 border" defaultValue={`test`} />
        </div>
        <div>
          <label>Name</label>
          <input type="text" value="System Code" className="w-full p-2 border" />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
