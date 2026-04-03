import { useMutation } from "@tanstack/react-query";
import { register, type RegistrationBody } from "../../../api/auth-api";
import { useNavigate } from "react-router";

export const useRegistrationCardController = () => {
	const navigate = useNavigate();

	const registrationMutation = useMutation({
		mutationFn: (
			registrationBody: RegistrationBody) => register(registrationBody),
		onSuccess: () => navigate("/login")
	});

	return registrationMutation;
}