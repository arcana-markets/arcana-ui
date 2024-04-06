import React from "react";
interface ToggleProps {
  ValIsChecked: boolean;
  lable: string;
  id: string;
}
const Toggle: React.FC<ToggleProps> = ({ ValIsChecked, lable, id }) => {
  const [isChecked, setIsChecked] = React.useState(ValIsChecked);

  const handleToggle = () => {
    setIsChecked((prev: any) => !prev);
  };

  return (
    <div>
      <div className="flex items-center gap-[10px]">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            id={id}
            className="hidden"
            checked={isChecked}
            onChange={handleToggle}
          />
          <label
            htmlFor={id}
            className={` cursor-pointer toggle    flex items-center justify-end rounded-3xl p-[1.5px] ${
              isChecked ? "bg-dark" : "bg-blue"
            }`}
          >
            <div
              className={`w-4 h-4 toggle-inner     rounded-full shadow-md transform transition-transform ${
                isChecked ? "-translate-x-4 bg-white" : "bg-white"
              }`}
            ></div>
          </label>
        </div>
        <p
          className={`text-base font-normal whitespace-nowrap text-white ${
            isChecked && "!text-colonyblue"
          }`}
        >
          {lable}
        </p>
      </div>
    </div>
  );
};

export default Toggle;
