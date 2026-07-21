import { getData } from "@/services/APIServices";
import { Block } from "@/types/common";
import { useEffect, useState } from "react";
import DateComponent from "../Date";

const PostsCardSlider = ({ data }: { data: Block }) => {
  const [innerData, setInnerData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (data?.PublicationCard && Array.isArray(data.PublicationCard)) {
        // console.log(data.PublicationCard,"PublicationCard");
        const promises = data.PublicationCard.map((pubCard: any) => {
          return getData(
            pubCard?.category?.slug || "",
            1,
            3
          ).then(response => response.data || []);
        });
        const results = await Promise.all(promises);
        if (isMounted) {
          setInnerData(results);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <div className="section-ptb home-newsroom bg-grey pattern-bottom" key={data.id}>
      <div className="ir-container">
        <div className="ir-heading lg-center">
          <h2>{data.Title}</h2>
        </div>
        <div className="news-grid">
          {/* <!-- Media & Events --> */}
          {data?.PublicationCard?.map((item: any, index: number) => (
            <div className="news-card" key={item.id}>
              <div className={`news-header ${index % 2 === 0 ? 'bg1' : 'bg2'}`}>
                <h3>{item.CardTitle}</h3>
              </div>
              <div className="news-list">
                <div key={`${item.id}-${index}`}>
                  {innerData?.[index]?.map((newsItem: any) => (
                    <div className="news-item" key={newsItem.id}>
                      <div className="news-thumb">
                        <img
                          src={newsItem.ListingImage?.url}
                          alt="News Thumbnail"
                        />
                      </div>
                      <div className="news-content">
                        <span className="date">
                          <DateComponent date={newsItem.Date} />
                        </span>
                        <p>
                          <a href={newsItem.slug}>{newsItem.Title}</a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="read-more-cta view-all">
                <a className="" href={item.Button?.ButtonLink || item.Button?.page?.slug || "#"} target={item.Button?.Target != "Self" ? "_blank" : ""}>
                  View More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsCardSlider;
