const apiUrl = (url) => {
    switch (url) {
        case 'http://localhost:3000':
            return 'http://localhost:8080';

        case 'https://sprint-dev-git-master-andreybento.vercel.app':
            return 'https://sprintdevback.herokuapp.com';
    }
};

export default apiUrl;