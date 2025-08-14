
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);


  React.useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileDevice);
      setIsReady(true);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [])

  return { isMobile, isReady };
}
