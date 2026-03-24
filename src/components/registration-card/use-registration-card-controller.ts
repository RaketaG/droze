import { useState } from "react";

export const useRegistrationCardController = (
	username: string | null,
	password: string | null,
	email: string | null,
	phone: string | null,
	fullName: string | null,
) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [data, setData] = useState(null);

	const register = async () => {
		setLoading(true);
		setError("");
		setData(null);

		try {
			const response = await fetch(
				"/api/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username,
						password,
						email,
						phone,
						role: "restorator",
						fullName,
					})
				}
			);

			if (!response.ok) throw new Error("Something when wrong")


			const token = await response.json();

			setData(token);
		} catch (error) {
			setError("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return {
		register,
		loading,
		error,
		data
	}
}