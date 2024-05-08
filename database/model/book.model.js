import { nanoid } from "nanoid";

class Book {
    constructor(name) {
        this.id = nanoid();
        this.name = name;
        this.create_at=new Date().getTime()
    }

}
export default Book