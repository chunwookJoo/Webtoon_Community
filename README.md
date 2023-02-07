<p align="center">
  <a target="blank"><img src="https://user-images.githubusercontent.com/64945491/216829548-c50edcc6-c54d-45a9-82a4-bddf4de75dc7.png" width="140" alt="Logo" /></a>
</p>

# 웹툰 커뮤니티 서비스 "이거 봤어?"

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=000000"/> <img src="https://img.shields.io/badge/Recoil-ffffff?style=flat&logo=React&logoColor=000000"/> <img src="https://img.shields.io/badge/Scss-CC6699?style=flat&logo=Sass&logoColor=ffffff"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=FFDA44"/>

<br/>

## 프로젝트 소개

유명하지 않지만 정말 재밌게 본 웹툰이 있으신가요?
<br>
본인만 알고 있는 최애 웹툰의 후기를 작성하고 다른사람들에게도 알려주세요!
<br>
(단, 스포일러는 금지에요. 😉)

<br>

## 배포 사이트

### [이거봤어?](http://woogie97.co.kr)
(배포 중 에러 고치는중..)

<br>

## 시작 가이드

- [Node.js 18.13.3](https://nodejs.org/ca/blog/release/v14.19.3/)
- [Npm 8.17.0](https://www.npmjs.com/package/npm/v/9.2.0)

<br>

프로젝트 clone

```bash
$ git clone https://github.com/chunwookJoo/Korea_Webtoon_Forum.git
$ cd Korea_Webtoon_Forum
```

nvm 설정

```bash
$ nvm install  // 반약 본인의 nvm에 해당 버전이 없다면 실행
$ nvm use
```

npm 설치 / 실행

```bash
$ npm install
$ npm run dev
```

<br>

## 기술 스택

- ReactJS
- Recoil
- Scss
- Vite

<br>

## 프로젝트 기능 설명

> https://github.com/chunwookJoo/Korea_Webtoon_API 의 api를 사용합니다.

### ⭐️ 각 플랫폼별 (네이버, 카카오, 카카오페이지) 웹툰 리스트 제공

- 요일, 신작, 완결 별로 웹툰 리스트 제공합니다.
- 좋아하는 웹툰을 마이 웹툰에 저장합니다.

### ⭐️ Oauth 로그인 (카카오, 네이버), JWT토큰 발급 후 DB 저장

- Oauth인증 후 닉네임, 연령대, 성별만으로 회원가입합니다.

### ⭐️ 웹툰 검색 (작품, 작가)

- 작품, 작가 이름으로 검색을 합니다.

### ⭐️ 각 플랫폼별 독자 후기 정보 제공

- 플랫폼별로 독자의 후기 리스트를 제공합니다.
- 댓글을 작성 할 수 있습니다.

### ⭐️ 독자 후기 작성, 삭제

- 재밌게 본 웹툰의 후기를 작성합니다.
- 본인이 쓴 글을 삭제할 수 있습니다. (개발중)

<br/>

## 미리보기

<table>
<tr>
 <td align="center">페이지</td>
 <td align="center">데스크톱</td>
 <td align="center">모바일</td>
</tr>
<tr>
 <td align="center">
	메인 페이지
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216925976-8b92a687-9e73-4c65-9b4c-8d8519bdb9d5.jpg"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216926331-5c19306d-4fb3-486b-9973-46f34af59b26.jpg"/>
	</td>
</tr>
<tr>
 <td align="center">
	웹툰 상세페이지
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216926730-28d048c1-40a9-455f-877e-388443178d26.jpg"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216926744-594f6fa6-e8a7-4b99-a6c9-79c52c79978c.jpg"/>
	</td>
</tr>
<tr>
 <td align="center">
	웹툰 검색
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216927002-e0202c27-3a76-450e-bf8f-e8eb20a8a45b.gif"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216927022-2f8d1002-7bc9-408b-b756-dfbd86f373e4.gif"/>
	</td>
</tr>
<tr>
 <td align="center">
	회원가입
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216928281-1c728516-82a8-427f-aa2f-5da814e0ef6e.gif"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216928295-0d19b391-3932-4b4c-a058-8d126a20d723.gif"/>
	</td>
</tr>
<tr>
 <td align="center">
	카카오/네이버 API 로그인
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216927617-becf578e-0e43-4062-9b23-46a28abbf7ed.gif"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216927646-6e348558-8ce7-4bbc-86f3-8a5bde4c470b.gif"/>
	</td>
</tr>
<tr>
 <td align="center">
	내 정보 변경
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216928003-6333a07a-7d20-435d-9244-c21ec8136b1f.gif"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216928015-2cedac2e-0aab-437b-a2fd-679e0348fd3f.gif"/>
	</td>
</tr>
<tr>
 <td align="center">
	독자 후기 모음 페이지
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216977874-7450cf55-3f14-4e4e-b610-bd9490d3a93b.gif"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216977889-fb6e64dd-9c21-4581-b571-f650a375de88.gif"/>
	</td>
</tr>
<tr>
 <td align="center">
	댓글 작성
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216978031-0cc9074e-c2a6-414a-90e1-01f57327f4c7.gif"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216978046-e79310fd-6414-4090-9ae4-05153a322332.gif"/>
	</td>
</tr>
<tr>
 <td align="center">
	후기 작성
 </td>
 <td>
  <img width="400" src="https://user-images.githubusercontent.com/64945491/216978209-84c5774b-df13-4a62-946c-c6fc003531d6.gif"/>
	</td>
 <td>
  <img width="200" src="https://user-images.githubusercontent.com/64945491/216978218-79eb4bf4-52fc-4d6b-9c0f-2c36159fac1d.gif"/>
	</td>
</tr>

</table>
