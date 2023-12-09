import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useNavigationHook = () => {
  const [navigation, setNavigation] = useState(null);

  useEffect(() => {
    setNavigation(useNavigation());
  }, []);

  return navigation;
};

export default useNavigationHook;
