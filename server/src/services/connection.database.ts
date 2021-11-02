import { connect } from 'mongoose';

export async function connectDatabase(): Promise<void> {
  // 4. Connect to MongoDB
  var uri = "mongodb+srv://shimshon_1:7pFf4yA1NCa96VH2@cluster0.4bwlf.mongodb.net/permited81?retryWrites=true&w=majority";
  await connect(uri);

}