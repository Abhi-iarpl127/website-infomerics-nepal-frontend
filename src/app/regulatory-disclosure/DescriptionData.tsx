import { BlockData } from "@/types/common";
import Link from "next/link";

export default function DescriptionData({ data, id,showArchive }: { data: BlockData, id: number,showArchive:boolean }) {

  if(data.isArchive != showArchive){
    return null
  }
  return (
    <h3><Link href={`/regulatory-disclosure/details/${id}/${data.id}`} target="_blank">{data.Title}</Link></h3>
  );
}

