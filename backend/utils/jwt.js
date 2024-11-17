import jwt from "jsonwebtoken";

const gentoken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "None", // Adjust if using cross-origin
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });
};

export default gentoken;




// import jwt from "jsonwebtoken";

// const gentoken = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '15d',
//   });

//   // Setting the token as an HTTP-only cookie
//   res.cookie("jwt", token, {
//     maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
//     httpOnly: true,  // Only accessible by the server
//     sameSite: "Strict",  // Prevents cross-site request forgery
//   });
// };

// export default gentoken;
