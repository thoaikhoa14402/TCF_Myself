import { useEffect, useRef, useState } from "react";

const useValidator = (initialState) => {
  const [error_msg, setError] = useState(initialState);
  const UseValidatorEffect = (
    { type, payload },
    validator_fn,
    dependencies
  ) => {
    const firstLoad = useRef(true);
    // error validation
    return useEffect(() => {
      if (firstLoad.current === true) {
        firstLoad.current = false;
        return;
      }
      const validation = () => {
        if (!validator_fn(payload.data))
          setError((prev) => ({ ...prev, [type]: payload.message }));
        else setError((prev) => ({ ...prev, [type]: "" }));
      };
      validation();
    }, [...dependencies]);
  };

  return [error_msg, setError, UseValidatorEffect];
};

export default useValidator;
