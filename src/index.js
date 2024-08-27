import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoktLauncherContextProvider } from "./Rokt";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<RoktLauncherContextProvider accountId="3250330720171360256" sandbox={true}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</RoktLauncherContextProvider>
);
