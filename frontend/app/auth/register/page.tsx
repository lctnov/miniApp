"use client";

import { useState } from "react";
import { RegisterForm } from "./view";

export function RegisterPage() {
	const [registered, setRegistered] = useState(false);

	return (
		<div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
			<RegisterForm
				onSwitchToLogin={() => {}}
				onRegisterSuccess={() => setRegistered(true)}
			/>
		</div>
	);
}
