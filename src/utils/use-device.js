import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check screen width and set isMobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust this value based on your needs
    };

    // Check on initial render
    checkMobile();

    // Add event listener for window resize to check on window resizing
    window.addEventListener('resize', checkMobile);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []); // Empty dependency array so it runs once on mount

  return isMobile;
};

export default useIsMobile;
