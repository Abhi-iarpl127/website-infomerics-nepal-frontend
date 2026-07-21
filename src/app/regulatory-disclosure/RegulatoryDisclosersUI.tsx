"use client";

import Link from "next/link";

// import MainSlider from "@/components/sections/MainSlider";
// import BlockRenderer from "@/components/BlockRenderer";
// import { HomePageData } from "@/types/common";

import { Accordion } from "react-bootstrap";

// import HomePage from "@/components/pages/Home";
import {
  getRegulatoryDisclosersData,
  getRegulatoryDisclosersDetailData,
} from "@/services/APIServices";
import { BlockData, DataValueDetail, ListingData1, RegulatoryDisclosersData } from "@/types/common";
import { useEffect, useState } from "react";
import RenderBlocks from "./RenderBlocks";

const RegulatoryDisclosersUI = ({
  title,
  description,
  image,
  s_image,
}: {
  title: string;
  description: string;
  image: string;
  s_image: string;
}) => {
  const [isSEBI, setIsSEBI] = useState<boolean>(true);
  const [data, setData] = useState<RegulatoryDisclosersData[]>([]);
  const [updatedData, setUpdatedData] = useState<number>(0);
  const [dataValue, setDataValue] = useState<string[]>([]);
  const [dataValueDetail, setDataValueDetail] = useState<
    string | DataValueDetail | null
  >(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRegulatoryDisclosersData(
          isSEBI ? "true" : "false"
        );
        console.log(response);
        const temp: string[] = [];
        response.data.forEach(() => {
          temp.push("");
        });
        setDataValue(temp);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
        setData([]); // or handle the error as appropriate
      }
    };
    fetchData();
  }, [isSEBI]);

  const checkKey = async (key: number) => {
    // console.log(key, "key");
    if (key >= 0) {
      console.log(data[Number(key)], "data[Number(key)]");
      // setDataValue(data[Number(key)].Description);
      if (dataValue[Number(key)] == "") {
        const response = await getRegulatoryDisclosersDetailData(
          data[Number(key)].slug
        );
        console.log(response, "getRegulatoryDisclosersDetailData");
        const temp = dataValue;
        temp[Number(key)] = response.data;
        setDataValue(temp);
        setUpdatedData(updatedData + 1);
      }
    }
  };

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
              {/* <!-- Breadcrumb --> */}
      <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

        </div>
        {/* <picture>
          <source media="(max-width:640px)" srcSet={s_image} />
          <img src={image} alt={title} />
        </picture> */}
      </div>
  
      <div className="section-ptb section-start regulatory-disclosers">
        <div className="ir-container">
          <div className="ir-tabs-secondary">
            <div className="ir-tabs-inner">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item" role="presentation">
                  <div
                    onClick={() => setIsSEBI(true)}
                    className={`nav-link ${isSEBI ? "active" : ""}`}
                  >
                    SEBI & RBI
                  </div>
                </li>
                {/* <li className="nav-item" role="presentation">
                  <div
                    onClick={() => setIsSEBI(false)}
                    className={`nav-link ${!isSEBI ? "active" : ""}`}
                  >
                    RBI
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
          <Accordion
            key={updatedData}
            defaultActiveKey={dataValueDetail as string}
            className="regulatory-accordion"
            onSelect={(eventKey) => {
              // console.log(eventKey,"eventKey");
              setDataValueDetail(eventKey as string);
              if (eventKey !== null) {
                checkKey(Number(eventKey));
              }
              // setDataValue(data[Number(key)].Description);
            }}
          >
            {/* {JSON.stringify(data)} */}
            {data.map((item, index) => (
            
               
              <Accordion.Item eventKey={index.toString()} key={index}>
                {/* {JSON.stringify(item)} */}
                {item.page ? 
                <Accordion.Header className="external-link"><Link href={`${item?.page?.Parent?.slug ? `/${item?.page?.Parent?.slug}/` : "/"}${item?.page?.slug}`}>{item.Title}</Link></Accordion.Header> : 
                <>
                  <Accordion.Header>{item.Title}</Accordion.Header>
                  <Accordion.Body>
                    {dataValue[index] == "" ? (
                      <div></div>
                    ) : (
                      <>
                      {/* {JSON.stringify(dataValue[index])} */}
                        {typeof dataValue[index] === "object" &&
                        dataValue[index] !== null ? (
                          <>
                         
                            {(
                              (dataValue[index] as DataValueDetail)
                                .regulatory_disclosure_lists || []
                            ).map((item1:ListingData1, itemIndex) => (
                              <RenderBlocks parTitle={item.Title} title={item1.Title} key={itemIndex} data={item1.blocks as BlockData[]} type={item1.Type} id={item1.id} hasArchive={item1?.hasArchive || false} />
                            ))
                            }
                            
                          </>
                        ) : null}
                      </>
                    )}
                  </Accordion.Body>
                </>
                }
              </Accordion.Item>
              
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryDisclosersUI;
