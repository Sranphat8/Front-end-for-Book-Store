import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantService from "../services/Item.service.js";
import Swal from "sweetalert2";
const Update = () => {
  //1.Get Id from URL
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });

  //2. Get Restaurant by ID
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await RestaurantService.getRestaurantById(id);
        if (response.status === 200) {
          setRestaurant(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Fetch restaurant",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      // const response = await fetch(
      //   "http://localhost:5000/api/v1/restaurants/" + id,
      //   {
      //     method: "PUT",
      //     body: JSON.stringify(restaurant),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const response = await RestaurantService.editRestaurantById(
        id,
        restaurant
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Update restaurant",
          text: "Restaurant updated successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Update restaurant",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-2xl text-center mt-2">Update restaurant</h1>
      </div>
      <div className="space-y-2 flex items-center flex-col my-2 w-full">
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant Name:
          <input
            type="text"
            name="name"
            value={restaurant.name}
            className="grow w-80"
            placeholder="Restaurant Name"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant Type:
          <input
            type="text"
            name="type"
            value={restaurant.type}
            onChange={handleChange}
            className="grow  w-80"
            placeholder="Restaurant Type"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant ImageUrl:
          <input
            type="text"
            className="grow"
            value={restaurant.imageUrl}
            onChange={handleChange}
            placeholder="Restaurant ImageUrl"
            name="imageUrl"
          />
        </label>
        {restaurant.imageUrl && (
          <div className="flex items-center gap-2">
            <img className="h-32" src={restaurant.imageUrl} />
          </div>
        )}
        <div className="space-x-2">
          <button
            className="btn btn-outline btn-success"
            onClick={handleSubmit}
          >
            Update
          </button>
          <button className="btn btn-outline btn-error">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Update;
