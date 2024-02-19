
module.exports = {
    sendError: (res, error) => {
        res.status(500).json({
            message: error.message,
            error: error,
        });
    },

    sendSuccess: (res, message, extra, status) => {
        res.status(status || 200).json({message, ...extra});
    },
}