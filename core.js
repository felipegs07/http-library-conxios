function conxiosCreator(configs = {}) {
		//CREATION FUNCTIONS
		const createXHRObject = () => {
			return new XMLHttpRequest();
		};
		const prepareXHRObject = () => {
			const newXHR = createXHRObject();
			configXHR(configs);
			
			return newXHR;
		};

		//SETTING FUNCTIONS
		const configHeaders = (headers) => {
			for (headerKey in headers) {
				xhr.setRequestHeader(headerKey, headers[headerKey]);
			}
		};
		const configTimeout = (timeout) => {
			xhr.timeout = timeout;
		};
		const configXHR = (config = {}) => {
			if(config.headers)
				configHeaders(config.headers);

			if(config.timeout)
				configTimeout(config.timeout);
		};

		 //LIBRARY UTILS
		const createRequestUrl = (endpoint) => {
			return configs.baseURL ? configs.baseURL + endpoint : endpoint;
		};

		//INIT
		 const xhr = prepareXHRObject();

    return {
			http(method = '', endpoint = '', data = {}) {
				return new Promise((resolve, reject) => {
						xhr.open(method, createRequestUrl(endpoint), true);
						
						configHeaders(data.headers);

						xhr.onload = () => {
							const response = {
								data: JSON.parse(xhr.response),
								url: xhr.responseURL,
								status: xhr.status,
								statusText: xhr.statusText,
								headers: xhr.getAllResponseHeaders()
							}

							if (xhr.status >= 200 && xhr.status < 300) {
								resolve(response);
							}
							else {
								reject(response);
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
			},
			config(configs) {
				configXHR(configs);
				return true;
			}
	}
}