import React from "react";

function Button({ children, onClick }) {
  return (
    <button
      type="submit"
      className="bg-[#5457b6] w-full  text-white p-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
