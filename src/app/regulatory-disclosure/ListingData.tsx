import { BlockData, DescriptionData, DocumentData } from "@/types/common";
import Link from "next/link";
import { Accordion } from "react-bootstrap";

export default function ListingData({
  data,
  title,
  hasArchive,
  id,
  parTitle
}: {
  data: BlockData[];
  title: string;
  hasArchive: boolean;
  id: number;
  parTitle: string;
}) {
  return (
    <>
    {parTitle !=title && <h3>
       
          {title}
        
      </h3>}
      {/* {JSON.stringify(data)} */}
      <Accordion className="regulatory-accordion sub-accordion">
        {data?.map((item1: BlockData, itemIndex2: number) => (
          <Accordion.Item
            eventKey={itemIndex2.toString()}
            key={"sub1" + itemIndex2}
          >
           
              {item1?.DescriptionData?.length ==1 && item1.Title === item1?.DescriptionData[0].Title ? (
                 <Accordion.Header className="sub-accordion-header direct-link">
               <Link href={`/regulatory-disclosure/listing/${id}/${item1?.id}/${item1?.DescriptionData[0]?.id}`} target="_blank">{item1.Title || item1.DocumentTitle}</Link>
               </Accordion.Header>
              ):item1.DocumentTitle?(
                <Accordion.Header className="sub-accordion-header direct-link">
                {item1.DocumentTitle?<Link href={item1.DocumentFile.url || ""} target="_blank">{item1.DocumentTitle}</Link>:item1.Title}
                </Accordion.Header>
              ):(
                <Accordion.Header className="sub-accordion-header">
                {item1.Title}
                </Accordion.Header>
              )}
           

            <Accordion.Body>
              {item1?.DocumentData?.length > 0 && (
                <ul key={"doc"}>
                  {item1?.DocumentData?.map(
                    (item2: DocumentData, itemIndex3: number) => (
                      <li key={"doc"+itemIndex3}>
                        <Link
                          href={item2?.DocumentFile?.url || ""}
                          target="_blank"
                        >
                          {item2?.DocumentTitle}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}

              {item1?.DescriptionData?.length > 0 && (
                <ul key={"sub"}>
                  {item1?.DescriptionData?.map(
                    (item2: DescriptionData, itemIndex3: number) => (
                      <>
                      {item2?.Title !== item1.Title && (
                      <li key={"sub"+itemIndex3}>
                        <Link
                          href={`/regulatory-disclosure/listing/${id}/${item2?.id}`}
                          target="_blank"
                        >
                          {item2?.Title}
                        </Link>
                      </li>
                      )}
                      </>
                    )
                  )}
                </ul>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {hasArchive && (
        <Link
          href={`/regulatory-disclosure/listing/${id}`}
          className="btn-view-more"
        >
          Archive <i className="fa-solid fa-box-archive"></i>
        </Link>
      )}
    </>
  );
}

{
  /* <div key={itemIndex3}>
                  <Link href={item2.DocumentFile.url || ""} target="_blank">{item2.DocumentTitle}</Link>
                </div> */
}
