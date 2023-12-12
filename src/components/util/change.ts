type ChangeHandler = (value: any) => void;

export const getHandleChange = (func: ChangeHandler) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    func(value);
  };
};