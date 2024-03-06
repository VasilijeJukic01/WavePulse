const handleRoute = async (req, res, operation) => {
    try {
        let result;
        if (req.method === 'POST') result = await operation(req.body);
        else result = await operation(req.params.id, req.body);

        return res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
};

module.exports = {
    handleRoute,
};