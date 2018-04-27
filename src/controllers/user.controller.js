import User from "../models/user.model";

export default {
    find(req, res) {

    },
    create(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }
}