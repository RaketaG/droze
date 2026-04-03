import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth-api";
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
	userId: string;
	userRole: string;
};

export const useLoginCardController = (username: string, password: string) => {
	const navigate = useNavigate();
	const { setAccessToken, setUserId, setRole } = useAuth();

	const loginMutation = useMutation({
		mutationFn: () => login({ username, password }),
		onSuccess: (data) => {
			const decode = jwtDecode<CustomJwtPayload>(data.accessToken);

			setAccessToken(data.accessToken);
			setUserId(decode?.userId);
			setRole(decode?.userRole);

			navigate("/admin-panel");
		}
	});

	return loginMutation;
};