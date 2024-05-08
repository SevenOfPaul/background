import axios from "axios";

const http = async (method, url, params) => {
    if (method == "GET") {
        const {status,data} = await axios({ method: "GET", url, params })
        if (status == "200") {
            return data
        } else {
            return null
        }
    } else if (method == "POST") {

        const { status, data } = axios({ method: "POST", url, data: params })
        if (status == "200") {
            return data
        } else {
            return null
        }
    } else {
        throw new Error("请求方式不合规")
    }
}

export default http