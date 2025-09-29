import React from "react";
import Card from "./Card";

const Items = ({ items }) => {


  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {items &&
          user &&
          items.map((item) => {
            return (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                imageUrl={item.imageUrl}
              />
            );
          })}

        {!user && (
          <div className="w-full flex justify-center mt-10 text-lg font-semibold text-gray-700">
            You don't have permission to access this content
          </div>
        )}

        {!restaurants && (
          <div className="w-full flex justify-center mt-10 text-lg font-semibold text-gray-700">
            No content
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
