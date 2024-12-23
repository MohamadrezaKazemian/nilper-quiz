import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Initialize media query
    const mediaQueryList = window.matchMedia(query);

    // Set initial state based on current match
    setMatches(mediaQueryList.matches);

    // Create listener function to handle changes
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add the listener
    mediaQueryList.addEventListener("change", handleChange);

    // Cleanup listener on unmount
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
