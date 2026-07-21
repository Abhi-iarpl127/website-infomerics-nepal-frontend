"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { getArchiveNonReceiptOfNonDefaultStatementUI } from "@/services/APIServices";
import { UnacceptedRatingsData } from "@/types/common";

interface PageProps {
  title: string;
  description: string;
  image: string;
  s_image: string;
}

interface ArchiveNonDefaultStatement {
  ArchiveDate: string;
  statements: UnacceptedRatingsData[];
}

const ArchiveNonReceiptOfNonDefaultStatementUI = ({
  title,
  description,
  image,
  s_image,
}: PageProps) => {
  // const [search, setSearch] = useState("");
  const [data, setData] = useState<ArchiveNonDefaultStatement[] | null>(null);
  const [currentData, setCurrentData] = useState<ArchiveNonDefaultStatement | null>(null);
  const [filterData, setFilterData] = useState<ArchiveNonDefaultStatement | null>(null);
  const [dateDropDown, setDateDropDown] = useState<string[] | null>(null);

  const serCurrentDataFunc =(date:string)=>{
    const data1 = data?.find((item) => item.ArchiveDate === date);
    setCurrentData(data1 as ArchiveNonDefaultStatement);
    setFilterData(data1 as ArchiveNonDefaultStatement);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArchiveNonReceiptOfNonDefaultStatementUI();
        console.log("response",data);

        setData(response.data as ArchiveNonDefaultStatement[]);
        setCurrentData(response.data[0] as ArchiveNonDefaultStatement);
        setFilterData(response.data[0] as ArchiveNonDefaultStatement);
        setDateDropDown(response.data.map((item: ArchiveNonDefaultStatement) => item.ArchiveDate));
        // setfData(response as RegulatoryDisclosersUnacceptedRatingsArchiveData[]);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
        setData(null); // or handle the error as appropriate
      }
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (currentData && filterData) {
      let filterData = currentData.statements;
      if (search != "") {
        filterData = currentData.statements.filter((item) => {
          return item.CompanyName?.toLowerCase().includes(search.toLowerCase()); // Return true to keep the item
        });
      }

      setFilterData({ ...currentData, statements: filterData });
    }
  }, [search]);

  if(!currentData){
    return (
      <div>
        <h1></h1>
      </div>
    )
  }

  return (
    <div className="ir-wrapper">
      {/* <!-- Home --> */}
      <div className="home-inner">
        <div className="banner-content">
          <div className="ir-container">
            <h1>{title} (Archive)</h1>
            {description && <p>{description}</p>}
          </div>
        </div>
        <picture>
          <source media="(max-width:640px)" srcSet={s_image} />
          <img src={image} alt="" />
        </picture>
      </div>
      {/* <!-- Breadcrumb --> */}
      <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/regulatory-disclosure">
                  Regulatory Disclosures
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title} (Archive)
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- Unaccepted Ratings --> */}
      <div className="section-ptb unaccepted-ratings">
        <div className="ir-container">
          <div className="heading-filters">
            <div className="row align-items-center">
              <div className="ir-filters ir-form">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <div className="search-field">
                        <button className="btn-search"><i className="fa-solid fa-magnifying-glass"></i></button>
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="form-control"
                          id="searchReport"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-8">
                    <div className="filter-right">
                      <div className="row gx-2">
                        <div className="col-md-auto">
                          <div className="form-group">
                            {/* {currentData?.ArchiveDate} */}
                            <select
                              defaultValue={currentData?.ArchiveDate}
                              onChange={(e) => (serCurrentDataFunc(e.target.value))}
                              className="form-select"
                            >
                              <option value="">Date</option>
                              {dateDropDown?.map((item, index) => (
                                <option key={index} value={item} >
                                  {item}
                                </option>
                              ))}
                            </select> 
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ir-table-secondary table-responsive scrollable-table">
            {/* <table className="table">
              <thead>
                <tr>
                  {data?.map((item, index) => (
                    <th key={index} scope="col">
                      NON-RECEIPT OF NDS FOR MONTH OF {item.ArchiveDate}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {data?.map((item, index) => (
                    <td key={index}> */}
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>COMPANY NAME</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterData?.statements?.map(
                            (statementItem, statementIndex) => (
                              <tr key={statementIndex}>
                                <td>{statementIndex + 1}</td>
                                <td>{statementItem.CompanyName}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    {/* </td>
                  ))}
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveNonReceiptOfNonDefaultStatementUI;
