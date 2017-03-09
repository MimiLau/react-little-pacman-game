import React, {PropTypes} from 'react';

const Topbar = (props) => (
	<header className="app-header text-xs-center">
		Pac-man with React
	</header>
);

Topbar.propTypes = {
	backToStart: PropTypes.func
};

export default Topbar;
