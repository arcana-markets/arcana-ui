import React, { useState, useEffect } from 'react';
import Card from './CarouselCard';
import Marquee from 'react-fast-marquee';
import arcanaStore from '@/stores/arcanaStore';

const CarouselSlider = () => {
  const [items, setItems] = useState([]);
  const updateMarketId = arcanaStore((state) => state.updateMarketId);

  useEffect(() => {
    fetch('https://prod.arcana.markets/api/openbookv2/markets')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const handleCardClick = (marketId: string) => {
    updateMarketId(marketId);
    // Additional logic if needed
  };

  return (
    <div className='py-4 sm:py-6'>
      <Marquee
        gradient={false}
        pauseOnHover={true}
        style={{ width: '100%', height: '100%' }}
        speed={50}
      >
        {items.map((item, index) => (
          <Card key={index} item={item} onCardClick={handleCardClick} />
        ))}
      </Marquee>
    </div>
  );
};

export default CarouselSlider;
