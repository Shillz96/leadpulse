'use client';

import { motion } from 'framer-motion';

const GlowingButton = ({ 
  children, 
  color = 'marigold', 
  onClick,
  className = '',
  type = 'button'
}) => {
  return (
    <motion.button
      type={type}
      className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium rounded-lg bg-${color} text-bright-white ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {/* Glow effect */}
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-white via-transparent to-transparent group-hover:opacity-25"></span>
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GlowingButton; 