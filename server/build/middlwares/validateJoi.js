const validateRequest = ({ schema, requestPart }) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[requestPart]);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        next();
    };
};
export default validateRequest;
//# sourceMappingURL=validateJoi.js.map