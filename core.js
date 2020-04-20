function conxiosCreator(config = {}){
    const createXHRObject = () => {
       return new XMLHttpRequest();
    }
    const createRequestUrl = (endpoint) => {
        return config.baseURL ? config.baseURL + endpoint : endpoint;
    }

    const xhr = createXHRObject();

    return {
			http(method = '', endpoint = '', data = {}) {
					return new Promise((resolve, reject) => {
							xhr.open(method, createRequestUrl(endpoint), true);

							console.log(data)
							if(data.headers) xhr.setRequestHeader(data.headers);
							console.log('xhr', xhr);

							xhr.onload = () => {
								if (xhr.status >= 200 && xhr.status < 300) {
										resolve(JSON.parse(xhr.response));
								}
								if(xhr.status >= 400){
										reject(JSON.parse(xhr.response));
								}
							}
							
							xhr.send(data.body);
					});
			},
			get(endpoint) {
					return this.http('GET', endpoint, data);
			},
			post(endpoint, data) {
					return this.http('POST', endpoint, data);
			}
	}
}