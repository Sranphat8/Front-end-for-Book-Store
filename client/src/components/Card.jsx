import React, { use } from "react";

import RestaurantService from "../services/Item.service.js";
import Swal from "sweetalert2";
const Card = (props) => {
  
  const handleDelete = async (id) => {
    try {
      // const response = await fetch(
      //   "http://localhost:5000/api/v1/restaurants/" + id,
      //   {
      //     method: "DELETE",
      //   }
      // );
      const response = await RestaurantService.deleteRestaurant(id);
      if (response.status === 200) {
        Swal.fire({
          title: "Delete restaurant",
          text: "Restaurant updated successfully!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Delete restaurant",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img 
        src={props.imageUrl} 
        alt="Shoes" 
        className="w-full h-52 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.type}</p>
        {user && user?.authorities?.includes("ROLES_ADMIN") && (
          <div className="card-actions justify-end">
            <button
              onClick={() => handleDelete(props.id)}
              className=" btn btn-outline btn-error"
            >
              Delete
            </button>
            <a href={"/update/" + props.id} className="btn btn-outline btn-warning">
              Edit
            </a>
          </div>
        )}
        {user && user?.authorities?.includes("ROLES_MODERATOR") && (
          <div className="card-actions justify-end">
            <a href={"/update/" + props.id} className="btn btn-outline btn-warning">
              Edit
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
