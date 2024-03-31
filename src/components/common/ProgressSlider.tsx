import React from "react";
interface ProgressSliderProps {
  progress: number;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProgressSlider: React.FC<ProgressSliderProps> = ({
  progress,
  handleProgressChange,
}) => {
  return (
    <>
      <div className="relative w-full">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full sm:h-[14px] rounded appearance-none bg-[#767676] focus:outline-none"
          style={{
            background: `linear-gradient(to right, #00FF00D6 ${progress}%, #373A37 ${progress}%)`,
          }}
        />
        <p
          className="absolute top-1/2 -translate-y-1/2 left-1/2 transform bg-bluelguana -translate-x-1/2 text-[10px] text-xs p-[5px] pointer-events-none rounded font-bold"
          style={{ left: `${progress}%` }}
        >
          {progress}%
        </p>
      </div>
      <style>
        {`input::-webkit-slider-thumb {background-color: transparent; width: 40px; height: 40px;border-radius: 50%;  margin-top: -2px;  appearance: none; }`}
      </style>
    </>
  );
};

export default ProgressSlider;
