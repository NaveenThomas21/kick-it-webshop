import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ open, setOpen }) => {
  useEffect(() => {
    const handleResize = () => {
     
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };

  
    window.addEventListener("resize", handleResize);

   
    return () => window.removeEventListener("resize", handleResize);
  }, [open, setOpen]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div
            className="text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl"
          >
            <ul className="flex flex-col justify-center items-center gap-10">
              <li>
                <Link to="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About" onClick={() => setOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/Product" onClick={() => setOpen(false)}>
                  Product
                </Link>
              </li>
              <li>
                <Link to="/Contact" onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
