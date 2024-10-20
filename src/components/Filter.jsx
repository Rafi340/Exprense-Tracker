import { useState } from "react";
import { options } from "./DropdownOption";
const Filter = ({ transactionType }) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="filter-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setShowFilter(!showFilter)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-alt"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8h4v4h-4z" />
              <path d="M6 4l0 4" />
              <path d="M6 12l0 8" />
              <path d="M10 14h4v4h-4z" />
              <path d="M12 4l0 10" />
              <path d="M12 18l0 2" />
              <path d="M16 5h4v4h-4z" />
              <path d="M18 4l0 1" />
              <path d="M18 9l0 11" />
            </svg>
          </button>
        </div>
        {showFilter ? (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="filter-button"
            tabIndex="-1"
            id="filter-dropdown"
          >
            <div className="py-1" role="none">
              {options[transactionType]?.map((option, index) => (
                <label
                  className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
                  key={index}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                    id="filter-option-1"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Filter;
