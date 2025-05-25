const express = require("express")
const validation = require("../middlewares/Usermiddleware")
const model = require("../db/db")

async function validatedData(req, res, next) {
    let { name, description, linkedinUrl, twitterUrl, interest } = req.body

    let passeddata = validation.safeParse({
        name, description, linkedinUrl, twitterUrl, interest
    })

    if (!passeddata.success) {
        return res.status(400).json({ msg: "Data is not correct", errors: passeddata.error.errors });
    }else{
        next()
    }

}

async function createUser(req, res) {

    try {
        let { name, description, linkedinUrl, twitterUrl, interest } = req.body

        await model.create({
            name,
            description,
            linkedinUrl,
            twitterUrl,
            interest
        })

        return res.status(200).json({ msg: "User created Successfully" })
    } catch (error) {
        res.json({ error: error.message })
    }
}

async function deleteUser(req, res) {
    try {
        let userId = req.params.id
        await model.findByIdAndDelete(userId)
        res.status(200).json({ msg: "User Deleted" })
    } catch (error) {
        res.json({ error: error.message })
    }
}

async function readUsers(req, res) {
    try {
        let data = await model.find({})
        res.status(200).json({ data })
    } catch (error) {
        res.json({ error: error.message })
    }
}

async function updateuser(req, res) {
    try {
        let userId = req.params.id
        let { name, description, linkedinUrl, twitterUrl, interest } = req.body


        await model.findByIdAndUpdate(userId, {
            name,
            description,
            linkedinUrl,
            twitterUrl,
            interest
        })
        res.status(200).json({msg: "Updated sucesss"})
    } catch (error) {
                res.json({error: error.message})
    }
}

module.exports = { validatedData, createUser, deleteUser, readUsers , updateuser}