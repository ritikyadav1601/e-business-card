const express = require("express")
const app = express()
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use("/user", userRoutes)

app.listen(3000, ()=>{
    console.log("Server is running")
})