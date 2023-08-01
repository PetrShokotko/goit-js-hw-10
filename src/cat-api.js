import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common["x-api-key"] = "live_PKfqBossWMuoKEv3t9TWkjCYsPct4eHKe4tQGgVmjJ0AZWzUI3biFi5KNI1FrrFC";

const END_POINTS = {
    breeds: 'breeds',
    info: 'images/search',
};

export const fetchBreeds = () => {
    return axios.get(END_POINTS.breeds);
};

export const fetchCatByBreed = breedId => {
    return axios.get(END_POINTS.info, { params: { breed_ids: breedId } });
};


// axios.defaults.headers.common["x-api-key"] = "live_PKfqBossWMuoKEv3t9TWkjCYsPct4eHKe4tQGgVmjJ0AZWzUI3biFi5KNI1FrrFC";
