import Link from "next/link";
import Drive from "~/app/Drive-contents";
import {files as filesSchema, folders as foldersSchema} from "~/server/db/schema"
import {db} from "~/server/db";
import DriveContents from "~/app/Drive-contents";


export default async function HomePage()
{
  const files = await db.select().from(filesSchema)
  const folders = await db.select().from(foldersSchema)

  return (
<DriveContents files={files} folders={folders}/>

  );
}
