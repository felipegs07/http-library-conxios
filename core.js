function conxiosCreator(config = {}){
    const createXHRObject = () => {
       return new XMLHttpRequest();
    }
    const createRequestUrl = (endpoint) => {
        return config.baseURL ? config.baseURL + endpoint : endpoint;
		}
		const configHeaders = (headers) => {
			console.log(headers);
			//xhr.setRequestHeader(data.headers);
		}

    const xhr = createXHRObject();

    return {
			http(method = '', endpoint = '', data = {}) {
					return new Promise((resolve, reject) => {
							xhr.open(method, createRequestUrl(endpoint), true);
							
							configHeaders(data.headers);
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
			get(endpoint, data) {
					return this.http('GET', endpoint, data);
			},
			post(endpoint, data) {
					return this.http('POST', endpoint, data);
			},
			patch(endpoint, data) {
				return this.http('PATCH', endpoint, data);
			},
			put(endpoint, data) {
				return this.http('PUT', endpoint, data);
			},
			delete(endpoint, data) {
				return this.http('DELETE', endpoint, data);
			}
	}
}