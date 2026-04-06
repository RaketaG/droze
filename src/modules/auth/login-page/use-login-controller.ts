import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth-api";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useToast } from "../../../components/toast";

interface CustomJwtPayload extends JwtPayload {
	userId: string;
	userRole: "admin" | "restorator" | "user";
	username: string;
	email: string;
	phone: string;
	fullName: string;
};

export const useLoginCardController = () => {
	const navigate = useNavigate();

	const { showToast } = useToast();

	const {
		setAccessToken,
		setUserId,
		setUserRole,
		setUsername,
		setUserEmail,
		setUserPhone,
		setUserFullName,
	} = useAuth();

	const loginMutation = useMutation({
		mutationFn: ({ username, password }: { username: string, password: string }) =>
			login({ username, password }),
		onSuccess: (data) => {
			const decode = jwtDecode<CustomJwtPayload>(data.accessToken);

			setAccessToken(data.accessToken);
			setUserId(decode?.userId);
			setUserRole(decode?.userRole);
			setUsername(decode?.username);
			setUserEmail(decode?.email);
			setUserPhone(decode?.phone);
			setUserFullName(decode?.fullName);

			showToast("Login Successful", "success");

			navigate("/admin-panel");
		}
	});

	return loginMutation;
};