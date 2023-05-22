import { PlatformLinkOptions } from './PlatformLinkOptions';
import PlatformLinks from './PlatformLinks';

const PlatformSelect = () => {
	return (
		<div className="platform-container">
			<ul className="platform-list">
				{PlatformLinkOptions.map((item) => (
					<PlatformLinks key={item.id} option={item} />
				))}
			</ul>
		</div>
	);
};

export default PlatformSelect;
