import React from 'react'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate=useNavigate()

  const handleExolore= ()=>{
navigate('/Product')
  }
  return (
    <div>
      <h1 className="flex justify-center p-4 text-lg sm:text-xl md:text-2xl lg:text-2xl pt-6">
        About <span className="font-bold ml-2">Kick <span className="text-secondary">It</span></span>
      </h1>

      <p className="flex justify-center p-3 font-bold text-white text-sm sm:text-base md:text-lg  pt-2 border bg-gray-400 px-4 sm:px-6 md:px-8 lg:px-10">
        Welcome to 'Kick It,' where style and comfort meet. Founded in 2024, we strive to bring you high-quality shoes that fit any occasion.
      </p>


      <div>
        <img

          src='public/images/pexels-jayson-hinrichsen-86844013-18361562.jpg'
          alt="Example"
          className="w-full h-screen object-cover"
        />
      </div>
      <h2 className='font-bold p-7 text-lg '>Our Story</h2>
      <p className='font-bold p-4  text-white border  border bg-gray-400'>Our journey began with a simple idea: create shoes that not only look good but feel good too. From humble beginnings...</p>
      <div>

        <div class="flex space-x-4 mt-4 justify-center ">
          {/* <img
            src="public/images/pexels-244411608-18104066.jpg"
            alt="Sub Image 1"
            className="w-1/4 border border-gray-400 rounded-md shadow object-cover"
          /> */}


          <div class="bg-gray-100 p-8 rounded-lg shadow-lg relative overflow-hidden">

            <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            <div class="relative text-center space-y-6">
              <h1 class="text-4xl font-bold text-gray-800 tracking-wide animate-fade-in-up">
                About <span class="text-secondary">Kick It</span>
              </h1>
              <p class="text-lg text-gray-600 leading-relaxed animate-fade-in ">
                At Kick It we believe every step you take should tell a story. Founded in 2024, we specialize in crafting high-quality shoes that combine unparalleled comfort and modern designs. Whether you're conquering the streets or dressing for a special occasion, Kick It has your back and your feet.
              </p>
              <button class="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition transform hover:scale-105 animate-fade-in-up delay-500"onClick={handleExolore}>
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <h2 className='font-bold p-7 text-lg'>Have some fun</h2>
        <p className='font-bold p-4  text-white border  border bg-gray-400'>Gear up for the journey with Kick It. Where adventure meets comfort step into your next hike with shoes that go the distance. Made for the outdoors, designed for your comfort.</p>
        <div class="flex justify-center items-center p-4 bg-gray-100">
          <video
            class="rounded-lg shadow-lg max-w-full w-full"
            
            autoPlay={true}

            loop
            muted >
            <source src="public/videos/shoe7866331-uhd_3840_2160_25fps.mp4" type="video/mp4" />
     
          </video>
        </div>
      </div> */}

      <Footer/>
    </div>

  )
}

export default About