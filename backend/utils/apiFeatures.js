
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i' 
                //  'i' = Case insensitive     
            }
        } : {}

        console.log(keyword);

        this.query = this.query.find({ ...keyword});
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr};
        console.log(queryCopy);
        // removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        console.log(queryCopy);

        // Advance filter for price, ratings, etc...
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}` );

        console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        // BELOW: calulates how many results to skip based on what page you are on.  Based on resPerPage = 10
        const skip = resPerPage * (currentPage - 1);
        // BELOW: use limit and skip to create a controlled pagination
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;