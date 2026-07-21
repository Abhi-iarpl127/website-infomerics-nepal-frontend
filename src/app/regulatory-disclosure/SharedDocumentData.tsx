import { BlockData } from "@/types/common";
import Link from "next/link";

export default function SharedDocumentData({
  data,
  title,
  hasArchive,
  showArchive,
}: {
  data: BlockData;
  title: string;
  hasArchive: boolean;
  showArchive: boolean;
}) {
  if (data.isArchive != showArchive) {
    return null;
  }
  return (
    <h3>
      {hasArchive ? (
        <>
          {title}333
        </>
      ) : (
        <Link href={data.DocumentFile.url} target="_blank">
          {data.DocumentTitle}
        </Link>
      )}

      {/* {JSON.stringify(data)} */}
    </h3>

    
  );
}
