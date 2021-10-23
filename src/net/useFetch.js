import axios from 'axios'
import useSWR, { mutate } from 'swr'

export const fetcher = (url) => {
	return axios.get(url).then((response) => response.data)
}

export default function useFetch(url, params = {}) {
	return useSWR(`${url}?${getQueryString(params)}`, fetcher)
}

export const preFetch = (url, params = {}) => {
	const uri = `${url}?${getQueryString(params)}`
	return mutate(uri, fetcher(uri))
}

function getQueryString(params) {
	const qs = []
	for (const key in params) {
		qs.push(`${key}=${params[key]}`)
	}

	return qs.join('&')
}
