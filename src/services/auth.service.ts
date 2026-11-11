import axiosInstance from "../axios/axios.config";

import type { LoginCredentials, LoginResponse } from "../models/auth.model";

// Login Service
export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  // هي نتيجة عملية رح تكتمل بالمستقبل، وممكن تنجح أو تفشل promise
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  return response.data;
}
