import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ItemService from "../services/Item.service";

import Swal from "sweetalert2";
const Add = () => {
  const [item, setItem] = useState({
    itemId: "",
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    publisher: "",
    status: "",
    coverImage: "",
    description: "",
    location: "",
    addedDate: "",

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };
  const handleSubmit = async () => {
    console.log(item);

    try {
      // const response = await fetch("http://localhost:5000/api/v1/restaurants", {
      //   method: "POST",
      //   body: JSON.stringify(restaurant),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const response = await ItemService.insertItem();
      // console.log(response);

      if (response.status === 200) {
        Swal.fire({
          title: "Add Item",
          text: "Item added successfully!",
          icon: "success",
        });
        setItem({
          title: "",
          author: "",
          category: "",
          publishYear: "",
          isbn: "",
          publisher: "",
          status: "",
          coverImage: "",
          description: "",
          location: "",
          addedDate: "",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Add restaurant",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-2xl text-center mt-2">Add new Item</h1>
      </div>
      <div className="space-y-2 flex items-center flex-col my-2 w-full">

        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Item Name:
          <input
            type="text"
            name="title"
            value={item.title}
            className="grow w-80"
            placeholder="item Title"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
           Author:
          <input
            type="text"
            name="author"
            value={item.author}
            onChange={handleChange}
            className="grow  w-80"
            placeholder="item Author"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Item ImageUrl:
          <input
            type="text"
            className="grow"
            value={item.coverImage}
            onChange={handleChange}
            placeholder="Item ImageUrl"
            name="coverImage"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Category:
          <input
            type="text"
            name="category"
            value={item.category}
            className="grow w-80"
            placeholder="item Category"
            onChange={handleChange}
          />
        </label>
                <label className="input input-bordered flex items-center gap-2 w-[500px]">
          publishYear:
          <input
            type="text"
            name="publishYear"
            value={item.publishYear}
            className="grow w-80"
            placeholder="item publishYear"
            onChange={handleChange}
          />
        </label>
                <label className="input input-bordered flex items-center gap-2 w-[500px]">
          isbn:
          <input
            type="text"
            name="isbn"
            value={item.isbn}
            className="grow w-80"
            placeholder="item isbn"
            onChange={handleChange}
          />
        </label>
                <label className="input input-bordered flex items-center gap-2 w-[500px]">
          publisher:
          <input
            type="text"
            name="publisher"
            value={item.publisher}
            className="grow w-80"
            placeholder="item publisher"
            onChange={handleChange}
          />
        </label>
                <label className="input input-bordered flex items-center gap-2 w-[500px]">
          edition:
          <input
            type="text"
            name="edition"
            value={item.edition}
            className="grow w-80"
            placeholder="item edition"
            onChange={handleChange}
          />
        </label>
                <label className="input input-bordered flex items-center gap-2 w-[500px]">
          pageCount:
          <input
            type="text"
            name="pageCount"
            value={item.pageCount}
            className="grow w-80"
            placeholder="item pageCount"
            onChange={handleChange}
          />
        </label>
                <label className="input input-bordered flex items-center gap-2 w-[500px]">
          language:
          <input
            type="text"
            name="language"
            value={item.language}
            className="grow w-80"
            placeholder="item language"
            onChange={handleChange}
          />
        </label>
                <label className="input input-bordered flex items-center gap-2 w-[500px]">
          genre:
          <input
            type="text"
            name="genre"
            value={item.genre}
            className="grow w-80"
            placeholder="item genre"
            onChange={handleChange}
          />
        </label>
                <label className="input input-bordered flex items-center gap-2 w-[500px]">
          description:
          <input
            type="text"
            name="description"
            value={item.description}
            className="grow w-80"
            placeholder="item description"
            onChange={handleChange}
          />
        </label>

        {item.coverImage && (
          <div className="flex items-center gap-2">
            <img className="h-32" src={item.coverImage} />
          </div>
        )}
        <div className="space-x-2">
          <button
            className="btn btn-outline btn-success"
            onClick={handleSubmit}
          >
            Add
          </button>
          <button className="btn btn-outline btn-error">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Add;