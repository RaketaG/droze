import { useMutation } from "@tanstack/react-query";
import { register, type RegistrationBody } from "../../../api/auth-api";
import { useNavigate } from "react-router";
import { useToast } from "../../../components/toast";

export const useRegistrationCardController = () => {
	const navigate = useNavigate();
	const { showToast } = useToast();

	const registrationMutation = useMutation({
		mutationFn: (
			registrationBody: RegistrationBody) => register(registrationBody),
		onSuccess: () => {
			showToast("Registration Successful", "success");
			navigate("/login");
		}
	});

	return registrationMutation;
}