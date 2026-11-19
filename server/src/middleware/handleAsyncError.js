export default (myErrorFun) => (req, res, next) => {
    Promise.resolve(myErrorFun(req, res, next)).catch(next)
}


/* according to instructor for handling models or schema based errors
    - more...
*/

/* using try catch
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return next(new errorHandler(404, "Product not found"))
        }
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}
*/

/* try catch explanation
    - If we use this method we don't need this function.
*/