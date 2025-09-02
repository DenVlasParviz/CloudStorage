import {files_table as filesSchema, folders_table as foldersSchema} from "~/server/db/schema"
import {db} from "~/server/db";
import {eq} from "drizzle-orm";


export async function getAllParentsForFolder(folderId:number){
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




  export  function getFolders(folderId:number){
     return db.select().from(foldersSchema).where(eq(foldersSchema.parent,folderId))
  }

  export  function getFiles(folderId:number){
      return db.select().from(filesSchema).where(eq(filesSchema.parent,folderId));
  }





