import React from 'react';
import holding from '../img/holding.jpg';
import ImageCarousel from './components/carousel';
import bikes from '../img/carousel/bikes.jpg';
import sea from '../img/carousel/sea.jpg';
import sign from '../img/carousel/sign.jpg';
import sunset from '../img/carousel/sunset.jpg';

const images = [
    sunset,
    sea,
    bikes,
    sign
  ];

const Landing = () => {
  return (
<div className="flex-1 overflow-y-auto w-fit h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]bg-zinc-900	">
        <div className='absolute w-2/4 p-6 m-5 text-white shadow-2xl rounded-3xl font-lora h-min'>
            <p><strong className='text-3xl'>Missie & Visie</strong></p>
            <p>"SoulConnect brengt mensen samen door middel van diepe, betekenisvolle connecties die gebaseerd zijn op persoonlijke voorkeuren, interesses en gedeelde waarden. We bieden een veilige, gebruiksvriendelijke en innovatieve datingervaring die mensen helpt de juiste match te vinden en duurzame relaties op te bouwen."</p>
            <hr className='my-4'/>
            <p>"Wij streven ernaar om wereldwijd de meest vertrouwde en gepersonaliseerde datingapp te worden. Onze visie is een toekomst waarin technologie wordt gebruikt om echte menselijke connecties te versterken en waarin iedereen de kans krijgt om liefde en vriendschap te vinden op basis van authenticiteit en respect."</p>
        </div>

        <div className='absolute flex space-x-16 bottom-24 left-20'>
            <img
            src={holding}
            className="shadow-2xl rounded-3xl w-96 h-"
            alt="hand holding"
            />
            <button className='relative w-32 p-4 text-lg font-bold bg-white rounded-full h-fit font-lora top-20'>Login</button>
            <button className='relative w-32 p-4 text-lg font-bold bg-white rounded-full h-fit font-lora top-20'>Register</button>
      </div>
      
    <div className="absolute flex items-center justify-center w-auto h-96 top-96 right-11">
      <ImageCarousel images={images} />
    </div>
    
</div>

  );
};

export default Landing;