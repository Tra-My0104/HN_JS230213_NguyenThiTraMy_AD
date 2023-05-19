const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  try {
    const usersData = JSON.parse(fs.readFileSync("./dev-data/users.json"));
    res.json(usersData);
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const usersData = JSON.parse(fs.readFileSync("./dev-data/users.json"));
    const findUsers = usersData.find((e) => e.id === +id);
    res.json(findUsers);
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/", (req, res) => {
  const { name, username } = req.body;
  let newUsers = {
    id: Math.floor(Math.random() * 100000000000),
    name: name,
    username: username,
    email: null,
    address: {
      street: null,
      suite: null,
      city: null,
      zipcode: null,
      geo: {
        lat: null,
        lng: null,
      },
    },
    phone: null,
    website: null,
    company: {
      name: null,
      catchPhrase: null,
      bs: null,
    },
  };
  try {
    const usersData = JSON.parse(fs.readFileSync("./dev-data/users.json"));
    usersData.push(newUsers);
    fs.writeFileSync("./dev-data/users.json", JSON.stringify(usersData));
    console.log(usersData);
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
  const { email } = req.body;
  try {
    const usersData = JSON.parse(fs.readFileSync("./dev-data/users.json"));
    const indexUsers = usersData.findIndex((e) => e.id === +id);
    if (indexUsers === -1) {
      res.json({
        message: "Không tìm thấy dữ liệu",
      });
    } else {
      let newUsers = {
        id: +id,
        name: null,
        username: null,
        email: email,
        address: {
          street: null,
          suite: null,
          city: null,
          zipcode: null,
          geo: {
            lat: null,
            lng: null,
          },
        },
        phone: null,
        website: null,
        company: {
          name: null,
          catchPhrase: null,
          bs: null,
        },
      };
      const updateUsers = [
        ...usersData.slice(0, indexUsers),
        newUsers,
        ...usersData.slice(indexUsers + 1),
      ];
      fs.writeFileSync("./dev-data/users.json", JSON.stringify(updateUsers));
      // console.log("---------->", updateUsers);
      res.status(200).json({
        message: "Sửa thông tin thành công!!!",
      });
    }
  } catch (err) {
    console.log(err); // Ghi ra lỗi nếu có lỗi xảy ra trong quá trình xử lý
    res.status(404).json({
      message: "Sửa thông tin không thành công !!!",
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const usersData = JSON.parse(fs.readFileSync("./dev-data/users.json"));
  const newUsers = usersData.filter((ques) => ques.id !== +id);
  try {
    fs.writeFileSync("./dev-data/users.json", JSON.stringify(newUsers));
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
