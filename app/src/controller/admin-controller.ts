export default class AdminController {
    static admin = (req, res) => {
        return res.json({message: req.user.username + ' is logged in'})
    };
}
