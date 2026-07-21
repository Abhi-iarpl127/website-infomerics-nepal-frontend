"use client";

import { Block } from "@/types/common";

const Blocks = ({ data }: { data: Block[] }) => {
  return (
    <>
      {data.map((item, index) => (
        <div className="section-ptb section-overview" key={index}>
          <div className="ir-container">
            <div className="ir-heading lg-center">
              <h2>{item.Title}</h2>
            </div>
            <p dangerouslySetInnerHTML={{ __html: item.Description || "" }} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Blocks;
