import React, { Component } from 'react';
import { Col, Container, Row, Button, Form, FormGroup, Label, Input, FormText, Jumbotron } from 'reactstrap';

class EventCreate extends Component {
  constructor(props) {
    super(props);


    this.state = {
      name: '',
      date: '',
      location: '',
      description: '',
      img_url: '',
    }
  }
  updatePost = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  }

  render() {
    console.log(this.props, ' this is EventCreate props')
    return (
      <Jumbotron className="jumbotron">
        <h1 className="h1-jumbo">Add an Event!</h1>
        <hr className="my-2" />
        <Container className="container-jumbo">



          <form onSubmit={ async (e) => 
            {await this.props.addPost(this.state, e); 
              this.props.history.push('/');
          }} >

            <FormGroup>
              <label className="date-label">Date:</label>
              <input className="form-control" type="text" name="date" onChange={this.updateEvent} />
            </FormGroup>

            <FormGroup>
              <label className="title-label">Title:</label>
              <input className="form-control" type="text" name="title" onChange={this.updateEvent} />
            </FormGroup>

            <FormGroup>
              <label className="body-label">Write post below:</label>
              <textarea className="form-control" rows="10" type="textarea" name="body" onChange={this.updateEvent} />
            </FormGroup>
            
            <FormGroup>
              <label className="image-url-label">Paste image URL below:</label>
              <input className="form-control" name="img_url" onChange={this.updateEvent} />
            </FormGroup>

            <hr className="my-2" />

            <FormGroup>
              <button className="btn btn-primary btn-sm submit-post-btn" type='Submit'>Submit</button>
            </FormGroup>
          </form>
        </Container>
      </Jumbotron>
    )
  }
}

export default EventCreate;
