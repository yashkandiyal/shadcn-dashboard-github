import React from "react";
interface cardProps {
  plan: string;
  pricing: number;
  features: string[];
  link: any;
}
const PlanCard: React.FC<cardProps> = ({ plan, pricing, features, link }) => (
  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md lg:h-max lg:scale-105 z-10 translate-y-0">
    <div className="p-6 text-center">
      <h5 className="antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-green-500 flex justify-center mt-2 mb-2">
        {plan}
      </h5>
      <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex justify-center mt-5 mb-2">
        ${pricing}
        <span className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 self-end -translate-y-1">
          /per month
        </span>
      </h3>
      <div className="flex flex-col items-center justify-center">

        <ul className="flex flex-col items-start justify-center gap-2 pt-3 mb-5 ">
        {" "}
        {/* Updated: Added text-center class */}
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex text-left items-center justify-start gap-2 py-1 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-5 h-5 text-inherit">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"></path>
            </svg>
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-inherit">
              {feature}
            </p>
          </li>
        ))}
      </ul>
      </div>
      
      <a
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full flex items-center justify-center gap-4"
        href={link!}
        target="_blank">
        join
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="w-5 h-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
        </svg>
      </a>
    </div>
  </div>
);

export default PlanCard;
