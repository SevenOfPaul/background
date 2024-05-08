import {EntitySchema} from "typeorm";
import Book from "../model/book.model.js";
 const bookEntity=new EntitySchema({
    name:"book",
    target:Book,
    columns:{
        id:{
            type:"varchar",
            primary:true,
        },
        name:{
            type:"varchar",
        },
        create_at:{
            type:"varchar"
        }
    }
})
export default bookEntity