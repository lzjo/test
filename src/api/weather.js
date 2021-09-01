import instance from '@/utils/request.js'
function getCity(params) {
    return instance({
        url: "/weather_mini?city=" + params,
        method: "get",
    })
}
export { getCity }