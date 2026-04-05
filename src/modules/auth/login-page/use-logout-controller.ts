import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../api/auth-api";
import { useToast } from "../../../components/toast";

export const useLogoutCardController = () => {
	const navigate = useNavigate();

	const { showToast } = useToast();

	const { mutate: logoutMutation } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			useAuth.persist.clearStorage();
			showToast("Logout Successful", "success")
			navigate("/login");
		}
	});

	return {
		logoutMutation
	};
};