import axios from "axios";

export const apiClient = axios.create({
  timeout: 10000,
});

export function getApiErrorMessage(caughtError: unknown) {
  if (axios.isAxiosError(caughtError)) {
    const status = caughtError.response?.status;
    return status ? `Request failed with status ${status}` : caughtError.message;
  }

  return caughtError instanceof Error ? caughtError.message : "Unknown error";
}
