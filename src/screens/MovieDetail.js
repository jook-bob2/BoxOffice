import { useRoute } from '@react-navigation/core'
import React, { useEffect } from 'react'
import Row from '../components/Row'
import Paragraph from '../components/ui/Paragraph'
import { kobisKey as kobosKey, movieDetailUrl } from '../api/kobisApi'
import moment from 'moment'
import Link from '../components/ui/Link'
import { ActivityIndicator } from 'react-native'
import useFetch from '../net/useFetch'

export default function MovieDetail({ navigation }) {
	const { params } = useRoute()

	const { data, error } = useFetch(movieDetailUrl, { key: kobosKey, movieCd: params.movieCd })

	useEffect(() => {
		if (data) {
			navigation.setOptions({
				title: data.movieInfoResult.movieInfo.movieNm,
			})
		}
	}, [data])

	if (error) return <Paragraph>{JSON.stringify(error)}</Paragraph>
	if (!data) return <ActivityIndicator size="large" />

	const detail = data.movieInfoResult.movieInfo

	return (
		<>
			<Row>
				<Paragraph>영화명 : {detail.movieNm}</Paragraph>
			</Row>
			<Row>
				<Paragraph>상영시간 : {detail.showTm}분</Paragraph>
			</Row>
			<Row>
				<Paragraph>개봉일 : {moment(detail.openDt).format('YYYY년 MM월 DD일')}</Paragraph>
			</Row>
			<Row>
				<Paragraph>
					감독 :{' '}
					{detail.directors.map((director, index) => (
						<Link
							key={index}
							onPress={() => {
								navigation.navigate('SearchResult', {
									peopleNm: director.peopleNm,
								})
							}}>
							{director.peopleNm}
						</Link>
					))}
				</Paragraph>
			</Row>
			<Row>
				<Paragraph>
					출연 :{' '}
					{detail.actors.map((actor, index) => (
						<Link
							key={index}
							onPress={() => {
								navigation.navigate('SearchResult', {
									peopleNm: actor.peopleNm,
								})
							}}>
							{actor.peopleNm}
						</Link>
					))}
				</Paragraph>
			</Row>
		</>
	)
}
