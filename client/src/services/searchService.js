import { create } from 'apisauce';

const SearchService = create({
    baseURL: process.env.REACT_APP_API_URL
});

export default SearchService;