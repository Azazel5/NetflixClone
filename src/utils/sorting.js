export const sortVideosByPopularity = (a, b) => {
    if (a.popularity > b.popularity) {
        return -1;
    }
    if (a.popularity < b.popularity) {
        return 1;
    }
    return 0;
}

