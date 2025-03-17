import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";

const useInput = <T>([inputValues, setInputValues]: [
  inputValues: T,
  setInputValues: Dispatch<SetStateAction<T>>,
]) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  return { handleChangeInput };
};

export default useInput;
