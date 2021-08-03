import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavorites extends React.Component {
  constructor(props){
    super(props)
    this.state={
      colorsArr:[],
      email:'',
      showing:false,
      index:0
    }
  }
  render() {
    componentDidMount = async () => {
      try{
      const { user, isAuthenticated } = this.props.auth0;
      let url = `${process.env.REACT_APP_SERVER}/addfav/${user.email}`;
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

  deletecolor=async(index)=>{
      try{
      let url=`${process.env.REACT_APP_SERVER}/deletecolor/${user.email}`
      let resData = await axios.post(url,item)
      this.setState({
          colorsArr: resData.data,
      })}
      catch(error){
          console.log('error');
      }   
  }
    return(
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {this.state.colorsArr.map((item, index) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.imageUrl} style={{ height: '200px' }} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>

                  <Button variant="danger" onClick={() => { this.deletecolor(index) }}>Delete</Button>
                  <Button variant="warning" >Update</Button>

                </Card.Body>
              </Card>
            )
          })}
      

      </>
    )
  }
}

export default withAuth0(MyFavorites);

