import * as mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  number: Number,
  content: String,
  createdAt: Date,
});
// export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
export default MessageSchema;

