import { injectable } from "tsyringe";
import bcrypt from "bcrypt";

import { HashService } from "../../application/services/HashService"; 

@injectable()
export class BcryptHashService implements HashService {
  private readonly _saltRounds = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this._saltRounds);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}
