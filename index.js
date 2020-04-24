const conxios = conxiosCreator();

conxios.get("https://jsonplaceholder.typicode.com/posts", {
	body: JSON.stringify({
		title: 'foo',
		body: 'bar',
		userId: 1
	}),
	headers: {
		"Content-type": "application/json; charset=UTF-8",
		"Access-Control-Allow-Origin": "*"
	}
}).then(data => {
			console.log(data)
	}).catch(error => console.error(error));