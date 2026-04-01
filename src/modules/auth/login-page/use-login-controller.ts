import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth-api";

export const useLoginCardController = (username: string, password: string) => {
	const navigate = useNavigate();
	const { setAccessToken } = useAuth();

	const mutant = useMutation({
		mutationFn: () => login({ username, password }),
		onSuccess: (data) => {
			setAccessToken(data.accessToken);
			navigate("/admin-panel");
		}
	})

	return mutant;
};