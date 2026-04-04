import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../api/auth-api";

export const useLogoutCardController = () => {
	const navigate = useNavigate();

	const { mutate: logoutMutation } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			useAuth.persist.clearStorage();
			navigate("/login");
		}
	});

	return {
		logoutMutation
	};
};