import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
 static defaultProps={
  country:'in',
  category:'general',
 }
 static propTypes={
  country:PropTypes.string,
  category:PropTypes.string,
 }
  constructor(){
    super();
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    }
  }
  async componentDidMount(){
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06004f00a0f243de9bc3e917585a5feb&page=1&pageSize=6`
    this.setState({loading:true})
    let data=await fetch(url);
    this.props.setProgress(30);
    let parsedData=await data.json();
    this.props.setProgress(70);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.props.setProgress(100);
  } 
  prev=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06004f00a0f243de9bc3e917585a5feb&page=${this.state.page-1}&pageSize=6`
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({loading:false})
  this.setState({
    page:this.state.page-1,
    articles:parsedData.articles
  })
  }
  next=async ()=>{
    if(this.state.page+1>Math.ceil(this.state.totalResults/6)){

    }
    else{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06004f00a0f243de9bc3e917585a5feb&page=${this.state.page+1}&pageSize=6`
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({loading:false})
  this.setState({
    page:this.state.page+1,
    articles:parsedData.articles
  })
}
  }
  fetchMoreData = async () => {
 
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06004f00a0f243de9bc3e917585a5feb&page=${this.state.page+1}&pageSize=6`
      this.setState({
        page:this.state.page+1
      });
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({articles:this.state.articles.concat(parsedData.articles),totalResults:parsedData.totalResults})
  };
  render() {
    return (
      <>
        <h2 className="text-center my-3">News Monkey Top Headlines</h2>
        {this.state.loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

      </>
    )
  }
}

export default News
