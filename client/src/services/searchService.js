import { create } from 'apisauce';

const SearchService = create({
    baseURL: 'http://localhost:5000/api/v1/search'
});

export default SearchService;