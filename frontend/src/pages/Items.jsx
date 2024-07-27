import { useState } from 'react';
import ItemTable from '../components/Item_Components/ItemTable';
import ItemImage from '../assets/itemPage/Item1.jpg';

const Items = () => {
  const [activeTab, setActiveTab] = useState('Indoor');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortSport, setSortSport] = useState(true);
  const [sortCount, setSortCount] = useState('asc');

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortSportChange = () => setSortSport(!sortSport);
  const handleSortCountChange = (e) => setSortCount(e.target.value);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="text-xl mb-2">
          <span>Hello Alesia K. 👋</span>
        </div>
        <div className="relative">
          <img 
            src={ItemImage}
            alt="Equipment Banner" 
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
            <h1 className="text-white text-3xl font-bold">Equipment</h1>
          </div>
        </div>
      </div>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'Indoor' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('Indoor')}
        >
          Indoor
        </button>
        <button
          className={`px-4 py-2 ml-2 ${activeTab === 'Outdoor' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('Outdoor')}
        >
          Outdoor
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full max-w-xs"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex items-center">
          <span className="mr-2">Sort by:</span>
          <button
            className={`px-4 py-2 ${sortSport ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={handleSortSportChange}
          >
            Sport
          </button>
          <select
            className="ml-2 border p-2 rounded"
            value={sortCount}
            onChange={handleSortCountChange}
          >
            <option value="asc">Count Ascending</option>
            <option value="desc">Count Descending</option>
          </select>
        </div>
      </div>
      <ItemTable />
    </div>
  );
};

export default Items;
