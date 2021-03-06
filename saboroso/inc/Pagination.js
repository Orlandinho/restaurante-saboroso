var conn = require('./db');

class Pagination {

    constructor(
        query,
        params = [],
        itemsPerPage = 10
    ){

        this.query = query;
        this.params = params;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
    }

    getPage(page){

        this.currentPage = page -1;

        this.params.push(
            this.currentPage * this.itemsPerPage,
            this.itemsPerPage
        );

        return new Promise((resolve, reject) => {

            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(';'), this.params, (err, results)=>{

                if(err){

                    reject(err);

                } else {

                    this.data = results[0];
                    this.total = results[1][0].FOUND_ROWS;
                    this.totalPages = Math.ceil(this.total / this.itemsPerPage);
                    this.currentPage++;

                    resolve(this.data);
                }
            });
        });
    }

    getTotal(){

        return this.total;
    }

    getTotalPages(){

        return this.totalPages;
    }

    getCurrentPage(){

        return this.currentPage;
    }

    getNavigation(params){

        let limitPagesNav = 5;
        let links = [];
        let nrstart = 0;
        let nrend = 0;

        if(this.getTotalPages() < limitPagesNav){

            limitPagesNav = this.getTotalPages();
        }

        //se estiver nas primeiras páginas
        if((this.getCurrentPage() - parseInt(limitPagesNav/2)) < 1){

            nrstart = 1;
            nrend = limitPagesNav;
        } else if ((this.getCurrentPage() + parseInt(limitPagesNav/2)) > this.getTotalPages()){

            nrstart = this.getTotalPages() - limitPagesNav;
            nrend = this.getTotalPages();

        } else {

            nrstart = this.getCurrentPage() - parseInt(limitPagesNav/2);
            nrend = this.getCurrentPage() + parseInt(limitPagesNav/2);
        }

        if(this.getCurrentPage() > 1){

            links.push({
                text:'<',
                href: '?' + this.getQueryStrings(Object.assign({}, params, {page: this.getCurrentPage() - 1}))
            });
        }

        for(let x = nrstart; x <= nrend; x++){

            links.push({
                text:x,
                href:'?' + this.getQueryStrings(Object.assign({}, params, {page:x})),
                active: (x === this.getCurrentPage())
            });
        }

        if(this.getCurrentPage() < this.getTotalPages()){

            links.push({
                text:'>',
                href: '?' + this.getQueryStrings(Object.assign({}, params, {page: this.getCurrentPage() + 1}))
            });
        }

        return links;

    }

    getQueryStrings(params){

        let queryString = [];

        for(let name in params){

            queryString.push(`${name}=${params[name]}`)
        }

        return queryString.join('&');
    }
}

module.exports = Pagination;