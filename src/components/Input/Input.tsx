import {FC} from "react";

import styles from './Input.module.scss';

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
        className={styles.searchInput}
          value={inputValue}
          onChange={(e: any) => onChange(e)}
          placeholder={placeholderText}
          />
      </label>
  );
};

export default Input;