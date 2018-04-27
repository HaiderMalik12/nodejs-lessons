import User from "../models/user.model";

export default {
    find(req, res) {
        const options = {
            select: '_id firstName'
        }
        User.paginate({}, options)
            .then(users => {
                return res.json(users)
            })
            .catch(err => res.status(500).send(err))
    },
    create(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }
}