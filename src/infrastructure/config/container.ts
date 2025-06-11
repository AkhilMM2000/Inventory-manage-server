import { container } from "tsyringe";
import { HashService } from "../../application/services/HashService"; 
import { BcryptHashService } from "../services/BcryptHashService";


container.register<HashService>("IHashService", {
  useClass: BcryptHashService,
});
