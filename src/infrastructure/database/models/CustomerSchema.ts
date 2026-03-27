import mongoose, { Schema, Document } from "mongoose";

export interface CustomerDocument extends Document {
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    district: string;
    state: string;
    postalCode: string;
    country: string;
  };
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
}
const AddressSchema: Schema = new Schema(
  {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    mobile: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CustomerModel = mongoose.model<CustomerDocument>("Customer", CustomerSchema);
