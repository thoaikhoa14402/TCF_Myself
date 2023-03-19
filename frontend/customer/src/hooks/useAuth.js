import { useSelector } from "react-redux";
import { useMemo } from "react";

const useAuth = () => {
  const userInfo = useSelector((state) => state.auth);
  const isLoggedIn = useMemo(
    () => userInfo && userInfo.email != null && userInfo.accessToken != null,
    [userInfo]
  );

  return { ...userInfo, isLoggedIn };
};

export default useAuth;
