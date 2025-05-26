import React from 'react';
import { assets, features } from "../assets/assets";

const ButtomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Background Images */}
      <img src={assets.bottom_banner_image} alt="banner_img" className="w-full hidden md:block" />
      <img src={assets.bottom_banner_image_sm} alt="banner_img" className="w-full block md:hidden" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div className=" p-6  md:w-auto">
          <h1 className="text-primary text-2xl md:text-3xl font-semibold mb-6 text-center md:text-right">
            Why We Are the Best?
          </h1>

          {
            features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 mt-4">
                <img src={feature.icon} alt={feature.title} className="w-9 md:w-11" />
                <div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="text-sm opacity-80">{feature.description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ButtomBanner;
