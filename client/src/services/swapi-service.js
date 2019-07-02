export default class SwapiService {
    async getMovies() {
        try {
            const resp = await fetch("http://localhost:9000/getMovies");
            return resp.json();
        } catch(e) {
            console.log(e);
        }
    }

    async removeMovie(id) {
        try {
            const resp = await fetch(`http://localhost:9000/removeMovie?id=${id}`, {
                method: 'delete'
            });
            return resp.json();
        } catch(e) {
            console.log(e);
        }
    }

    async addMovie(payload) {
        try {
            const resp = await fetch(`http://localhost:9000/addMovie`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            return resp.json();
        } catch(e) {
            console.log(e);
        }
    }
}   
