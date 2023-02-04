// npm package
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// api
import axios from "axios";
import { API_URL } from "../config";

// design library (mantine)
import { showNotification } from "@mantine/notifications";
import { Card, Image, Text, Button, Group, Menu } from "@mantine/core";

// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../store/recoilAuthState";

// components
// hooks

// icon
import { IconDotsVertical, IconTrash } from "@tabler/icons";
import "../assets/scss/pages/myWebtoon.scss";

const MyWebtoon = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const [webtoonList, setWebtoonList] = useState();
	const list = [];

	/**
	 *
	 * @param {*} item webtoonData
	 */
	const onClickWebtoonDetailPage = (item) => {
		navigate("/webtoon", { state: { webtoonDetailData: item } });
	};

	/**
	 *
	 * @param {*} e event
	 * @param {*} webtoonId webtoonId
	 */

	const onClickRemoveWebtoon = (e, webtoonId) => {
		const removeBody = {
			_id: webtoonId,
		};
		e.stopPropagation();
		axios
			.post(
				API_URL + `/auth/delete/mywebtoon/${localStorage.getItem("userId")}`,
				removeBody,
			)
			.then((response) => {
				if (response.data.RESULT === 200) {
					setUserInfo(response.data.user);
					showNotification({
						message: "웹툰이 삭제되었습니다.",
						autoClose: 2000,
						radius: "md",
						color: "green",
					});
				} else {
					console.log(response.data);
				}
			});
	};

	/**
	 * 웹툰 데이터 가져오기
	 * @param {*} id webtoonId
	 * @returns webtoonData
	 */
	const getWebtoonData = (id) => {
		return new Promise((resolve, reject) => {
			axios
				.get(API_URL + `/search/webtoon/${id}`)
				.then((response) => {
					list.push(response.data);
					resolve("정상");
				})
				.catch(() => {
					reject("비정상");
				});
		});
	};

	useEffect(() => {
		const sequentialRequest = async () => {
			for (let i = 0; i < userInfo.myWebtoon.length; i++) {
				try {
					await getWebtoonData(userInfo.myWebtoon[i]);
				} catch (error) {
					console.log(error);
				}
			}
			setWebtoonList(list);
		};
		sequentialRequest();
	}, [userInfo]);

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
								onClick={() => onClickWebtoonDetailPage(item)}
							>
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
												onClick={(e) => e.stopPropagation()}
											>
												<IconDotsVertical color="grey" />
											</Button>
										</Menu.Target>

										<Menu.Dropdown>
											<Menu.Item
												onClick={(e) => onClickRemoveWebtoon(e, item._id)}
												color="red"
												icon={<IconTrash size={14} />}
											>
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
									rel="noreferrer"
								>
									<Button
										variant="light"
										color="blue"
										fullWidth
										mt="md"
										radius="md"
									>
										웹툰 보러가기
									</Button>
								</a>
							</Card>
						);
					})}
				</div>
			) : (
				<div className="webtoon-list-empty">
					<div>
						<h2>마이 웹툰이 비어있습니다 :(</h2>
						<h3>좋아하는 웹툰을 저장해보세요!</h3>
					</div>
					<div>
						<Link to="/">
							<button className="mywebtoon-save-btn">웹툰보러가기</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyWebtoon;
