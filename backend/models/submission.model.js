const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    socialMedia: { type: String, required: true },
    images: [{ type: String }]
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
