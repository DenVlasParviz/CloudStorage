// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import "server-only"
import {index, serial, text, integer, pgTableCreator} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cloud_storage_${name}`);


export const files_table = createTable("files_table", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    url:text("url").notNull(),
    parent:integer("parent").notNull()
},(t)=>{
    return[
        index("files_parent_index").on(t.parent)
    ];
})
export const folders_table = createTable("folders_table", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    parent:serial("parent")
},(t)=>{
    return[
        index("folders_parent_index").on(t.parent)
    ];
})
