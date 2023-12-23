import dbConnect, { dbDisConnect } from '@/utils/db.js';
import PostDatasModel from '../../../../models/postDatasModel';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();
  } catch (error) {
    res.status(500).json(error);
  }

  if (method === 'GET') {
    const catName = req.query.cat ? decodeURIComponent(req.query.cat) : null;
    const text = req.query.text ? decodeURIComponent(req.query.text) : null;
    const page = req.query.page;

    try {
      // 한페이지당 나오는 포스트 갯수
      const pageSize = 4;
      // 클릭한 page 숫자에 따라 계산할 예정
      let skipAmount = 0;
      // db에 있는 포스트 역순으로 재배치
      const sortOptions = { createdAt: -1 };

      let query = {};

      let totalPostsCount;

      if (catName) {
        query.catName = catName;
      }

      if (text) {
        // 정규표현식 대소문자 없이 구분없이 검색
        query.title = { $regex: new RegExp(text, 'i') };
      }

      if (page) {
        // 클릭한 페이지 숫자에 따라 skipAmount 결정
        skipAmount = (page - 1) * pageSize;
      }

      // 해당 쿼리에 맞는 포스트를 찾음
      let foundPosts = await PostDatasModel.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

      totalPostsCount = await PostDatasModel.countDocuments(query);

      // 첫 index page 로딩이 너무 오래걸려서,
      // 본문 text영역(너무 길다)은 받아오지 않게끔 하기 위함.
      const simplifiedPosts = foundPosts.map((post) => ({
        _id: post._id,
        title: post.title,
        imgUrl: post.imgUrl,
        created_at: post.created_at,
      }));

      res.status(200).json({ posts: simplifiedPosts, totalPostsCount });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    try {
      const newPost = new PostDatasModel({
        imgUrl: req.body.imgUrl,
        title: req.body.title,
        text: req.body.text,
        catName: req.body.catName,
        author: req.body.author,
      });

      const savedNewPost = await newPost.save();
      res.status(201).json({ savedNewPost });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  return dbDisConnect();
}
