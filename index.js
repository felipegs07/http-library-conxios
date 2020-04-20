const conxios = conxiosCreator();

conxios.post("https://jsonplaceholder.typicode.com/posts", {
	body: JSON.stringify({
		title: 'foo',
		body: 'bar',
		userId: 1
	}),
	headers: {
		"Content-type": "application/json; charset=UTF-8"
	}
}).then(data => {
			console.log(data)
	}).catch(error => console.error(error));