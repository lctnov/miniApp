import { authApi } from "@/lib/api";
import { LoginPayload, LoginResponse } from "./types";

export async function loginService(
  payload: LoginPayload
): Promise<LoginResponse> {

  try {

    const data = await authApi.login(payload);

    /**
     * Expected response từ backend
     * {
     *   success: true,
     *   data: { username: string }
     * }
     */

    return {
      success: data.success,
      user: data.data.user,
      message: data.message,
    };

  } catch (error: any) {

    return {
      success: false,
      message:
        error?.message ||
        "Không thể kết nối server",
    };

  }

}