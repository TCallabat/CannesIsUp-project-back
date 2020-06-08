const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const memberSchema = mongoose.Schema({
    companyName: String,
    companyAddress: String,
    companyAddressComp: String,
    companyZip: String,
    companyCity: String,
    companyPhone: String,
    companyEmail: String,
    companyUrl: String,
    companyActivity: String,
    companyDescription: String,
    companyLogo: String,
    companyBanner: String,
    companyPresentation: String,

    contactFirstname: String,   // prénom
    contactLastname: String,    // nom de famille
    contactFunction: String,
    contactQuote: String,
    contactAvatar: String,

    facebookUrl: String,
    instagramUrl: String,
    linkedinUrl: String,
    twitterUrl: String,
    vimeoUrl: String,
    viadeoUrl: String,

    loginEmail: { type: String, required: true, unique: false },
    loginPassword: { type: String, required: true },
    loginReset: { type: String, default: "" },

    paymentType: String,
    paymentStatus: { type: Boolean, default: false },

    type: { type: String, default: "adherent" },
    status: { type: String, default: "attente" },
    display: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" }
});

memberSchema.plugin(uniqueValidator);

module.exports = mongoose.model("member", memberSchema, "member");