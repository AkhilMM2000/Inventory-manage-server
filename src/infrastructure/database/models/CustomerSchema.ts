import mongoose, { Schema, Document } from "mongoose";

export interface CustomerDocument extends Document {
  name: string;
  address: string;
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CustomerModel = mongoose.model<CustomerDocument>("Customer", CustomerSchema);
