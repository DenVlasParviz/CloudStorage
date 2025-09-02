
import DriveContents from "~/app/Drive-contents";
import {getAllParentsForFolder, getFiles, getFolders} from "~/server/db/queries";




export default async function DriveClone(props:{
  params: Promise<{folderId:string}>;
})
{

  const params = await props.params
  const parsedFolderId= parseInt(params.folderId);
  if(isNaN(parsedFolderId)){
return <div>Invalid Folder ID</div>
  }


  const [folders,files, parents] = await Promise.all([
    getFolders(parsedFolderId), // тип: { id: number; name: string; parent: number; }[]
    getFiles(parsedFolderId),   // тип: { id: number; name: string; size: number; url: string; parent: number; }[]
    getAllParentsForFolder(parsedFolderId),
  ]);
  return (

<DriveContents files={files} folders={folders} parents={parents}/>

  );
}
