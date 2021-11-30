/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

// export const createTop5List = (payload) => api.post(`/top5list/`, payload)
// export const getAllTop5Lists = () => api.get(`/top5lists/`)
// export const getTop5ListPairs = (email) => api.get(`/top5listpairs/${email}`)
// export const updateTop5ListById = (id, payload) => api.put(`/top5list/${id}`, payload)
// export const deleteTop5ListById = (id) => api.delete(`/top5list/${id}`)
// export const getTop5ListById = (id) => api.get(`/top5list/${id}`)


// Top5List routes
export const updateUserTop5List = (id, payload) => api.put(`/userTop5List/${id}`, payload);
export const createUserTop5List = (payload) => api.post(`/usertop5list/`, payload);
export const publishTop5List = (id, payload) => api.put(`/publish/${id}`, payload);
export const deleteUserTop5List = (id) => api.delete(`/usertop5list/${id}`);
export const getTop5Lists = () => api.get(`/top5lists/`);
export const getUserTop5Lists = () => api.get(`/usertop5lists/`);

// CommunityTop5List routes
export const createCommunityTop5List = (payload) => api.post(`/communitytop5list/`, payload);
export const getAllCommunityTop5Lists = () => api.get(`/communitytop5lists/`);
export const getCommunityTop5List = (community) => api.get(`/communitytop5list/${community}`);
export const addToCommunityTop5List = (community, payload) => api.put(`/communitytop5lists/addto/${community}`, payload);
export const removeFromCommunityTop5List = (community, payload) => api.put(`/communitytop5lists/removefrom/${community}`, payload);
export const deleteCommunityTop5List = (community) => api.delete(`/communitytop5list/${community}`);

// Post routes 
export const createPost = (payload) => api.post(`/post/`, payload);
export const getAllPosts = () => api.get(`/posts/`);
export const getPostById = (id) => api.get(`/post/${id}`);
export const updatePost = (id, payload) => api.put(`/post/${id}`, payload);
export const deletePost = (id) => api.delete(`/post/${id}`);

// Auth routes
export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload);
export const loginUser = (payload) => api.post(`/login/`, payload);
export const logoutUser = () => api.get(`/logout/`);

const apis = {
    updateUserTop5List,
    createUserTop5List, 
    publishTop5List,
    deleteUserTop5List,
    getTop5Lists,
    getUserTop5Lists,

    createCommunityTop5List,
    getAllCommunityTop5Lists,
    getCommunityTop5List,
    addToCommunityTop5List,
    removeFromCommunityTop5List,
    deleteCommunityTop5List,

    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,

    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis
