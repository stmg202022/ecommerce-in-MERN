class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case sensitive
          },
        }
      : {};

    console.log(keyword); // this is obj created to find name if keyword exist

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const copyQuery = { ...this.queryStr };

    console.log(copyQuery);

    //filter for categories
    const removeQuery = ["keyword", "page", "limit"]; //categories not remove by this filter fn when categories send

    removeQuery.forEach((key) => delete copyQuery[key]);

    // this.query = this.query.find({...copyQuery});

    // console.log(copyQuery)

    //filter for price
    let queryStr = JSON.stringify(copyQuery);

    // console.log(queryStr)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // console.log(queryStr)

    queryStr = JSON.parse(queryStr);

    this.query = this.query.find(queryStr);

    console.log(queryStr);

    return this;
  }

  pagination(resultPerPage) {
    console.log(typeof this.queryStr.page);
    const currentPage = Number(this.queryStr.page) || 1;

    console.log(currentPage);

    let skip = resultPerPage * (currentPage - 1); // 0, 5, 10, 15

    this.query = this.query.limit(resultPerPage).skip(skip); //0-5, 5-10, 10-15, 15-20 -> 5 per/page

    return this;
  }
}

module.exports = ApiFeatures;
