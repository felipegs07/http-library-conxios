function conxiosCreator(config){
    const createXHRObject = () => {
       return new XMLHttpRequest();
    }
    const createRequestUrl = (endpoint) => {
        return config.baseURL ? config.baseURL + endpoint : endpoint;
    }
    const xhr = createXHRObject();

    return {
        http: (method, endpoint, data) => {
            return new Promise((resolve, reject) => {
                xhr.open(method, createRequestUrl(endpoint), true);
                xhr.onload = function(){
                    if (this.status == 200) {
                        resolve(JSON.parse(this.response));
                    }
                    if(this.status >= 400){
                        reject(JSON.parse(this.response));
                    }
                }
                
                xhr.send(data);
            });
        }
    }
}