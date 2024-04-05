/* eslint-disable react/prop-types */
import { FiSearch } from "react-icons/fi";
export default function Search({ searchQuery, handleSearchChange }) {
  return (
    <div className="searchBox">
       <input
        value={searchQuery}
        onChange={handleSearchChange}
        type="search"
        placeholder="Search Vessels..."
      />
     <FiSearch />
    </div>
  )
}