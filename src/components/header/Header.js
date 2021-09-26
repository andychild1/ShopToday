import './Header.css';
import Carts from '../../features/cart/cart';

const Header = () => {
    return(
        <header className="header">
            <h1 className="title">Shop Today</h1>
            <Carts />
        </header>
    );
};

export default Header;