import { create } from 'apisauce';

const SearchService = create({
    baseURL: 'https://webdevelopment.mybluemix.net/api/v1'
});

export default SearchService;