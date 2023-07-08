import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// export const login = async (data) => {

//     let res;

//     try {

//         res = await api.post("/login", data);

//         if (res.status === 200) {
//             const user = {
//                 _id: res.data.user._id,
//                 email: res.data.user.email,
//                 username: res.data.user.username,
//                 auth: res.data.auth,
//             };

//             // Save user data in local storage
//             localStorage.setItem('user', JSON.stringify(user));

//         }
//     } catch (error) {
//         return error;
//     }

//     return res;
// }

export const login = async (data) => {

    let res;

    try {
        res = await api.post("/login", data);
    } catch (error) {
        return error;
    }

    return res;
};

export const register = async (data) => {

    let res;

    try {
        res = await api.post("/register", data);

    } catch (error) {
        return error;
    }
    return res;
}

export const logout = async () => {

    let res;

    try {
        res = await api.post("/logout");

    } catch (error) {
        return error;
    }
    return res;
};

export const getAllblogs = async () => {

    let res;

    try {

        res = await api.get("/blog/all");

    } catch (error) {
        return error;
    }
    return res;
};

export const submitBlogPost = async (data) => {

    let res;

    try {

        res = await api.post('/blog', data);

    } catch (error) {
        return error;

    }
    return res;
};

export const getBlogById = async (id) => {

    let res;

    try {

        res = await api.get(`/blog/${id}`);

    } catch (error) {
        return error;
    }
    return res;
};

export const getCommentsById = async (id) => {

    let res;

    try {

        res = await api.get(`/comment/${id}`, {
            validateStatus: false,
        });

    } catch (error) {
        return error;
    }
    return res;
};

export const postComment = async (data) => {

    let res;
    try {

        res = await api.post('/comment', data);

    } catch (error) {
        return error;
    }
    return res;
}

export const deleteComment = async (id) => {

    let res;

    try {

        res = await api.delete(`/blog/${id}`);

    } catch (error) {
        return error;
    }
    return res;
}