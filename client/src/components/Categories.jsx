import React from 'react';
import { assets, categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-transform hover:shadow-md hover:scale-105"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-20 h-20 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
            />
            <p className="text-sm font-medium text-center">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
