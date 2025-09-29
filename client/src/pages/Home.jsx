import React, { useState, useEffect } from "react";
import Restaurants from "../components/Item";
import RestaurantService from "../services/Item.service";
import Swal from "sweetalert2";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // โหลดข้อมูลร้านอาหาร
  useEffect(() => {
    const getAllRestaurant = async () => {
      try {
        const response = await RestaurantService.getAllRestaurants();
        if (response.status === 200) {
          setRestaurants(response.data);
          setFilteredRestaurants(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    getAllRestaurant();
  }, []);

  // ฟังก์ชันค้นหา
  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredRestaurants(restaurants);
      return;
    }
    const filtered = restaurants.filter(
      (r) =>
        r.name?.toLowerCase().includes(keyword.toLowerCase()) ||
        r.type?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div className="container mx-auto">

      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurant
        </h1>
      </div>

      {/* Search Box */}
      <div className="mb-5 flex justify-center items-center">
        <label className="input flex items-center gap-2 w-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
          />
        </label>
      </div>

      {/* ส่งค่าไปที่ Restaurants */}
      <Restaurants restaurants={filteredRestaurants} />
    </div>
  );
};

export default Home;
