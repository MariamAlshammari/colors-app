import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import MyCard from './components/MyCard'
import { Card, Button } from 'react-bootstrap';


class AllDataAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorsArr: [],
            email: ''
        }
    }

    componentDidMount = async () => {
        try{
        const { user, isAuthenticated } = this.props.auth0;
        let url = `${process.env.REACT_APP_SERVER}/colors`;
        let resData = await axios.get(url)
        this.setState({
            colorsArr: resData.data,
            email: user.email
        })
    }
    catch(error){
        console.log('error');
    }
    }

    addfav=async(item)=>{
        try{
        let url=`${process.env.REACT_APP_SERVER}/addfav/${this.state.email}`
        let resData = await axios.post(url,item)
        this.setState({
            colorsArr: resData.data,
        })}
        catch(error){
            console.log('error');
        }   
    }
    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3> 

                {/* <MyCard colorsArr={this.state.colorsArr} /> */}

                    {
                        this.state.colorsArr.map((item) => {
                            return (

                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            <img src={item.imageUrl}/>
                                        </Card.Text>
                                        <Button variant="primary" onClick={()=>{this.addfav(item)}}>add to fav</Button>
                                    </Card.Body>
                                </Card>

                            )
                         })}
                         </div> 
        )
    }
}

export default withAuth0(AllDataAPI);
