import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API;

const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=business&
blockchain&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;

export const getNews = async () => {

    let res;

    try {

        res = await axios.get(NEWS_API_ENDPOINT);

        res = res.data.articles.slice(0, 15);

    } catch (error) {
        return error;
    }

    return res;
};