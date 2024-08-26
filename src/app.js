import express from "express";
import indexRouter from './index.routes.js';
import cors from 'cors';
import expressfileupload from 'express-fileupload';
const app = express();
const port = process.env.PORT;






app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(expressfileupload())


app.use('/earth', indexRouter);



app.get('/earth/test', (req,res) => {
    res.status(200).send({
        status: "success",
        code: 0,
        message: "",
        cause: "",
        result: "",
      });
})

app.listen(port, () => {
    console.log(`Server Running At ${port}`)




});





