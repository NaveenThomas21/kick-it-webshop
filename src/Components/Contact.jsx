import React from 'react';
import Swal from 'sweetalert2';
import Footer from './Footer';

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append('access_key', 'a55b738d-78a8-4a3c-9b2c-d15b0dbb18de');

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: 'Success!',
        text: 'Your Message Submitted Successfully!',
        icon: 'success',
      });
    }
  };

  return (
    <>
      <section
        className="py-10 px-4 sm:px-8 lg:px-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('/public/images/pexels-thirdman-9399671.jpg')`,
        }}
      >
        <form
          onSubmit={onSubmit}
          className="max-w-xl mx-auto shadow-md rounded-lg p-6 space-y-6"
        >
          <h2 className="text-3xl font-bold text-red-800 text-center">
            Contact Form
          </h2>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-transparent placeholder-red-300 text-white"
              placeholder="Enter your name"
              name="name"
              required
              style={{ color: 'white', backgroundColor: 'transparent' }}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-transparent placeholder-red-100 text-white"
              placeholder="Enter your email"
              name="email"
              required
              style={{ color: 'white', backgroundColor: 'transparent' }}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-white"
            >
              Your Message
            </label>
            <textarea
              name="message"
              className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-2 focus:ring-blue-00 focus:outline-none bg-transparent placeholder-red-100 text-white"
              placeholder="Enter your message"
              required
              style={{ color: 'white', backgroundColor: 'transparent' }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md text-lg font-medium hover:bg-red-800 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
