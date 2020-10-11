import bcrypt from "bcryptjs";

const users = [
  {
    name: "Steven Espinal",
    email: "stevenjesusespinal@gmail.com",
    isAdmin: true,
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: "Bobby Bitch",
    email: "bobbybitch@gmail.com",
    password: bcrypt.hashSync('123456', 10)
  }, {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: bcrypt.hashSync('123456', 10)
  },
];

export default users;