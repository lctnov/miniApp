import { authApi } from "@/lib/api";
import { RegisterPayload, RegisterResponse } from "./types";


export async function registerService(payload: RegisterPayload): Promise<RegisterResponse> {
	try {

		const data = await authApi.register(payload);

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
