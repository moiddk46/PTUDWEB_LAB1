const express = require("express");
const cors = require("cors");
const req = require("express/lib/request");
const res = require("express/lib/response");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) =>{
    res.json({message: "Welcome to contact book application."});
});
app.use("/api/contacts", contactsRouter);

//handle 404 respone
app.use((req,res,next) => {
    //code o day se chay khi khong co router duoc dinh nghia nao khop voi yeu cua.  goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middlewarre last, after orther app.use() and routes calls
app.use((err, req,res,next)=>{
    //middleware xu ly loi tap trung
    //trong cac doan code xu ly route, goi next(error)
    //se chuyen ve middleware xu ly loi nay
    return res.status(err.statuscode || 500).json({
        message: err.message || "Internal Sever error",
    });
});

module.exports = app;