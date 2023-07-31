import { INPUT_CLASSES } from "~/commonUIClasses";

interface Option {
  label: string;
  value: string;
}
interface SelectInputProps {
  options: Option[];
  value?: string;
  error?: string;
  register?: any;
}

export default function SelectInput({ options, value, register, error }: SelectInputProps) {
  const { onChange } = register;

  return (
    <select
      className={`${INPUT_CLASSES} ${error && 'border-red-500'}`}
      // value={value}
      onChange={(e) => onChange(e.target.value)} // Update the form value using onChange
      {...register}

    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
