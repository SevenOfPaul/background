import Book from "../database/book.js";
import BookContent from "../database/bookContent.js";

export default async function searchDto(data) {
    let desc;
    if (data.length != 0) {
        desc = "查询结果如下";
        let books = [];
        let bookIds = [];
        for (let word of data) bookIds.push(...await BookContent.find({ contentId: word._id },).select("bookId"));
        bookIds = bookIds.map(bookContent => bookContent.bookId);
        books.push(...await Book.find({ _id: { $in: bookIds } }));
        //content._doc为真实数据
        data = data.map(content =>{return {...content._doc,books}});
    } else desc = "查询结果为空";
    return { desc, data }

}