"use client";
import React, { useState } from "react";
import FaqListItem from "./FaqListItem";
import { faqlist } from "@/components/common/Helper";

const Faqs = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <div className="flex items-center gap-3 flex-col justify-between h-full mt-8 lg:mt-0">
      {faqlist.map((obj, index) => (
        <FaqListItem
          obj={obj}
          id={index}
          key={index}
          openAccordionIndex={openAccordionIndex}
          toggleAccordion={toggleAccordion}
        />
      ))}
    </div>
  );
};

export default Faqs;
