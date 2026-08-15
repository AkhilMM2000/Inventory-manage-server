import { AppError } from "../../domain/errors/AppError";
import { HTTP_STATUS_CODES } from "../../constants/HttpStatuscode";
import { ERROR_MESSAGES } from "../../constants/ErrorMessage";
import { Address } from "../../domain/models/Customer";

export interface AddCustomerDTO {
  name: string;
  address: Address;
  mobile: string;
}

export class CustomerValidator {
  static validateCreate(data: AddCustomerDTO) {
    const { name, address, mobile } = data;

    if (!name || !address || !mobile) {
      throw new AppError(
        ERROR_MESSAGES.REQUIRED_FIELDS_MISSING,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    const { line1, city, district, state, postalCode, country } = address;

    if (!line1 || !city || !district || !state || !postalCode || !country) {
      throw new AppError(
        ERROR_MESSAGES.REQUIRED_FIELDS_MISSING,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

        const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
   const line1Regex = /^[A-Za-z0-9/, ]+$/;

    const lettersOnly = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const postalRegex = /^\d{6,7}$/;

    if (!nameRegex.test(name)) {
      throw new AppError("Name must contain letters only", HTTP_STATUS_CODES.BAD_REQUEST);
    }
    if (!line1Regex.test(line1)) {
      throw new AppError("Address line1 must contain letters/numbers only", HTTP_STATUS_CODES.BAD_REQUEST);
    }
    if (!lettersOnly.test(city)) {
      throw new AppError("City must contain letters only", HTTP_STATUS_CODES.BAD_REQUEST);
    }
    if (!lettersOnly.test(district)) {
      throw new AppError("District must contain letters only", HTTP_STATUS_CODES.BAD_REQUEST);
    }
    if (!lettersOnly.test(state)) {
      throw new AppError("State must contain letters only", HTTP_STATUS_CODES.BAD_REQUEST);
    }
    if (!lettersOnly.test(country)) {
      throw new AppError("Country must contain letters only", HTTP_STATUS_CODES.BAD_REQUEST);
    }

    if (!postalRegex.test(postalCode)) {
      throw new AppError(
        "Postal code must be 6 or 7 digits",
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

  }
}
