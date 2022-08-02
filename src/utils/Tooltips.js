import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const Tooltips = ({ isOpen, toggle, target, text }) => {
	return (
		<Tooltip placement="top" isOpen={isOpen} target={target} toggle={toggle}>
			{text}
		</Tooltip>
	);
};

export default Tooltips;
