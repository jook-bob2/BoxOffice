import React, { useCallback } from 'react'
import Row from './Row'
import Paragraph from './ui/Paragraph'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import styled from 'styled-components/native'

const Container = styled.View`
	padding: 12px;
`

function RankIntenIcon({ rankInten }) {
	if (Number(rankInten) > 0) {
		return '🔼'
	} else if (Number(rankInten) < 0) {
		return '🔽'
	}
	return '⏺'
}

export default function BoxOfficeItem({ data }) {
	const { navigate } = useNavigation()

	const navigateMovieDetail = useCallback(
		(movieCd) => {
			navigate('MovieDetail', { movieCd })
		},
		[navigate],
	)

	return (
		<Pressable onPress={() => navigateMovieDetail(data.movieCd)}>
			<Container>
				<Row>
					<Paragraph>{data.rank}</Paragraph>
					<Paragraph>
						<RankIntenIcon rankInten={data.rankInten} /> {Number(data.rankInten)}
					</Paragraph>
					<Paragraph>{data.movieNm}</Paragraph>
					<Paragraph>{data.rankOldAndNew === 'NEW' ? '🆕' : ''}</Paragraph>
				</Row>
			</Container>
		</Pressable>
	)
}
