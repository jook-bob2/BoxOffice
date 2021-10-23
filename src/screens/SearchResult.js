import { useFocusEffect, useRoute } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { kobisKey, peopleListUrl } from '../api/kobisApi'
import { FlatList, Pressable, Text } from 'react-native'
import Paragraph from '../components/ui/Paragraph'
import styled from 'styled-components/native'

const Padding = styled.View`
	padding: 20px;
`

export default function SearchResult() {
	const { params } = useRoute()
	const [list, setList] = useState([])

	useFocusEffect(
		useCallback(() => {
			getPeopleList()
		}, []),
	)

	async function getPeopleList() {
		if (params.peopleNm) {
			try {
				const response = await axios.get(peopleListUrl, {
					params: {
						key: kobisKey,
						peopleNm: params.peopleNm,
					},
				})

				setList(response.data?.peopleListResult?.peopleList)
			} catch (error) {
				console.log(error.message)
			}
		}
	}

	return (
		<FlatList
			data={list}
			keyExtractor={(item) => item.peopleCd}
			renderItem={(data) => (
				<Pressable onPress={() => {}}>
					<Paragraph>
						<Padding>
							<Paragraph>
								{data.item.peopleNm} ({data.item.repRoleNm})
							</Paragraph>
							<Text>{data.item.filmoNames}</Text>
						</Padding>
					</Paragraph>
				</Pressable>
			)}
		/>
	)
}
