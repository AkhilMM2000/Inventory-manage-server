import mongoose, { Schema, Document } from "mongoose";

export interface SaleItemDocument {
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface SaleDocument extends Document {
  customerId: string;
  customerName: string;
  paymentType: "Cash" | "Credit";
  items: SaleItemDocument[];
  totalAmount: number;
  createdAt: Date;
}

const SaleItemSchema = new Schema<SaleItemDocument>(
  {
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  },
  { _id: false }
);

const SaleSchema = new Schema<SaleDocument>(
  {
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    paymentType: { type: String, enum: ["Cash", "Credit"], required: true },
    items: { type: [SaleItemSchema], required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const SaleModel = mongoose.model<SaleDocument>("Sale", SaleSchema);
