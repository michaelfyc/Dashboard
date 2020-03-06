/*
import axios from 'axios'

class Request{
    baseUrl = "/api";
    instance;

    constructor(){
        this.instance = axios.create({
            baseUrl: this.baseUrl
        });
    }

     request(method = "GET", path = "/", params = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                let options = {
                    method: method,
                    url: path
                };
                let payload = {
                    ...params
                };
                //TODO token expired and headers bearer
                if (method === "GET") {
                    options.params = payload;
                }
                if (method === "POST") {
                    options.data = params;
                }
                let result = await this.request(options);

                //TODO jwt auto-renewal

                if (result.data.status === "success") {
                    resolve(result.data.data);
                }
            } catch (e) {
                reject(this.parseErrorResponse(e));
            }
        })
    }

     get(path='/',params={},options={}){
        return this.request("GET",path,params,options);
    }

     post(path="/",data={},options={}){
        return this.request("POST",path,data,options);
    }
     parseErrorResponse(error){
        let parsedError={
            code:"",
            message:"",
            originMessage:undefined
        };

        if(error.response){
            if(error.response.data.data&&error.response.data.data.error){
                parsedError.code=error.response.data.data.error.code;
                parsedError.originMessage=error.response.data.data.error.message;
                if (Array.isArray(error.response.data.data.error.message)) {
                    parsedError.message = error.response.data.data.error.message.join(',');
                }
                else {
                    parsedError.message = error.response.data.data.error.message.toString();
                }
            }else{
                parsedError.message={
                    400: "HTTP 400 Bad Request",
                    401: "HTTP 401 Unauthorized",
                    403: "HTTP 403 Forbidden",
                    404: "HTTP 404 Not Found",
                    405: "HTTP 405 Method Not Allowed",
                    406: "HTTP 406 Not Acceptable",
                    408: "HTTP 408 Request Timeout",
                    414: "HTTP 414 URI Too Long",
                    418: "HTTP 418 I'm a teapot",
                    500: "HTTP 500 Internal Server Error",
                    502: "HTTP 502 Bad Gateway",
                    503: "HTTP 503 Service Unavailable",
                    504: "HTTP 504 Gateway Timeout"
                }[error.response.status]||`HTTP $(error.response.status)`;
            }
        }
        else if(error.request){
            parsedError.message="NETWORK ERROR";
        }
        else{
            parsedError.message="UNKNOWN ERROR";
        }
        return parsedError;
    }
}

export default Request;
*/
