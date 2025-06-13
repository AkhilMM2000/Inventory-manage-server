import mongoose, { Schema, Document } from "mongoose";
import { Item } from "../../../domain/models/Item";

export interface ItemDocument extends Document, Omit<Item, "id"> {}
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
