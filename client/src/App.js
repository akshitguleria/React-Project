import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';


class App extends React.Component{
  constructor(){
    super()
    this.state={
      totalseats:new Array(73),
      count:0
    }
  }
  componentWillMount(){
    axios.get('http://localhost:8080/display')
    .then((data)=>{
      console.log(data.data[0].seats)
      if(data.data[0].seats!==undefined)
      this.setState({totalseats:data.data[0].seats})
    })
    .catch(err=>console.log(err))
  }
  handleSubmit=(event)=>{
    let totalseats=this.state.totalseats;
    axios.post('http://localhost:8080/send',totalseats)
    .then((Data)=>{
      console.log(Data);
    })
    .catch(err=>console.log(err))
  }
  handleDiv=(event)=>{
    console.log('called');
    let totalseats=this.state.totalseats;
    let index=event.target.innerText
    let flag=0;
    if(totalseats[index-1]===false&&flag===0){
      totalseats[index-1]=true;
      flag=1;
    }

    if(totalseats[index-1]===true&& flag===0){
      totalseats[index-1]=false;
      flag=1;
    } 
    
    this.setState({totalseats:totalseats})
  }
  render(){
    const{totalseats,reserved,clicked,count}=this.state;
    {
      if(count===0){
      this.setState({count:1})
      for(let i=0;i<totalseats.length;i++){
        totalseats[i]=false;
      }
    }
    }
    return(
      <>
      <div className="nav">
        <h1>Seat Reservation</h1>
        <button className="btn-submit" onClick={this.handleSubmit}>Submit</button>
      </div>
      <div className="div">
        {
          totalseats.map((seats,index)=>{
                  if(seats===true){
                    return(
                    <div key={index} className="booked-seat" onClick={this.handleDiv}>{index+1}</div>
                    )
                  }
                  else if(seats===false){
                  return(
                  <div key={index} className="unbooked-seat" onClick={this.handleDiv}>{index+1}</div>
                  )
                  }
              })
        }
      </div>
      </>
    )
  }
}

export default App;
