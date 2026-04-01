import { useMutation } from "@tanstack/react-query";
import { register, type RegistrationBody } from "../../../api/auth-api";
import { useNavigate } from "react-router";

export const useRegistrationCardController = (
	registrationBody: RegistrationBody
) => {
	const navigate = useNavigate();

	const mutant = useMutation({
		mutationFn: () => register(registrationBody),
		onSuccess: () => navigate("/login")
	});

	return mutant;
}