import mongoose, { Schema, Document } from "mongoose";

export interface ItemDocument extends Document {
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema<ItemDocument> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true, 
  }
);

export const ItemModel = mongoose.model<ItemDocument>("Item", ItemSchema);
