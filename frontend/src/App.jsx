import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './pages/home';
import Protected from './protected/Protected';
import Blogs from './pages/blogs';
import Login from './pages/login';
import Register from './pages/register';
import PostBlog from './pages/post-blog/inex';
import NotFound404 from './pages/404';
import { useSelector } from 'react-redux';
import PrivacyPolicy from './pages/privacy-policy';
import TermsUse from './pages/terms';
import BlogDetails from './pages/blog-details';

const App = () => {

  const isAuth = useSelector((state) => state.user.auth);

  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/quotes' exact element={<Home />} />
            {/* <Route path='/blogs' exact element={<Protected isAuth={isAuth}> <Blogs /> </Protected>} /> */}
            <Route path='/blogs' exact element={<Blogs />} />
            <Route path='/blog/:id' exact element={<BlogDetails />} />
            <Route path='/post-blog' exact element={<Protected isAuth={isAuth}> <PostBlog /> </Protected>} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/register' exact element={<Register />} />
            <Route path='/privacy-policy' exact element={<PrivacyPolicy />} />
            <Route path='/terms' exact element={<TermsUse />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;