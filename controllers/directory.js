const Member = require("../models/member");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../middleware/sendEmail")

const directory = {
    displayAll: (req, res, next) => {
        Member.find({ display: true })
            .then(data => res.status(200).json(data))
            .catch(error => res.status(404).json({ message: error }));
    },

    displayOne: (req, res, next) => {
        Member.findOne({ display: true, _id: req.params.id })
            .then(data => res.status(200).json(data))
            .catch(error => res.status(404).json({ message: error }));
    },

    register: (req, res, next) => {
        console.log(req.body)
        bcrypt.hash(req.body.loginPassword, 10)
            .then((hash) => {
                const newMember = new Member({
                    ...req.body,
                    loginPassword: hash,
                    companyLogo: req.files.companyLogo ? `${req.protocol}://${req.get("host")}/${req.files.companyLogo[0].filename}` : "",
                    companyBanner: req.files.companyBanner ? `${req.protocol}://${req.get("host")}/${req.files.companyBanner[0].filename}` : "",
                    companyPresentation: req.files.companyPresentation ? `${req.protocol}://${req.get("host")}/${req.files.companyPresentation[0].filename}` : "",
                    contactAvatar: req.files.contactAvatar ? `${req.protocol}://${req.get("host")}/${req.files.contactAvatar[0].filename}` : ""
                });
                newMember.save()
                    .then(data => {
                        res.status(200).json(data)
                        const adherentEmail = req.body.contactFirstname + " " + req.body.contactLastname + " <" + req.body.loginEmail + ">";
                        const adherentSubject = "Prise en compte demande d'adhésion";
                        const adherentMessage = "<p>Bonjour</p>"
                        sendEmail(adherentEmail, adherentSubject, adherentMessage);

                    })
                    .catch(error => res.status(404).json({ message_1: error }));
            })
            .catch(error => res.status(404).json({ message_2: error }));
    }
};

module.exports = directory;