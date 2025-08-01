
export interface IRefreshAccessTokenUseCase {
  execute(refreshToken: string): string;
}
