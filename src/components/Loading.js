import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
	return (
		<div>
			<FontAwesomeIcon icon={faSpinner} className="spinner" spin />
		</div>
	);
};

export default Loading;
