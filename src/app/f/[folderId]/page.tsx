import {files_table as filesSchema, folders_table as foldersSchema} from "~/server/db/schema"
import {db} from "~/server/db";
import DriveContents from "~/app/Drive-contents";
import {eq} from "drizzle-orm";


async function getAllParents(folderId:number){
  const parents = [];
  let currentId:number | null =folderId;
  while(currentId!==null){
    console.log("Current folder id:", currentId);

    const folder = await db.select().from(foldersSchema).where(eq(foldersSchema.id,currentId))
    console.log("Fetched folder:", folder);
    if(!folder[0]) throw new Error("Folder not found")
    parents.unshift(folder[0]);
    currentId= folder[0]?.parent
    console.log("Next folder id:", currentId);
  }
  console.log("All parents:", parents);
  return parents
}


export default async function HomePage(props:{
  params: Promise<{folderId:string}>;
})
{

  const params = await props.params
  const parsedFolderId= parseInt(params.folderId);
  if(isNaN(parsedFolderId)){
return <div>Invalid Folder ID</div>
  }

  console.log(params.folderId)
  const filesPromise = await db.select().from(filesSchema).where(eq(filesSchema.parent,parsedFolderId));
  debugger;

  const foldersPromise = await db.select().from(foldersSchema).where(eq(foldersSchema.parent,parsedFolderId))
  debugger;

  const parentsPromise = getAllParents(parsedFolderId)
  debugger;

  const [folders,files,parents] = await Promise.all([foldersPromise,filesPromise,parentsPromise])
  debugger;

  return (

<DriveContents files={files} folders={folders} parents={parents}/>

  );
}
