import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../api/ApiService';
import { resetUser, setUser } from '../../../store/userSlice';
import logo from '../../../assets/images/logo/logo.svg';
import './index.scss';

const Navbar = () => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.user.auth);

    const handleLogout = async () => {
        await logout();
        dispatch(resetUser());
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            dispatch(setUser(user));
        }
    }, [dispatch]);


    return (
        <>
            <nav className="navbar navbar-expand-lg custom-navigation shadow navbar-light bg-light">
                <div className="container">
                    <NavLink to='/' className="navbar-brand">
                        <img className='img-fluid logo' src={logo} />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/quotes'>Quotes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/blogs'>Blogs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/post-blog'>Post your Blog</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            {isAuthenticated ? (
                                <button className='btn btn-primary btn-dark-blue' onClick={handleLogout}>
                                    Log out
                                </button>
                            ) : (
                                <>
                                    <NavLink to='/login' className="btn btn-outline-success btn-dark-blue">
                                        Login
                                    </NavLink>
                                    <NavLink to='/register' className="btn btn-outline-success btn-dark-blue ms-3">
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
