const express = require("express")
const {createUser, validatedData, deleteUser, readUsers, updateuser} = require("../Controller/UserController")

const router = express.Router()

router.post("/create", validatedData, createUser )
router.delete("/delete/:id",  deleteUser )
router.get("/getallusers",  readUsers )
router.put("/update/:id", validatedData, updateuser )

module.exports= router


    