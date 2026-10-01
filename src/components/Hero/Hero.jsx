import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroImage from "../../assets/Banner_img.jpg";
import "./Hero.css";
import Model from "../utils/popModel/Model";
import Banner from "../utils/HeroBanner/Banner";
import Home from "../Home";
import { Spinner, Alert } from "flowbite-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const {
    data: heroData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["heroData"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/homehero`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  console.log(heroData);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] w-full animate-pulse bg-gray-100 rounded-2xl">
        <div className="w-3/4 h-10 bg-gray-200 rounded-full mb-4" />
        <div className="w-1/2 h-6 bg-gray-200 rounded-full mb-2" />
        <div className="w-1/3 h-6 bg-gray-200 rounded-full mb-2" />
        <div className="w-1/2 h-6 bg-gray-200 rounded-full mb-2" />
        <div className="w-1/4 h-6 bg-gray-200 rounded-full mb-2" />
        <div className="w-1/2 h-6 bg-gray-200 rounded-full" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <Alert color="failure" className="max-w-md w-full text-center">
          Failed to load hero data.
        </Alert>
      </div>
    );

  // Transform the API object to the array format expected by Banner
  const heroStats = heroData && heroData.data && typeof heroData.data[0].value === 'object'
    ? [
        { title: 'brokerage', value: heroData.data[0].value.brokerage, suffix: '%' },
        { title: 'Projects', value: heroData.data[0].value.projects, suffix: '+' },
        { title: 'Developers', value: heroData.data[0].value.developers, suffix: '+' },
        { title: 'Happy client', value: heroData.data[0].value.happyClient, suffix: '+' },
      ]
    : [];

  return (
    <>
      <Banner
        data={heroStats}
        search={true}
        img={heroData.data[0].image }
      />
      {showModal && <Model onClose={() => setShowModal(false)} />}
    </>
  );
}
