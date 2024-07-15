import React from "react";

const Sidebar = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "Your premiums", value: "premium" },
    { label: "Your elites", value: "elite" },
    { label: "Your normals", value: "normal" },
    { label: "Solved", value: "solved" },
    { label: "Attempted ", value: "attempted" },
  ];

  return (
    <div className="w-1/6 max-h-fit p-0 bg-gray-100 shadow-xl rounded-lg border text-gray-50  duration-300 relative group cursor-pointer overflow-hidden  font-extrabold hover:bg-indigo-200">

      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-14 h-14 rounded-full group-hover:scale-125  duration-700 right-12 top-12 bg-amber-500">
      </div>
      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-125  duration-700 right-20 -top-6 bg-black">
      </div>
      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8  rounded-full group-hover:scale-125  duration-700 right-32 top-6 bg-zinc-500"></div>

      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-10 h-10  rounded-full group-hover:scale-125  duration-700 right-40 top-40 bg-rose-500"></div>

      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-7 h-7   rounded-full group-hover:scale-125  duration-700 right-2 top-12 bg-blue-600">
      </div>
      {filters
        .filter((filter) => filter.value !== selectedFilter) //altering buttons dynamically
        .map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className="w-4/5  z-10 relative m-2 py-1 sm:px-4 md:px-6 lg:px-6 text-black text-base font-bold overflow-hidden bg-white rounded-lg transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 "
          >
            {filter.label}
          </button>
        ))}
    </div>
  );
};

export default Sidebar;
