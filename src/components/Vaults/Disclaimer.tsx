import React from "react";

const Disclaimer = () => {
  return (
    <div className="flex items-center flex-col mb-11 sm:mt-10">
      <h4 className="text-center text-[11px] sm:text-xs font-bold text-lightgrey">
        DISCLAIMER
      </h4>
      <p className="text-center text-[11px] sm:text-xs font-normal text-lightgrey max-w-[932px]">
        Any figures or numerical statements expressed on this interface such as
        total earnings, return or annual percentage yield are for estimation and
        informational purposes only and is not guaranteed. Users should consult
        with qualified professionals before making a decision to use this
        interface. Your use of the interface is subject to market risk and may
        result in a negative return. While we make every effort to ensure the
        interface is up to date, we do not guarantee the accuracy, completeness
        or currency of the information on this interface. Users are expected to
        exercise due diligence and verify information independently.
      </p>
    </div>
  );
};

export default Disclaimer;
