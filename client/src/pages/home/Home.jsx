import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import HomePost from "../../components/homePost/HomePost.jsx";
import SidebarAboutMe from "../../components/sidebarAboutMe/SidebarAboutMe.jsx";
import styles from "./Home.module.css";

const Home = (props) => {
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
  // category 클릭시 totalPosts값 변경예정!

  const [num, setNum] = useState(1);
  const [paginationRowNum, setPaginationRowNum] = useState(5);
  const [endNum, setEndNum] = useState(totalPosts.length / 4 + 4);
  const [sideBarAccessIndex, setSideBarAccessIndex] = useState("");
  const [selectedPostsArray, setSelectedPostsArray] = useState([]);
  const [homeBtnIndex, setHomeBtnIndex] = useState(false);

  useEffect(() => {
    const selectedPostsArray = totalPosts.filter(
      (post) => post.catName === sideBarAccessIndex
    );
    setSelectedPostsArray(selectedPostsArray);
    return () => setSelectedPostsArray([]);
    // selectedPostsArray는 category 목록별 posts 글들 분류 화면에 표시
  }, [sideBarAccessIndex, totalPosts]);

  useEffect(() => {
    setEndNum(selectedPostsArray.length / 4 + 4);
  }, [selectedPostsArray]);

  let selectedArray = [];
  for (let i = (num - 1) * 4; i < num * 4; i++) {
    !homeBtnIndex
      ? selectedArray.push(totalPosts[i])
      : selectedArray.push(selectedPostsArray[i]);
  }
  selectedArray = selectedArray.filter((post) => post !== undefined);
  //selectedArray는 pagenation 번호당 화면에 보여지는 4개 포스트 글 선정

  const nextPaginationNum = (e) => {
    if (paginationRowNum + 4 > endNum) {
      setNum(num);
      return;
    }
    Number.isInteger(endNum) === true
      ? setNum(paginationRowNum + 1)
      : setNum(paginationRowNum + 2);
    setPaginationRowNum(paginationRowNum + 5);
  };

  const previousPaginationNum = (e) => {
    if (num <= 10 && paginationRowNum <= 10) {
      setNum(1);
      setPaginationRowNum(5);
      return;
    }
    Number.isInteger(endNum) === true
      ? setNum(paginationRowNum - 9)
      : setNum(paginationRowNum - 8);
    setPaginationRowNum(paginationRowNum - 5);
  };

  return (
    <section className={styles.home}>
      <Header homeBtnIndex={homeBtnIndex} setHomeBtnIndex={setHomeBtnIndex} />
      <div className={styles.homeBgImg}>
        <img src="../images/cathay.jpg" alt="" />
      </div>
      <div className={styles.title}>
        <span>IT & Game</span>
        <span>Blog</span>
      </div>
      <div className={styles.homeContentsPart}>
        <div className={styles.postsPart}>
          {selectedArray.map((post) => {
            return (
              <Link className="link" to={`/post/${post.id}`}>
                <HomePost post={post} />
              </Link>
            );
          })}
        </div>
        <SidebarAboutMe
          setSideBarAccessIndex={setSideBarAccessIndex}
          setHomeBtnIndex={setHomeBtnIndex}
        />
      </div>
      <ul>
        <i
          class="fa-solid fa-circle-arrow-left"
          onClick={previousPaginationNum}
        ></i>
        {paginationRowNum === 5 && Number.isInteger(endNum) === false ? (
          <li
            className={styles.list}
            onClick={(e) => setNum(parseInt(e.target.innerText))}
          >
            1
          </li>
        ) : null}

        {!homeBtnIndex
          ? totalPosts.map((post) => {
              if ((totalPosts.indexOf(post) + 1) % 4 === 0) {
                if (
                  (totalPosts.indexOf(post) + 1) / 4 <= paginationRowNum &&
                  (totalPosts.indexOf(post) + 1) / 4 > paginationRowNum - 5
                ) {
                  return (
                    <li
                      className={styles.list}
                      onClick={(e) => setNum(parseInt(e.target.innerText))}
                    >
                      {Number.isInteger(endNum) === false
                        ? (totalPosts.indexOf(post) + 1) / 4 + 1
                        : (totalPosts.indexOf(post) + 1) / 4}
                    </li>
                  );
                } else {
                  return null;
                }
              }
            })
          : selectedPostsArray.map((post) => {
              if ((selectedPostsArray.indexOf(post) + 1) % 4 === 0) {
                if (
                  (selectedPostsArray.indexOf(post) + 1) / 4 <=
                    paginationRowNum &&
                  (selectedPostsArray.indexOf(post) + 1) / 4 >
                    paginationRowNum - 5
                ) {
                  return (
                    <li
                      className={styles.list}
                      onClick={(e) => setNum(parseInt(e.target.innerText))}
                    >
                      {Number.isInteger(endNum) === false
                        ? (selectedPostsArray.indexOf(post) + 1) / 4 + 1
                        : (selectedPostsArray.indexOf(post) + 1) / 4}
                    </li>
                  );
                } else {
                  return null;
                }
              }
            })}
        <i
          class="fa-solid fa-circle-arrow-right"
          onClick={nextPaginationNum}
        ></i>
      </ul>
    </section>
  );
};

export default Home;
