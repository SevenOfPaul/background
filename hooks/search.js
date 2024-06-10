import Book from "../database/book.js";
import BookContent from "../database/bookContent.js";

export default async function searchDto(data) {
    let message;
    if (data.length != 0) {
        message = "查询结果如下";
        let books = [];
        let bookIds = [];
        for (let word of data) bookIds.push(...(await BookContent.find({ contentId: word._id }, { _id: 0, contentId: 0 })).map(bookContent => bookContent.bookId));
        books.push(...await Book.find({ _id: { $in: bookIds } }));
        //content._doc为真实数据
        console.log((await BookContent.find({ contentId: data[0]._id }, { _id: 0, contentId: 0 })))
        data = data.map(content => { return { ...content._doc, books } });
    } else message = "该单词暂未收录";
    return { message, data,find:!!data.length }
}