const conxios = conxiosCreator();

conxios.http("GET", "https://jsonplaceholder.typicode.com/posts")
    .then(data => {
        console.log('then', data)
    })
    .catch(error => console.error(error));