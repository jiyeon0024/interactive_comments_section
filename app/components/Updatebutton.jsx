import React from "react";

function Updatebutton({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="bg-[#5457b6] text-white px-6 py-2 rounded-lg "
    >
      Update
    </button>
  );
}

export default Updatebutton;
