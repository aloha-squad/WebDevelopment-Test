import { create } from 'apisauce';

const SearchService = create({
    baseURL: 'http://localhost:5000/api/v1'
});

export default SearchService;