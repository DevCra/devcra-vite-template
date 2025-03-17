import { useLayoutEffect, useState } from "react";

import { FALLBACK_LOCATION } from "@/constants/map";

const useLocation = () => {
  // TODO: 전역 상태 관리
  const [initialLocation, setInitialLocation] = useState(FALLBACK_LOCATION);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useLayoutEffect(() => {
    const success = ({
      coords: { latitude: lat, longitude: lng },
    }: {
      coords: { latitude: number; longitude: number };
    }) => {
      setInitialLocation({
        lat,
        lng,
      });
      setCurrentLocation({
        lat,
        lng,
      });
    };

    const error = () => {
      const { lat, lng } = FALLBACK_LOCATION;

      setInitialLocation({
        lat,
        lng,
      });
      setCurrentLocation({ lat, lng });
    };

    if (navigator.geolocation && !currentLocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [currentLocation]);
};

export default useLocation;
