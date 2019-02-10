export default class AdminController {
    admin = (req, res) => {
        return res.json({message: req.user.username + ' is logged in'})
    };
}
