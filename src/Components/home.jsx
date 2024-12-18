import React from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate=useNavigate()
  return (
    <>
    <div className=''onClick={()=>navigate('/Product')}>

      <video
            class="rounded-lg shadow-lg max-w-full w-full"
            
            autoPlay={true}
            
            loop
            muted >
            <source src="public/videos/homeVideo.mp4" type="video/mp4" 
           />
     
          </video>
              </div>
      <div className="absolute top-20 left-0 right-0 bg-black bg-opacity-40
       flex justify-center items-start p-4  text-white text-2xl font-bold animate-pulse">
      Kickstart Your Style with Kick It
      </div>

      <div className="absolute top-1/3 left-0  
      flex justify-center items-center px-4 text-gray-800 
        font-bold  text-xl sm:text-2xl md:text-3xl lg:textt-3xl xl:text-3xl 
        animate-fade-in ">
      A quick start fuels progress. Get moving, <br></br>make it count!
      </div>

      <div className="absolute top-1/2  flex  justif-items-start ml-5 space-x-4">
      {/* <button className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-400 hover:scale-105 hover:shadow-lg transition duration-300 w-full sm:w-auto">
  Men
</button>
<button className="px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-600 hover:scale-105 hover:shadow-lg transition duration-300 w-full sm:w-auto">
  Women
</button> */}

</div>

   <Footer/>
    </>
  );
}

export default Home;
