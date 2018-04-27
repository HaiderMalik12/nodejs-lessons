import User from "./user.model";

export default {
    find(req, res) {
        const options = {
            select: '_id firstName lastName email',
            page: parseInt(req.query.page, 10) || 1,
            limit: parseInt(req.query.limit, 10) || 10,
            sort: 'firstName'
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