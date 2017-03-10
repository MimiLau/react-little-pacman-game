import React, {PropTypes} from 'react';

const Topbar = (props) => (
	<header className="app-header text-xs-center">
		React Game
	</header>
);

Topbar.propTypes = {
	backToStart: PropTypes.func
};

export default Topbar;
