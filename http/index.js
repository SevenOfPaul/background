import axios from "axios";
import https from "https";
//忽略证书
const ignoreSSL = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
const http = async (method, url, params) => {
    if (method == "GET") {
        const {status,data} = await ignoreSSL({ method: "GET", url, params });
        if (status == "200") {
            return data
        } else {
            return null
        }
    } else if (method == "POST") {
        const { status, data } = ignoreSSL({ method: "POST", url, data: params });
        if (status == "200") {
            return data
        } else {
            return null
        }
    } else {
        throw new Error("请求方式不合规");
    }
}

export default http