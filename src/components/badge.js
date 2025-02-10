import {getStatusBadgeStyle} from '../utils'

const Badge = ({ status }) => {
    const style = getStatusBadgeStyle(status);
    return <span style={style}>{status}</span>;
};

export default Badge;