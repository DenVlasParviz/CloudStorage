
import "server-only";
import {files_table as filesSchema, folders_table as foldersSchema} from "~/server/db/schema"
import {db} from "~/server/db";
import {eq} from "drizzle-orm";

export const QUERIES={

    getAllParentsForFolder: async function (folderId:number){
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
},




    getFolders: function (folderId:number){
    return db.select().from(foldersSchema).where(eq(foldersSchema.parent,folderId))
},

    getFiles: function (folderId:number){
    return db.select().from(filesSchema).where(eq(filesSchema.parent,folderId));
}



}





