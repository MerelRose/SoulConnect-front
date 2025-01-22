import React, { useState } from 'react';
import holding from '../img/holding.jpg';
import ImageCarousel from './components/carousel';
import bikes from '../img/carousel/bikes.jpg';
import sea from '../img/carousel/sea.jpg';
import sign from '../img/carousel/sign.jpg';
import sunset from '../img/carousel/sunset.jpg';
import Home from './components/login';
import Registration from './components/register';

const images = [
    sunset,
    sea,
    bikes,
    sign
  ];

  

const Landing = () => {
    const [showModal, setShowModal] = useState(false);

    const [formType, setFormType] = useState('login'); // New state to track form type

    const handleLoginClick = () => {
        setFormType('login'); // Set form type to login
        setShowModal(true); // Show the modal
    };

    const handleRegisterClick = () => {
        setFormType('register'); // Set form type to register
        setShowModal(true); // Show the modal
    };
  
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
        <div>
            <button
                className="relative w-32 p-4 text-lg font-bold transition-all duration-200 transform bg-white rounded-full h-fit font-lora top-20 hover:bg-red-950 hover:text-white hover:shadow-lg hover:scale-105"
                onClick={handleLoginClick} // Use the login handler
            >
                Login
            </button>

            {/* Conditional rendering based on formType */}
            {showModal && formType === 'login' && (
                <Home showModal={showModal} setShowModal={setShowModal} />
            )}

            <button 
                onClick={handleRegisterClick} // Use the register handler
                className="relative w-32 p-4 text-lg font-bold transition-all duration-200 transform bg-white rounded-full h-fit font-lora top-20 hover:bg-red-950 hover:text-white hover:shadow-lg hover:scale-105"
            >
                Register
            </button>

            {/* Conditional rendering based on formType */}
            {showModal && formType === 'register' && (
                <Registration showModal={showModal} setShowModal={setShowModal} />
            )}
        </div>
      </div>
      
    <div className="absolute flex items-center justify-center w-auto h-96 top-96 right-24">
      <ImageCarousel images={images} />
    </div>
    
</div>

  );
};

export default Landing;