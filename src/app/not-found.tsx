import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="ir-wrapper">
      {/* <!-- Breadcrumb --> */}
      <div className="ir-breadcrumb">
        <div className="ir-container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
              <li className="breadcrumb-item active" aria-current="page">404 Error</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- Error Section --> */}
      <div className="error-section section-ptb bg-grey pattern-top">
        <div className="ir-container">
          <div className="inner-banner-content">
            <h1>404 Error - Page Not Found</h1>
            <h6>Sorry, the page you are looking for does not exist.</h6>
            <div className="inner-home-cta">
              <Link href="/" className="btn-ir-primary">Back to Homepage</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
 