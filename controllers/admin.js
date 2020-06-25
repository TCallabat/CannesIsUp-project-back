const Member = require("../models/member");


const admin = {
    displayAll: (req, res, next) => {
        Member.find({})
            .then(data => res.status(200).json(data))
            .catch(error => res.status(404).json({ message: error }));
    },

    changeStatus: (req, res, next) => {
        const [id, status] = [req.body.id, req.body.status];
        Member.updateOne({ _id: id }, { $set: { status: status } })
            .then((display) => res.status(200).json({ message: "le statut de visibilité a bien été modifié pour ce membre." }))
            .catch((error) => res.status(400).json({ message: "Une erreur est survenue, merci de renouveler votre demande de modification de statut. " + error }));
    },

    changeType: (req, res, next) => {
        const [id, type] = [req.body.id, req.body.type];
        Member.updateOne({ _id: id }, { $set: { type: type } })
            .then((display) => res.status(200).json({ message: "le statut de visibilité a bien été modifié pour ce membre." }))
            .catch((error) => res.status(400).json({ message: "Une erreur est survenue, merci de renouveler votre demande de modification de statut. " + error }));
    }





};

module.exports = admin;