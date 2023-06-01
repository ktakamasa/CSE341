const kohRoute = (req, res) => {
    res.send("Koh Takamasa");
};

const kazRoute = (req, res) => {
    res.send("Kaz Takamasa");
};

const jaquelineRoute = (req, res) => {
    res.send("Jaqueline Takamasa");
};

module.exports = {
    kohRoute,
    jaquelineRoute,
    kazRoute
};