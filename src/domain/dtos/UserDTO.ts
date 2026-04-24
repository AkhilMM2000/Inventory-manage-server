export interface RegisterRequestDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  fullName: string;
  email: string;
}
