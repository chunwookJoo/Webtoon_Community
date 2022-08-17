import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

import "./index.scss";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<RecoilRoot>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</RecoilRoot>,
);
