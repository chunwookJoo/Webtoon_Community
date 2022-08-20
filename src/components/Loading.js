import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
	return (
		<li
			style={{
				display: "flex",
				justifyContent: "center",
				width: "100%",
				margin: "5em 0",
			}}
		>
			<FontAwesomeIcon size="xl" icon={faSpinner} className="spinner" spin />
		</li>
	);
};

export default Loading;
