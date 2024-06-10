import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.png";

const Banner = () => {
  return (
    <div className="w-full  items-center flex-col justify-center flex mb-2">
      <div className="flex gap-2 items-center">
  <Image src={Logo} alt="logo" className=" w-[50px]  mb-3 " />
          <h2 className="text-2xl font-semibold underline underline-offset-8  text-blue-600">
          DCLM Operational Report
        </h2>
      </div>
    
      <div className=" flex flex-col text-center bg-gray-200 p-3 rounded-md max-w-[600px]  w-full">
    
        <p className="text-md hidden md:block">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quam
          aliquid illo magni voluptates saepe magnam aliquam suscipit cumque a!
        </p>
      </div>
    </div>
  );
};

export default Banner;
