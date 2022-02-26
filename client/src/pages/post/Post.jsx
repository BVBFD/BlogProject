import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./Post.module.css";
import SidebarAboutMe from "../../components/sidebarAboutMe/SidebarAboutMe.jsx";
import { useLocation, useParams } from "react-router-dom";

const Post = (props) => {
  const [totalPosts, setTotalPosts] = useState([
    {
      id: 1,
      imgUrl: "../images/kislev.jpg",
      title: "키슬레프",
      date: "2022 Feb 22th",
      text: "키슬레프는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 2,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 3,
      imgUrl: "../images/chaos.jpg",
      title: "카오스",
      date: "2022 Feb 22th",
      text: "카오스는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 4,
      imgUrl: "../images/login.jpg",
      title: "로그인",
      date: "2022 Feb 22th",
      text: "로그인은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 5,
      imgUrl: "../images/slaanesh.jpg",
      title: "슬라네쉬",
      date: "2022 Feb 22th",
      text: "슬라네쉬는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 6,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 7,
      imgUrl: "../images/chaos.jpg",
      title: "카오스",
      date: "2022 Feb 22th",
      text: "카오스는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 8,
      imgUrl: "../images/login.jpg",
      title: "로그인",
      date: "2022 Feb 22th",
      text: "로그인은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 9,
      imgUrl: "../images/slaanesh.jpg",
      title: "슬라네쉬",
      date: "2022 Feb 22th",
      text: "슬라네쉬는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 10,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 11,
      imgUrl: "../images/kislev.jpg",
      title: "키슬레프",
      date: "2022 Feb 22th",
      text: "키슬레프는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 12,
      imgUrl: "../images/nurgle.jpeg",
      title: "너글",
      date: "2022 Feb 22th",
      text: "너글은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 13,
      imgUrl: "../images/kislev.jpg",
      title: "키슬레프",
      date: "2022 Feb 22th",
      text: "키슬레프는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 14,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 15,
      imgUrl: "../images/chaos.jpg",
      title: "카오스",
      date: "2022 Feb 22th",
      text: "카오스는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 16,
      imgUrl: "../images/login.jpg",
      title: "로그인",
      date: "2022 Feb 22th",
      text: "로그인은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 17,
      imgUrl: "../images/slaanesh.jpg",
      title: "슬라네쉬",
      date: "2022 Feb 22th",
      text: "슬라네쉬는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 18,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 19,
      imgUrl: "../images/chaos.jpg",
      title: "카오스",
      date: "2022 Feb 22th",
      text: "카오스는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 20,
      imgUrl: "../images/login.jpg",
      title: "로그인",
      date: "2022 Feb 22th",
      text: "로그인은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 21,
      imgUrl: "../images/slaanesh.jpg",
      title: "슬라네쉬",
      date: "2022 Feb 22th",
      text: "슬라네쉬는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 22,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 23,
      imgUrl: "../images/kislev.jpg",
      title: "키슬레프",
      date: "2022 Feb 22th",
      text: "키슬레프는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 24,
      imgUrl: "../images/nurgle.jpeg",
      title: "너글",
      date: "2022 Feb 22th",
      text: "너글은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 25,
      imgUrl: "../images/kislev.jpg",
      title: "키슬레프",
      date: "2022 Feb 22th",
      text: "키슬레프는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 26,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 27,
      imgUrl: "../images/chaos.jpg",
      title: "카오스",
      date: "2022 Feb 22th",
      text: "카오스는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 30,
      imgUrl: "../images/login.jpg",
      title: "로그인",
      date: "2022 Feb 22th",
      text: "로그인은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 31,
      imgUrl: "../images/slaanesh.jpg",
      title: "슬라네쉬",
      date: "2022 Feb 22th",
      text: "슬라네쉬는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 32,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 33,
      imgUrl: "../images/chaos.jpg",
      title: "카오스",
      date: "2022 Feb 22th",
      text: "카오스는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 34,
      imgUrl: "../images/login.jpg",
      title: "로그인",
      date: "2022 Feb 22th",
      text: "로그인은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 35,
      imgUrl: "../images/slaanesh.jpg",
      title: "슬라네쉬",
      date: "2022 Feb 22th",
      text: "슬라네쉬는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 36,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 37,
      imgUrl: "../images/kislev.jpg",
      title: "키슬레프",
      date: "2022 Feb 22th",
      text: "키슬레프는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 38,
      imgUrl: "../images/nurgle.jpeg",
      title: "너글",
      date: "2022 Feb 22th",
      text: "너글은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 39,
      imgUrl: "../images/kislev.jpg",
      title: "키슬레프",
      date: "2022 Feb 22th",
      text: "키슬레프는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 40,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 41,
      imgUrl: "../images/chaos.jpg",
      title: "카오스",
      date: "2022 Feb 22th",
      text: "카오스는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 42,
      imgUrl: "../images/login.jpg",
      title: "로그인",
      date: "2022 Feb 22th",
      text: "로그인은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 43,
      imgUrl: "../images/slaanesh.jpg",
      title: "슬라네쉬",
      date: "2022 Feb 22th",
      text: "슬라네쉬는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 44,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 45,
      imgUrl: "../images/chaos.jpg",
      title: "카오스",
      date: "2022 Feb 22th",
      text: "카오스는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 46,
      imgUrl: "../images/login.jpg",
      title: "로그인",
      date: "2022 Feb 22th",
      text: "로그인은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
    {
      id: 47,
      imgUrl: "../images/slaanesh.jpg",
      title: "슬라네쉬",
      date: "2022 Feb 22th",
      text: "슬라네쉬는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "HTML",
      author: "lse126",
    },
    {
      id: 48,
      imgUrl: "../images/empire.jpg",
      title: "제국",
      date: "2022 Feb 22th",
      text: "제국은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "CSS",
      author: "lse126",
    },
    {
      id: 49,
      imgUrl: "../images/kislev.jpg",
      title: "키슬레프",
      date: "2022 Feb 22th",
      text: "키슬레프는 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "JavaScript",
      author: "lse126",
    },
    {
      id: 50,
      imgUrl: "../images/nurgle.jpeg",
      title: "너글",
      date: "2022 Feb 22th",
      text: "너글은 영원하다. 그렇다면 이건 어떠한가? 말이 되는가? 실험중인데 잘되길 빈다 왜 안되지? 그럼 이건 어때? 다시 한번 실험해보고 있어. 확실히 테스트 중 입니다.",
      catName: "React",
      author: "lse126",
    },
  ]);
  const [selected, setSelected] = useState({});

  const location = useLocation();
  const param = useParams();
  // 서버에서 param을 전달받아서 api findbyid로 찾아야함..

  const selectObjectById = (id) => {
    const selectedObject = totalPosts.filter((post) => post.id === id);
    return selectedObject;
  };

  useEffect(() => {
    const newSelcted = selectObjectById(parseInt(param.id));
    setSelected(newSelcted[0]);
    return () => setSelected({});
  }, [location, param]);

  return (
    <section className={styles.postPage}>
      <Header />
      <div className={styles.postBox}>
        <div className={styles.postImgTextBox}>
          <div className={styles.postTitleImgBox}>
            <img src={selected.imgUrl} alt="" />
          </div>
          <div className={styles.postTextBox}>
            <header className={styles.postHeader}>
              <p>
                Category: <span>{selected.catName}</span>
              </p>
              <span>{selected.title}</span>
              <div>
                <i class="fa-solid fa-pen-to-square"></i>
                <i class="fa-solid fa-trash"></i>
              </div>
            </header>
            <div className={styles.authorAndDate}>
              <p>
                Author: <span>{selected.author}</span>
              </p>
              <span>{selected.date}</span>
            </div>
            <div className={styles.postContentText}>
              <p>{selected.text}</p>
            </div>
          </div>
        </div>
        <SidebarAboutMe />
      </div>
    </section>
  );
};

export default Post;
