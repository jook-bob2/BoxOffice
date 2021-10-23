import moment from 'moment'

export const kobisKey = 'b054806ba1ece8ef9f173371a1e5cb29'
// 일별 박스오피스 URL
export const dailyBoxOfficeUrl =
	'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'

// 영화 상세 정보
export const movieDetailUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json'

// 영화인 목록
export const peopleListUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json'

// 어제
export const yesterDay = moment().subtract(1, 'day').format('YYYYMMDD')
