import React, { useEffect, useState } from 'react';
import chef from '../../assets/chef image.webp';
import { ResDashboardCardData } from './ResDashboardCardData/ResDashboardCardData';
import ResDashboardCard from '../../components/AfterLoginRestaurantCompo/ResDashboardCard';
import { useNavigate } from 'react-router-dom';

function ResDashboard() {
  const [ResUser, setResUser] = useState([]);
  const navigate = useNavigate();

  const callResDashboard = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/RestaurantLayout/ResDashBoard', { // Update with the correct backend URL and port
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
  
      if (res.status !== 200) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(data);
      setResUser(data);
      if (!data) {
        throw new Error("No data received");
      }
    } catch (err) {
      console.log(err);
      navigate('/ResLogin');
    }
  };

  useEffect(() => {
    callResDashboard();
  }, []);

  // Total menus, total revenue, items sold, No of orders will be fetched from backend 
  const repeatedCard = Array.from({ length: 4 }, () => ResDashboardCardData).flat();
  
  return (
    <div className='flex flex-col items-center ml-60 mt-[78px] w-full font-poppins'>
      <div className='text-3xl mt-8 font-semibold'>
        {ResUser ? ResUser.restaurantName : 'Loading...'}
      </div>
      <div className='inline-flex mt-12'>
        <div className='grid grid-cols-2 gap-8 h-72 ml-8'>
          {repeatedCard.map((item, index) => (
            <ResDashboardCard
              key={index}
              number={item.number}
              description={item.description}
            />
          ))}
        </div>
        <div className='size-2xl ml-16'>
          <img src={chef} className='rounded-full w-72 h-72' alt='Chef' />
        </div>
      </div>
    </div>
  );
}

export default ResDashboard;
