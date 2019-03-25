import { create } from 'apisauce';

const SearchService = create({
    baseURL: 'http://127.0.0.1:5000/api/v1'
});

export default SearchService;