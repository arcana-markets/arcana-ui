import React, { FC } from "react";
import { AccordionUPArrow } from "@/components/common/Icons";

type FaqListItemProps = {
  obj: {
    question: string;
    answer: string;
  };
  id: number;
  openAccordionIndex: number | null;
  toggleAccordion: (id: number) => void;
};

const FaqListItem: FC<FaqListItemProps> = ({
  obj,
  toggleAccordion,
  id,
  openAccordionIndex,
}) => {
  return (
    <>
      <article
        className={`bg-transparent px-2 sm:px-4 rounded-lg overflow-hidden transition-height duration-200 cursor-pointer ${openAccordionIndex === id
          ? "h-[130px] sm:h-[125px]   xl:h-[140px] !bg-faq_bg py-2 sm:py-4"
          : "h-[25px]"
          }`}
      >
        <h2
          onClick={() => toggleAccordion(id)}
          className={`text-foxflowerviola inline-flex items-center gap-1.5 sm:gap-2.5 text-base font-medium cursor-pointer`}
        >
          <span
            className={`transition duration-200  ${openAccordionIndex === id ? "rotate-180" : ""
              }`}
          >
            <AccordionUPArrow />
          </span>
          {obj.question}
        </h2>
        <p className={` text-foxflowerviola text-xs font-normal pt-1 ps-5`}>
          {obj.answer}
        </p>
      </article>
    </>
  );
};

export default FaqListItem;
