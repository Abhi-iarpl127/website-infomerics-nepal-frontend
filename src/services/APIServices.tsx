const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://infomerics-g.cwyde.com";

async function fetchData(endpoint: string, customBaseUrl: string = "") {
  const base = (customBaseUrl || BASE_URL).replace(/\/+$/, "");
  const url = `${base}/${endpoint.replace(/^\/+/, "")}`;
  console.log(`Fetching from: ${url}`);

  try {
    const response = await fetch(url, {
      // Set cache timeout (revalidate) for 900 seconds (15 minutes)
      next: { revalidate: 900 },
    });

    // Log response status and headers
    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    if (!response.ok) {
      //console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log("Fetched Data:", data);

    return data;
  } catch (error) {
    console.error("Fetching data failed:", error);
    return null;
  }
}

export async function getMenuItems() {
  const data = await fetchData("api/common");
  return data;
}

  export async function getPageData(slug:string,customBaseUrl:string="") {
    console.log(`api/pages/${slug}`);
    const data = await fetchData(`api/pages/${slug}`,customBaseUrl);
    return data;
  }

export async function getServicePageData() {
  const data = await fetchData(`api/services`);
  return data;
}

export async function getCareersPageData() {
  const data = await fetchData(`api/pages/careers`);
  return data;
}

export async function getContactPageData() {
    const data = await fetchData(`api/pages/contact-us`);
    return data;
  }

  export async function getAboutPageData() {
    const data = await fetchData(`api/pages/about-us`);
    return data;
  }

  export async function getSeminarData() {
    const data = await fetchData(`api/posts?cat=seminar`);
    return data;
  }

  export async function getMediaCoverageData() {
    const data = await fetchData(`api/posts?cat=media-coverage`);
    return data;
  }

  export async function getRatingsData() {
    const data = await fetchData(`api/ratings`);
    return data;
  }

  export async function getRatingsDetailsData(slug:string) {
    const data = await fetchData(`api/ratings/${slug}`);
    return data;
  }

  export async function getPageSEOData(slug:string) {
    const data = await fetchData(`api/seo/${slug}`);
    return data;
  }

  export async function getData(slug:string,page:number=1,pageSize:number=4,industry:string="",year:string="",month:string="",search:string="") {
    
    //console.log(`api/posts?cat=${slug}&page=${page}&pageSize=${pageSize}${industry!=""?"&industry="+industry:""}${year!=""?"&year="+year:""}${month!=""?"&month="+month:""}${search!=""?"&search="+search:""}`);
    const data = await fetchData(`api/posts?cat=${slug}&page=${page}&pageSize=${pageSize}${industry!=""?"&industry="+industry:""}${year!=""?"&year="+year:""}${month!=""?"&month="+month:""}${search!=""?"&search="+search:""}`);
    return data;
  }

  export async function getSeminarsData() {
    const data = await fetchData(`api/posts/homepageseminardata`);
    return data;
  }

  export async function getArticleDetail(slug:string) {
    console.log(`api/posts/${slug}`); 
    const data = await fetchData(`api/posts/${slug}`);
    //https://ratingcms.cwyde.com/api/posts/indian-rice-industry-outlook
    return data;
  }

  export async function getCorporateGovernanceData() {
    const data = await fetchData(`api/corporate-governances`);
    return data;
  }

  export async function getCorporateGovernanceDetailData(slug:string) {
    const data = await fetchData(`api/corporate-governances/${slug}`);
    return data;
  } 

    export async function getPoliciesAndProceduresData() {
      const data = await fetchData(`api/policies-and-procedures`);
      return data;
    } 
  
    export async function getPoliciesAndProceduresDetailData(slug:string) {
      const data = await fetchData(`api/policies-and-procedures/${slug}`);
      return data;
    } 

    export async function getRegulatoryDisclosersData(isSEBI:string) {
      const data = await fetchData(`api/regulatory-disclosures?isSEBI=${isSEBI}`);
      return data;
    }

    export async function getRegulatoryDisclosersUnacceptedRatings() {
      const data = await fetchData(`api/unaccepted-ratings`);
      return data;
    }

    export async function getRegulatoryDisclosersDelayInReviews() {
      const data = await fetchData(`api/delay-in-reviews`);
      return data;
    }



    export async function getDelayInReviewUI() {
      const data = await fetchData(`api/delay-in-review`);
      return data;
    }

    export async function getNonReceiptOfNonDefaultStatementUI() {
      const data = await fetchData(`api/non-default-statements`);
      return data;
    }

    export async function getArchiveNonReceiptOfNonDefaultStatementUI() {
      const data = await fetchData(`api/archive-non-default-statement`);
      return data;
    }

    //api/archive-non-default-statement

    export async function getRegulatoryDisclosersDetailData(slug:string) {
      const data = await fetchData(`api/regulatory-disclosures/${slug}`);
      return data;
    }

    export async function getRegulatoryDisclosersListingDetailData(slug:string) {
      const data = await fetchData(`api/regulatory-disclosure-listings/${slug}`);
      return data;
    }

    export async function getRegulatoryDisclosersListingListingDescriptionData(slug:string,slug1:string,slug2:string) {
      console.log(`api/regulatory-disclosure/listing/description/${slug}/${slug1}/${slug2}`);
      const data = await fetchData(`api/regulatory-disclosure/listing/description/${slug}/${slug1}/${slug2}`);
      return data;
    }

    export async function getRegulatoryDisclosersListingListingData(slug1:string) {
      const data = await fetchData(`api/regulatory-disclosure/listing/archive/${slug1}`);
      return data;
    }


    export async function getRegulatoryDisclosersListingDescriptionData(slug1:string,slug2:string) {
      const data = await fetchData(`api/regulatory-disclosure/description/${slug1}/${slug2}`);
      return data;
    }

    export async function getRegulatoryDisclosersListingDetailData2(slug:string,slug1:string,slug2:string="") {
      const data = await fetchData(`api/regulatory-disclosure-listings/${slug}/${slug1}${slug2!=""?"/"+slug2:""}`);
      return data;
    }

    export async function getRegulatoryDisclosersListingDetailData1(slug:string,slug1:string,slug2:string="") {
      const data = await fetchData(`api/archive-regulatory-disclosures/${slug}${slug1!=""?"/"+slug1:""}${slug2!=""?"/"+slug2:""}`);
      return data;
    }

    export async function RatingArchiveDetailData1(slug:string,slug1:string,slug2:string="") {
      const data = await fetchData(`api/archive-rating-list/${slug1}/${slug2}`);
      return data;
    }

    export async function getPoliciesAndProceduresListingDetailData(slug:string,slug1:string) {
      const data = await fetchData(`api/archive-policies-and-procedures/${slug}/${slug1}`);
      return data;
    }


    export async function getfilterData(slug:string) {
      const data = await fetchData(`api/posts/filterdata?cat=${slug}`);
      return data;
    }

    export async function SubscriptionsData(email:string) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            Email: email,
          },
        }),
      });
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscriptions`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     data:{
      //       Email:email
      //     }
      //   })
      // });
      return res;
    }

    export async function ContactUsData(data:{fullName:string,email:string,phone:string,queryType:string,message:string,CompanyName:string  }) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact-uses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data:{
            FullName:data.fullName,
            Email:data.email,
            PhoneNumber:data.phone,
            QueryType:data.queryType,
            Message:data.message,
            CompanyName:data.CompanyName
          }
        }),
      });
      return res;
    }

    // https://ratingcms.cwyde.com/api/archive-policies-and-procedures/compensation-policy-2/7
  //https://ratingcms.cwyde.com/api/ratings/rating-scale
  // https://ratingcms.cwyde.com/api/ratings/