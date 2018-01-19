// Loading our homepage, that's it, see ya
function initHome (app, io) {
    app.get('/', renderWelcome)

    function renderWelcome (req, res) {
        res.render('home/home')
    }
}

module.exports = initHome
