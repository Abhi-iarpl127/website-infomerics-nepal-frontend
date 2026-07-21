import React from 'react'

export default function SitemapUI() {
  return (
    <div className="ir-wrapper">
      <section className="inner-banner site-map">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-left">
              <h1 className="inner-heading mb-4">Site Map</h1>
            </div>
            <div className="bredcrum">
              <a href="#">Home</a>
              <a href="#">Site Map</a>
            </div>
          </div>
        </div>
      </section>
      <section className="sitemap">
        <div className="container">
          <div className="row footer-top">
            <div className="col col-12 col-md-3">
              <div className="site-mp">
                <h4>Home</h4>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Career</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="col col-12 col-md-3">
              <div className="site-mp">
                <h4>About</h4>
                <ul>
                  <li><a href="#">About Infomerics</a></li>
                  <li><a href="#">Board of Director</a></li>
                  <li><a href="#">Credit Rating Committee</a></li>
                  <li><a href="#">Top Management</a></li>
                  <li><a href="#">Infomerics India Foundation</a></li>
                </ul>
              </div>
            </div>

            <div className="col col-12 col-md-3">
              <div className="site-mp">
                <h4>Brochure</h4>
                <ul>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Infomerics Corporate Brochure
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col col-12 col-md-3">
              <div className="site-mp">
                <h4>Methodologies</h4>
                <ul>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer"
                      >Rating Methodologies</a
                    >
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer"
                      >System Architecture</a
                    >
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer"
                      >Software Developed Modules</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="footer-sep" />

          <div className="row footer-bottom">
            <div className="col col-12 col-md-3">
              <div className="site-mp">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#">Policies and Procedures</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Regulatory Disclosures</a></li>
                  <li><a href="#">Disclaimer</a></li>
                </ul>
              </div>
            </div>

            <div className="col col-12 col-md-3">
              <div className="site-mp">
                <h4>Rating Criteria</h4>
                <ul>
                  <li><a href="#">Rating Criteria</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}