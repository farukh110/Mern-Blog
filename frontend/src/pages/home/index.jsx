import { useEffect, useState } from 'react';
import './index.scss';
import { getNews } from '../../api/thirdParty';
import Loader from '../../components/controls/Loader/Loader';

const Home = () => {

    const [articles, setArticles] = useState([]);

    const newsApi = async () => {

        const res = await getNews();
        setArticles(res);
    }

    useEffect(() => {

        newsApi();

        setArticles([]);

    }, []);

    if (articles.length == 0) {
        return <Loader />
    }


    return (
        <>
            <div className='container home-section my-md-5'>
                <h1 className='text-left'>
                    Latest Articles
                </h1>

                <div className='row'>

                    {
                        articles.map((item, index) => (
                            <a href={item.url} key={index} className='col-md-4 my-3 text-decoration-none'>
                                <div className='article-content p-3'>

                                    <img className='img-fluid thumb' src={item.urlToImage} />
                                    {item.id}

                                    <h3 className='mt-md-2 title'>
                                        {item.title.split(' ').length > 4 ? item.title.split(' ').slice(0, 4).join(' ') + "..." : item.title}
                                    </h3>

                                    <div className='row'>

                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6'></div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
                                            <p className='mb-0'> {item.publishedAt} </p>
                                        </div>

                                    </div>


                                </div>
                            </a>
                        ))
                    }

                </div>

            </div>
        </>
    )
}

export default Home;