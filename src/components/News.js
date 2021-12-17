import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: '8',
        category: 'science'
      }
      static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string,
      }
       capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props){
        super(props);
       this.state={
           articles: [],
           loading: false,
           page:1
       }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMpnkey`;
    };

    async updateNews(){
        let  url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8aeedd49ba0c496e98843566d232e1c9&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData  = await data.json();
        this.setState({articles: parsedData.articles,
             totalResults: parsedData.totalResults,
             loading: false
         });
    }
    async componentDidMount(){
       this.updateNews();
    }

    handleNext = async()=>{
        console.log("Next");
    //     if(!(this.state.page+1 > Math.ceil( this.state.totalResults/this.props.pageSize))){
    //     let  url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8aeedd49ba0c496e98843566d232e1c9&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData  = await data.json();
    //     this.setState({
    //         page: this.state.page+1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }
    await this.setState({page: this.state.page+1});
    this.updateNews();

    }
    handlePrev = async()=>{
        // console.log("Previous");
        // let  url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8aeedd49ba0c496e98843566d232e1c9&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData  = await data.json();
        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
       await this.setState({page: this.state.page-1});
    this.updateNews();
    }
    render() {
        return (
            <div className='container my-4'>
                <h1 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
                {this.state.loading && <Spinner/>}
                <div className=" row">
                {!this.state.loading && this.state.articles.map((element)=>{
                   return <div className="col-md-4" key={element.url}>
                   <NewsItem title = {element.title?element.title.slice(0, 45):""} description = {element.description?element.description.slice(0, 88): ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date ={element.publishedAt} source={element.source.name}  />
                       </div>
                })}
                    
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                <button disabled={this.state.page+1 > Math.ceil( this.state.totalResults/this.props.pageSize)} type="button" className=" btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
