import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo/logo.svg';
import './index.scss';

const Footer = () => {
    return (
        <>
            <footer className='footer py-md-5'>
                <div className='container'>
                    <div className='row'>

                        <div className='col-xl-4 col-lg-4 col-md-4 col-12'>
                            <h2>
                                About Us
                            </h2>
                            <p>
                                Nehjul Balagha is a collection of sermons, letters, and sayings attributed to Ali ibn Abi Talib, a prominent figure in early Islamic history. It offers profound insights into various aspects of life, ethics, governance, and spirituality. Ali, known for his wisdom and commitment to justice, served as the fourth caliph of Islam. Nehjul Balagha was compiled after his martyrdom and remains a significant literary and philosophical work in Islamic tradition.
                            </p>
                        </div>
                        <div className='col-xl-2 col-lg-4 col-md-4 col-12'>

                            <h2>
                                Other Links
                            </h2>

                            <ul className='footer_menu'>
                                <li> <Link to='/'> Home </Link> </li>
                                <li> <Link to='/about'> About Us </Link> </li>
                                <li> <Link to='/quotes'> Quotes </Link> </li>
                                <li> <Link to='/blogs'> Blogs </Link> </li>
                                <li> <Link to='/post-blog'> Post your Blog </Link> </li>
                            </ul>

                        </div>

                        <div className='col-xl-2 col-lg-4 col-md-4 col-12'>

                            <h2>
                                Quick Links
                            </h2>

                            <ul className='footer_menu'>

                                <li> <Link to='/register'> Register </Link> </li>
                                <li> <Link to='/login'> Login </Link> </li>
                            </ul>

                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-12'>

                            <h2>
                                Contact Us
                            </h2>

                            <p>
                                <strong>Email </strong> : <a className='text-decoration-none text-dark' href='mailto:info@nehjulbalagha.com'>info@nehjulbalagha.com</a>
                            </p>

                            <p>
                                <strong>Phone </strong> : <a className='text-decoration-none text-dark' href='tel:+923002823823'>03002823823</a>
                            </p>

                            <p>
                                <strong>Location </strong> : Karachi
                            </p>


                        </div>

                    </div>

                    <div className='sep'></div>

                    <div className='row my-md-0'>

                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 align-self-center'>

                            <Link to='/'>
                                <img className='img-fluid w-50' src={logo} alt='Nehjul Balagha' />
                            </Link>

                        </div>

                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 align-self-center'>

                            <ul className='footer_horizontal-menu float-end mb-0'>

                                <li><Link className='text-decoration-none text-dark' to='terms'>Terms of Use</Link></li>
                                <li><Link className='text-decoration-none text-dark ms-2' to='privacy-policy'>Privacy Policy</Link></li>

                            </ul>

                        </div>

                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer;