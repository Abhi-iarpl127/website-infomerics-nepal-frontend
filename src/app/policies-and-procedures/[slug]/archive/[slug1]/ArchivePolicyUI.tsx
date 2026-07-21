"use client"
import { getPoliciesAndProceduresListingDetailData } from "@/services/APIServices";
import { PoliciesAndProceduresData } from "@/types/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ArchivePolicyUI({slug,slug1}:{slug:string,slug1:string}){

    const [data,setData] = useState<PoliciesAndProceduresData | null>(null);

    useEffect(()=>{
        const fetchData = async () => {
            const data = await getPoliciesAndProceduresListingDetailData(slug,slug1);
            console.log("data",data);
            setData(data);
        }
        fetchData();
    },[])

    if(!data){
        return <div></div>
    }

    return (
        <div className="ir-wrapper">
            <div className="home-inner">
                <div className="banner-content">
                    <div className="ir-container">
                        <h1>{data.Title}</h1>
                    </div>
                      <div className="ir-breadcrumb">
                <div className="ir-container">
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link href="/policies-and-procedures">Policies and Procedures</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{data.Title}</li>
                        </ol>
                    </nav>
                </div>
            </div>
                </div>
                {/* <picture>
                    <source media="(max-width:640px)" srcSet="https://s3.ap-south-1.amazonaws.com/s3infomerics.bcwebwsie.com/banner_industry_reports_sm_a40ae1577e.jpg" />
                    <img alt="" src="https://s3.ap-south-1.amazonaws.com/s3infomerics.bcwebwsie.com/banner_industry_reports_5f3762a5ce.jpg" />
                </picture> */}
            </div>
          
            <div className="section-ptb master-circular">
                <div className="ir-container">
                    <div dangerouslySetInnerHTML={{ __html: data.Description }}></div>
                </div>
            </div>
        </div>
    )
}