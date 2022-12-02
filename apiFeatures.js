class apiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    //filtering
    filter(){
        //filtering
        const queryObject={...this.queryString};
        const excludedObjects=['page','sort','limit','fields'];
        excludedObjects.forEach((elem)=> delete queryObject[elem]);

        //advanced filtering
        let queryStr=JSON.stringify(queryObject);
        queryStr=queryStr.replace(/\b(gte,gt,lte,lt)\b/g, (match) => `$${match}`);
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }

    //sorting
    sort(){
        if(this.queryString.sort){
            const sortBy =this.queryString.sort.split(',').join(' ');
            this.query=this.query.sort(sortBy);
        }
        else{
            this.query=this.query.sort('-createdAt');
        }
        return this;
    }

    //limiting
    limitFields(){
        if(this.queryString.fields){
            const fields = this.query.fields.split(',').join(' ');
            this.query=this.query.select(fields);
        }
        else{
            this.query=this.query.select('-__v');
        }
        return this;
    }

    //paginate
    paginate(){
        const page=this.queryString.page*1||1;
        const limit=this.queryString.limit*1||100;
        const skip = (page-1)*limit;
        this.query=this.query.skip(skip).limit(limit);
        return this.query;
    }
}

module.exports=apiFeatures;