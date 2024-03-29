import '../assets/scss/pages/myWebtoon.scss';

import { Button, Card, Group, Image, Menu, Text } from '@mantine/core';
import { IconDotsVertical, IconTrash } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { getWebtoonDetail, removeMyWebtoon } from '../api/webtoon';
import EmptyData from '../components/EmptyData';
import useFetchUserInfo from '../hooks/apis/useFetchUserInfo';
import { userInfoState } from '../store/recoilAuthState';
import { REMOVE_MYWEBTOON_SUCCESS } from '../utils/constants.jsx';
import showToast from '../utils/toast';

const MyWebtoon = () => {
	const navigate = useNavigate();
	const { data: userInformation, isLoading } = useFetchUserInfo();
	const [webtoonList, setWebtoonList] = useState();
	const myWebtoonList = [];

	const onClickWebtoonDetailPage = (item) => {
		navigate('/webtoon', { state: { webtoonDetailData: item } });
	};

	const onClickRemoveWebtoon = async (event, webtoonId) => {
		const removeMyWebtoonAPIBody = {
			_id: webtoonId,
		};
		event.stopPropagation();
		const response = await removeMyWebtoon(removeMyWebtoonAPIBody);
		if (response.RESULT === 200) {
			// setUserInfo(response.user);
			showToast(REMOVE_MYWEBTOON_SUCCESS, 'green');
		}
	};

	const getMyWebtoon = async (webtoonId) => {
		const response = await getWebtoonDetail(webtoonId);
		myWebtoonList.push(response);
	};

	useEffect(() => {
		const fetchMyWebtoonList = async () => {
			for (let i = 0; i < userInformation?.myWebtoon.length; i++) {
				await getMyWebtoon(userInformation?.myWebtoon[i]);
			}
			setWebtoonList(myWebtoonList);
		};
		fetchMyWebtoonList();
	}, []);

	return (
		<div className="mywebtoon-container">
			{webtoonList?.length !== 0 ? (
				<div className="mywebtoon-list">
					{webtoonList?.map((item, index) => {
						return (
							<Card
								shadow="sm"
								p="lg"
								radius="md"
								withBorder
								key={index}
								className="webtoon-card"
								onClick={() => onClickWebtoonDetailPage(item)}>
								<Card.Section>
									<Image src={item.img} alt="Norway" />
								</Card.Section>

								<Group position="apart" mt="md">
									<Text weight={500}>{item.title}</Text>
									<Menu shadow="md" width={110} position="bottom-end">
										<Menu.Target>
											<Button
												variant="subtle"
												size="xs"
												onClick={(e) => e.stopPropagation()}>
												<IconDotsVertical color="grey" />
											</Button>
										</Menu.Target>

										<Menu.Dropdown>
											<Menu.Item
												onClick={(e) => onClickRemoveWebtoon(e, item._id)}
												color="red"
												icon={<IconTrash size={14} />}>
												웹툰 삭제
											</Menu.Item>
										</Menu.Dropdown>
									</Menu>
								</Group>
								<Text size="sm" color="dimmed">
									{item.author}
								</Text>

								<a
									href={item.url}
									target="_blank"
									onClick={(e) => e.stopPropagation()}
									rel="noreferrer">
									<Button
										variant="light"
										color="blue"
										fullWidth
										mt="md"
										radius="md">
										웹툰 보러가기
									</Button>
								</a>
							</Card>
						);
					})}
				</div>
			) : (
				<EmptyData
					className="webtoon-list-empty"
					content={
						<div>
							<h2>마이 웹툰이 비어있습니다 :(</h2>
							<h3>좋아하는 웹툰을 저장해보세요!</h3>
							<Link to="/">
								<button className="mywebtoon-save-btn">웹툰보러가기</button>
							</Link>
						</div>
					}
				/>
			)}
		</div>
	);
};

export default MyWebtoon;
