import {FC} from "react";

interface InputProps {
  inputValue: string;
  onChange: (e: any) => void;
  placeholderText: string;
}

const Input: FC<InputProps> = ({
  inputValue,
  onChange,
  placeholderText,
}) => {
  return (
      <label>
        <input
          value={inputValue}
          onChange={(e: any) => onChange(e)}
          placeholder={placeholderText}
          />
      </label>
  );
};

export default Input;