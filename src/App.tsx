import { RouterProvider } from "react-router";
import router from "./routs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/toast";
const queryClient = new QueryClient();

function App() {
	return (
		<ToastProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ToastProvider>
	);
}

export default App;
