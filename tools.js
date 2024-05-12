// import A from "./words/A.json" assert {type:"json"}
// import Content_A from "./database/model/A.model.js"
// const  word_A=A.map((val)=>new Content_A(val.word,val.mean,val.phonetic_symbol));
// export default word_A
//生成model工具js
import fs from "node:fs"
// for (let i=66;i<=90;i++){
//     const words=Buffer.from(`
// import { nanoid } from "nanoid";

// class Content_${String.fromCharCode(i)} {
//     constructor(word,mean,phonetic_symbol) {
//         this.id = nanoid();
//         this.word = word;
//         this.mean=mean;
//       this.phonetic_symbol=phonetic_symbol
//     }

// }
// export default Content_${String.fromCharCode(i)}
// `,"utf-8");
// console.log(words)
// fs.createWriteStream(`./database/model/${String.fromCharCode(i)}.model.js`);
// fs.writeFileSync(`./database/model/${String.fromCharCode(i)}.model.js`,words,"utf-8");
// }
//生成entity工具js
// for (let i=66;i<=90;i++){
//     const entity=Buffer.from(`
// import {EntitySchema} from "typeorm";
// import Content_${String.fromCharCode(i)} from "../model/A.model.js";
//  const content_${String.fromCharCode(i)}=new EntitySchema({
//     name:"content_${String.fromCharCode(i)}",
//     target:Content_${String.fromCharCode(i)},
//     columns:{
//         id:{
//             type:"varchar",
//             primary:true,
//         },
//         word:{
//             type:"varchar",
//         },
//         mean:{
//             type:"varchar"
//         },phonetic_symbol:{
//             type:"varchar"
//         }
//     }
// })
// export default content_${String.fromCharCode(i)}
// `,"utf-8");
// console.log(entity)
// // fs.createWriteStream(`./database/model/${String.fromCharCode(i)}.model.js`);
// fs.writeFileSync(`./database/entity/${String.fromCharCode(i)}.entity.js`,entity,"utf-8");
// }
//生成导入工具

// for (let i=65;i<=90;i++){
//      fs.appendFileSync(`./ww.js`,`import char_${String.fromCharCode(i)} from "./words/${String.fromCharCode(i)}.json" assert {type:"json"}
//    `,"utf8");

// }
// for(let i=65;i<=90;i++){
//     const Iw=Buffer.from(`
//     import Content_${String.fromCharCode(i)} from "./database/model/${String.fromCharCode(i)}.model.js"
//    `,"utf8");
//    fs.appendFileSync(`./ww.js`,Iw,"utf-8"); 
// }
// for(let i=65;i<=90;i++){
//     const Iw=Buffer.from(`
//     const  ${String.fromCharCode(i)}=char_${String.fromCharCode(i)}.map((val)=>new Content[${i-65}](val.word,val.mean,val.phonetic_symbol));
//    `,"utf8");
//    fs.appendFileSync(`./ww.js`,Iw,"utf-8"); 
// }
//  fs.appendFileSync(`./ww.js`,Buffer.from(`export default [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z]`,"UTF8"),"utf-8"); 
// fs.appendFileSync(`./database/model/Content.model.js`,` import { nanoid } from "nanoid";`);
// for (let i=65;i<=90;i++){
//      fs.appendFileSync(`./database/model/Content.model.js`,`
//      class Content_${String.fromCharCode(i)} {
//         constructor(word,mean,phonetic_symbol) {
//             this.id = nanoid();
//             this.word = word;
//             this.mean=mean;
//           this.phonetic_symbol=phonetic_symbol
//         }
    
//     }
//    `,"utf8");

// }
//  fs.appendFileSync(`./database/model/Content.model.js`,Buffer.from(`export default [content_A,content_B,content_C
//  ,content_D,content_E,content_F,content_G,content_H,content_I,content_J,content_K,content_L,content_M,content_N
//  ,content_O,content_P,content_Q,content_R,content_S,content_T,content_U,content_V,content_W,content_X,
//  content_Y,content_Z]`,"UTF8"),"utf-8"); 
// fs.appendFileSync(`./database/entity/book.entity.js`, Buffer.from(`import {EntitySchema} from "typeorm";
// import Book from "../model/Book.model.js";
//  const bookEntity=new EntitySchema({
//     name:"book",
//     target:Book,
//     columns:{
//         id:{
//             type:"varchar",
//             primary:true,
//         },
//         name:{
//             type:"varchar",
//         },
//         create_at:{
//             type:"varchar"
//         } 
//     }, relations:{`),"utf-8"); 
// for(let i=65;i<=90;i++){
//     const Iw=Buffer.from(`
//     content_${String.fromCharCode(i)}:{
//         target:  "Content_${String.fromCharCode(i)}",
//          type: "many-to-one",
//         joinTable:true
//     },
//    `,"utf8");
//    fs.appendFileSync(`./database/entity/book.entity.js`,Iw,"utf-8"); 
//  for(let i=65;i<=90;i++){
//     fs.appendFileSync(`./ww.js`,`content[${i-65}],` )
// }

// export default bookEntity`,"utf-8"); 
 for(let i=65;i<=90;i++){
    fs.appendFileSync(`./ww.js`,`char_${String.fromCharCode(i)},` )
}