import {axiosInstance, categoryMap} from './config'

export const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (category, alpha, count) => {
  const {type, area} = !!category ? categoryMap.get(category) : {}
  return axiosInstance.get(`/artist/list?${type && area ? `type=${type}&area=${area}` : ''}&initial=${alpha.toLowerCase()}&offset=${count}`)
}

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`)
}

export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}

export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`)
}
//拼接出歌曲的url链接
export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export const getLyricRequest = id => {
  return axiosInstance.get(`/lyric?id=${id}`)
}
