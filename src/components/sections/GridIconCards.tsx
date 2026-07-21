"use client";

import { Block, ServiceData } from "@/types/common";
import Link from "next/link";
const GridIconCards = ({ data }: { data: Block }) => {
  // console.log(data);

  return (
    <div className="section-ptb home-our-services bg-grey pattern-bottom">
      <div className="ir-container container">
        <div className="ir-heading lg-center">
          <h2>{data.Title}</h2>
        </div>
        
        <div className="row g-4 justify-content-center">
        {data?.services?.length && data.services?.length > 0 && (
          <>
            {data.services.map((service: ServiceData) => (
              <div className="col-lg-4 col-md-6" key={service.id}>
                <Link href={service.slug} className="os-list brInfRating">
                  <div className="caption">
                    <h3>
                      {service.Title.split(" ").map((word, idx, arr) => (
                        <span key={idx}>
                          {word}
                          {idx === arr.length - 2 ? <br /> : " "}
                        </span>
                      ))}
                    </h3>
                  </div>
                  <div className="circular-button">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17l9-9M16 16V8h-8"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default GridIconCards;
