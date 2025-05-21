import ReactSelect from "react-select";
interface SelectProps {
  register: any;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[] | undefined;
  label: string;
  disabled: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  disabled,
}) => {
  return (
    <div className='z-[100]'>
      <label
        htmlFor=''
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          options={options}
          value={value}
          isDisabled={disabled}
          onChange={onChange}
          isMulti
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
