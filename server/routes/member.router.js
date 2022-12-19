const express = require("express")
const router = express.Router()
const MemberController = require("../controllers/member.controller")

router.get("/getMembers", MemberController.getMembersFromDatabase)
router.post("/issueBook", MemberController.issueBook)
router.post("/returnBook", MemberController.returnBook)
router.post("/addMember", MemberController.addMember)

module.exports = router
