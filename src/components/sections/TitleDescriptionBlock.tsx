import { Block } from "@/types/common";

interface TitleDescriptionBlockProps {
  data: Block;
}

const TitleDescriptionBlock = ({ data }: TitleDescriptionBlockProps) => {
  console.log(data);
  return (
    <div className="section-ptb about-group">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="about-img text-center">
              <img
                src={data.Image?.url}
                alt="About Infomerics"
                className="img-fluid left-img-rounded"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-content ir-heading">
              <h2>{data.Title}</h2>
              <p dangerouslySetInnerHTML={{ __html: data.Description || "" }} />
                {/* {data.Description} */}
              {/* </p> */}

              {/* <!-- Button --> */}
              <div className="read-more-cta mobile-button">
                <a
                  href={
                    data.Button?.ButtonLink ||
                    (data.Button?.page?.slug  || "#")
                  }
                  target={data.Button?.Target != "Self" ? "_blank" : ""}
                >
                  {data.Button?.ButtonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleDescriptionBlock;
