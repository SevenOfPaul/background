import Schema from 'validate'
const contentValidate = new Schema({
    initial: {
      type: String,
      required: true,
      match:/[A-Z]/
    },
    phonetic_symbol: {
        type: String,
        required: true,
    },
    mean:{
        type: String,
        required: true, 
    },
    word:{
        type: String,
        required: true,
        match:/[A-Za-z]/
    }
})
    export default contentValidate