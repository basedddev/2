import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

export function useScrollToHash() {
  const [location] = useLocation();
  const initialLoadRef = useRef(true);

  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash;
    
    // If there's a hash in the URL
    if (hash) {
      // Remove the '#' character
      const id = hash.replace("#", "");
      
      // Find the element with that id
      const element = document.getElementById(id);
      
      // If the element exists, scroll to it
      if (element) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (initialLoadRef.current) {
      // On initial load, scroll to top if there's no hash
      window.scrollTo(0, 0);
      initialLoadRef.current = false;
    }
  }, [location]);
}
