import Schema from 'validate'
const proValidate = new Schema({
    initial: {
      type: String,
      required: true,
      match:/[A-Z]/
    },
    num:{
        type: Number,
        required: true,
    }
})
    export default proValidate