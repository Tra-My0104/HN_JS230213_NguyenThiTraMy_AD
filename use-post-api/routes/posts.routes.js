const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  try {
    const postsData = JSON.parse(fs.readFileSync("./dev-data/posts.json"));
    res.json(postsData);
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const postsData = JSON.parse(fs.readFileSync("./dev-data/posts.json"));
    const findPosts = postsData.find((e) => e.id === +id);
    res.json(findPosts);
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/", (req, res) => {
  const { tilte, body } = req.body;
  let newPosts = {
    userId: Math.floor(Math.random() * 100000000000),
    id: Math.floor(Math.random() * 100000000000),
    title: tilte,
    body: body,
  };
  try {
    const postsData = JSON.parse(fs.readFileSync("./dev-data/posts.json"));
    postsData.push(newPosts);
    fs.writeFileSync("./dev-data/posts.json", JSON.stringify(postsData));
    res.status(200).json({
      message: "Thêm thông tin thành công!!!",
    });
  } catch (err) {
    res.status(404).json({
      message: "Thêm thông tin không thành công !!!",
    });
  }
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
      const postsData = JSON.parse(fs.readFileSync("./dev-data/posts.json"));
      const indexPosts = postsData.findIndex((e) => e.id === +id);
      if (indexPosts === -1) {
        res.json({
          message: "Không tìm thấy dữ liệu",
        });
      } else {
        let newPost = {
          id: +id,
          userId: postsData[indexPosts].userId,
          title: title,
          body: body,
        };
        const updatePosts = [
          ...postsData.slice(0, indexPosts),
          newPost,
          ...postsData.slice(indexPosts + 1),
        ];
        fs.writeFileSync("./dev-data/posts.json", JSON.stringify(updatePosts));
        res.status(200).json({
          message: "Sửa thông tin thành công!!!",
        });
      }
    } catch (err) {
      res.status(404).json({
        message: "Sửa thông tin không thành công !!!",
      });
    }
  });
  

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const postsData = JSON.parse(fs.readFileSync("./dev-data/posts.json"));
  const newPosts = postsData.filter((ques) => ques.id !== +id);
  try {
    fs.writeFileSync("./dev-data/posts.json", JSON.stringify(newPosts));
    res.status(200).json({
      message: "Xóa thông tin thành công!!!",
    });
  } catch (error) {
    res.status(404).json({
      message: "Xóa không thành công",
    });
  }
});
module.exports = router;