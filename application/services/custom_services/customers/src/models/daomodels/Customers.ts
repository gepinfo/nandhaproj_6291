
import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const CustomersSchema = new Schema({
   created_date: { type: Date, default: Date.now },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date, default: Date.now },

})

const CustomersModel = mongoose.model('Customers', CustomersSchema, 'Customers');
export default CustomersModel;
