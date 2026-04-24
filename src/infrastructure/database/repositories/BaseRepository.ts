import { flattenObject } from "../../../shared/utils/objectUtils";

export abstract class BaseRepository<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract _model: any;
   
  protected abstract map(doc: any): T;

  async create(data: Partial<T>): Promise<T> {
    const created = await this._model.create(data);
    return this.map(created);
  }

  async findById(id: string): Promise<T | null> {
    const doc = await this._model.findById(id);
    return doc ? this.map(doc) : null;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const flattenedData = flattenObject(data);
    const updated = await this._model.findByIdAndUpdate(id, flattenedData, { new: true });
    return updated ? this.map(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this._model.findByIdAndDelete(id);
    return !!deleted;
  }
}
