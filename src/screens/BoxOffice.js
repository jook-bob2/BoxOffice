import React, { useEffect } from 'react'
import BoxOfficeItem from '../components/BoxOfficeItem'
import { dailyBoxOfficeUrl, kobisKey, movieDetailUrl, yesterDay } from '../api/kobisApi'
import useFetch, { preFetch } from '../net/useFetch'
import Paragraph from '../components/ui/Paragraph'
import { ActivityIndicator, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

export default function BoxOffice() {
	const { data, error } = useFetch(dailyBoxOfficeUrl, { key: kobisKey, targetDt: yesterDay })

	useEffect(() => {
		if (!data) return

		getDetailPreFetch()
	}, [data])

	if (error) return <Paragraph>{JSON.stringify(error)}</Paragraph>
	if (!data) return <ActivityIndicator size="large" />
	const ranks = data?.boxOfficeResult?.dailyBoxOfficeList || []

	async function getDetailPreFetch() {
		for (const rank of ranks) {
			await preFetch(movieDetailUrl, { key: kobisKey, movieCd: rank.movieCd })
		}
	}

	return (
		<>
			<View style={tw`bg-white p-4 border-b`}>
				<Text style={tw`text-xl font-bold`}>박스 오피스</Text>
			</View>
			{ranks.map((item) => (
				<BoxOfficeItem key={item.rnum} data={item} />
			))}
		</>
	)
}
