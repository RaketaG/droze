import { useState } from "react";

export const useLoginCardController = (username: string, password: string) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [data, setData] = useState<{ token: string } | null>(null);

	const login = async () => {
		setLoading(true);
		setError("");
		setData(null);

		try {
			const response = await fetch(
				"/api/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username,
						password
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
		login,
		loading,
		error,
		data
	}
}