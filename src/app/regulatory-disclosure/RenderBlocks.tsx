import { BlockData } from "@/types/common";
import React, { Suspense } from "react";
import SharedDocumentData from "./SharedDocumentData";
import DescriptionData from "./DescriptionData";
import ListingData from "./ListingData";

export default function RenderBlocks({ data, type,id,title,hasArchive,parTitle }: { data: BlockData[], type:string,id:number,title:string,hasArchive:boolean,parTitle:string }) {
  
    return (
        <Suspense fallback={<div></div>}>
            {(type=="Document" || type=="Description") && !hasArchive && data.map((block, index) => {
                switch (block.__component) {
                    case "shared.document-data":
                        return <SharedDocumentData key={index} data={block}  title={title}  hasArchive={hasArchive}  showArchive={false} />;
                    case "shared.description-data":
                        return <DescriptionData key={index} data={block} id={id} showArchive={false} />;
                    default:
                        return null;
                }
            })}
            {(type=="Listing") && <ListingData data={data} parTitle={parTitle} title={title} hasArchive={hasArchive}  id={id} />
                    
            }

{(type=="Document") && hasArchive &&  <ListingData data={data} parTitle={parTitle} title={title} hasArchive={hasArchive}  id={id} /> }
        </Suspense>
    );
}
