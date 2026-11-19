class APIFunctionality {
    constructor(query, queryStr) {
        this.query = query; // The Mongoose query (e.g., Product.find())
        this.queryStr = queryStr; // The Express query parameters (req.query)
    }

    search() {
        // Check if a 'keyword' parameter exists in the URL
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword, // MongoDB regex operator for partial matching
                $options: "i"                  // Case-insensitive search
            }
        } : {};

        // Apply the search filter to the Mongoose query
        this.query = this.query.find({ ...keyword });

        // Return 'this' to allow method chaining (e.g., .search().filter().sort())
        return this;
    }

    // filter by category /postman is keyword is passed and that is not found then below will not work and will empty array as search is work first
    filter() {
        const queryCopy = { ...this.queryStr };
        // console.log(queryCopy);

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key])

        // console.log(queryCopy);
        this.query = this.query.find(queryCopy).collation({ locale: 'en', strength: 2 });
        return this;
    }

    /* POSTMAN: add page number in query param to view result in specific page */
    pagination(resultPerPage) {
        // console.log(resultPerPage);
        const currentPage = Number(this.queryStr.page) || 1;
        // console.log(currentPage);
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this;
        // resultPerPage is args that will be receiving
    }
}

export default APIFunctionality;

/* working
this ⛓️ instance with either {} or queryparam that resolve to Product.find({}) or Product.find({keyword: 'something'})

{} ⛓️ finds all

{keyword: 'something'} ⛓️ instance.query.find({name: 'something'})
*/

/* Model.find().collation({ locale: 'en', strength: 2 });
locale: 'en': Specifies the language rules to use (in this case, English). This helps MongoDB handle language-specific character rules correctly.

strength: 2: Determines how strictly MongoDB compares characters.

    strength: 1: Ignores case and accents (e.g., resume equals résumé).

    strength: 2: Ignores case only (e.g., shoes equals Shoes or SHOES), but treats accented characters as different.

    strength: 3 (Default): Strict matching (case-sensitive and accent-sensitive).
*/