import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../App.css';
import EventList from '../EventList/index';
import EventCreate from '../EventList/index';
import Aux from '../hoc/aux';
import Navigation from '../Nav/Nav.jsx'

// import DonationEdit from '../DonationEdit/index'


class MainContainer extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      donations: [],
      showEdit: false,
      editEventId: null,
      eventToEdit: {
        name: '',
        date: '',
        location: '',
        description: '',
        img_url: '',
      },
      showDonationEdit: false,
      editDonationId: null,
      donationToEdit: {
        event: '',
        amount: '',
        date: '',
        comment: '',
      },
    }
  }

  componentDidMount() {
    this.getEvents().then((events) => {
      this.setState({ events: events })
    }).catch((err) => {
      // console.log(err);
    });
    this.getDonations().then((donations) => {
      this.setState({ donations: donations })
    }).catch((err) => {
      // console.log(err);
    })
  }

  // ========================= Events API Calls =========================
  getEvents = async () => {

    const events = await fetch('http://localhost:8000/api/events/');
    const eventsJson = await events.json();
    return eventsJson

  }

  addEvent = async (event, e) => {
    e.preventDefault();
    console.log('this is event')
    try {
      const createdEvent = await fetch('http://localhost:8000/api/events/', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const createdEventJson = await createdEvent.json();

      console.log(createdEventJson);
      this.setState({events: [...this.state.events, createdEventJson]});
    } catch(err) {
      console.log(err)

    }
  }
  
  deleteEvent = async (id, e) => {
    // console.log(id, ' this is id of the event in the delete route');
    e.preventDefault();
    try {
      const deleteEvent = await fetch('http://localhost:8000/api/events/' + id + '/', {
        method: 'DELETE',
      });

      console.log(deleteEvent, 'inside try');
      this.setState({ events: this.state.events.filter((event, i) => event.id !== id) });
    } catch (err) {
      console.log(err, ' error')
      }
    }


  showModal = (id, e) => {
    //////////////////////////////////this.editEventToggle();
    // i comes before e, when called with bind
    const eventToEdit = this.state.events.find((event) => event.id === id)
    // console.log(postToEdit, ' postToEdit')
    this.setState({
      showEdit: true,
      editEventId: id,
      eventToEdit: eventToEdit
    });
  }

  closeAndEdit = async (eventId) => {

    try {
      const editResponse = await fetch('http://localhost:8000/api/events/' + eventId + '/', {
        method: 'PUT',
        body: JSON.stringify(this.state.eventToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const editResponseJson = await editResponse.json();
      const editedEventArray = this.state.events.map((event) => {

        if (event.id === parseInt(eventId)) {
          console.log("FOUND THE ONE TO REPLACE")
          return editResponseJson
        }
        return event
      });

      this.setState({
        events: editedEventArray,
        showEdit: false
      });
    } catch (err) {
        console.log(err);
    }
  }
  handleFormChange = (e) => {

    this.setState({
      eventToEdit: { ...this.state.eventToEdit, [e.target.name]: e.target.value }
    });
  }

  // ========================= Donations API Calls =========================
  getDonations = async () => {
    const donations = await fetch('http://localhost:8000/api/donations/');
    const donationsJson = await donations.json();
    // console.log(donationsJson, ' this is donationsJson');
    // console.log(donations, ' this is donations');
    return donationsJson;
  }

  addDonation = async (donation, e) => {
    console.log(donation, ' this is donation');
    e.preventDefault();

    try {
      const createdDonation = await fetch('http://localhost:8000/api/donations/', {
        method: 'POST',
        body: JSON.stringify(donation),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const createdDonationJson = await createdDonation.json();
      this.setState({ donations: [...this.state.donations, createdDonationJson] });
    } catch (err) {
        console.log(err);
    }
  }

  deleteDonation = async (id, e) => {
    e.preventDefault();
    // console.log('deleteComment function is being called, this is the id: ', id);
    try {
      const deleteDonation = await fetch('http://localhost:8000/api/donations/' + id + '/', {
        method: 'DELETE'
      });
      // console.log(deleteDonation, ' this is delete comment');

      if (deleteDonation.status === 204) {
        this.setState({ donations: this.state.donations.filter((donation, i) => donation.id !== id) });
      } else {
        console.log('error in delete donation');
      }
    } catch (err) {
      // console.log(err, ' this is error caught when deleted comment');
    }
  }

  showDonationModal = (id) => {
    // console.log('showCommentModal function is being called, this is the id: ', id);
    const donationToEdit = this.state.donations.find((donation) => donation.id === id);
    console.log(donationToEdit, ' this is commentToEdit XxXxXxXxXxXxXx +++++++++++========||||||');
    // console.log(id, ' this is id');
    this.setState({
      showDonationEdit: true,
      editDonationId: id,
      donationToEdit: donationToEdit,
    });
  }

  closeAndEditDonation = async (donationId, event) => {
    console.log(this.state.commentToEdit + "THIS IS THE COMMENT TO EDIT")
    console.log(donationId);
    const data = {
      ...this.state.donationToEdit,
      event: event,
      id: donationId
    }
    console.log(data)
    // e.preventDefault();
    try {
      const editDonation = await fetch('http://localhost:8000/api/donations/' + donationId + '/', {
        method: 'PUT',
        body: JSON.stringify({
          ...this.state.donationToEdit,
          "event":event
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const editDonationJson = await editDonation.json();
      const editedDonationArray = this.state.donations.map((donation) => {
        console.log(donation)
        if (donation.id === parseInt(donationId)) {
          console.log("FOUND THE ONE TO REPLACE")
          return editDonationJson;
        }
        return donation;
      });
      // console.log(editCommentJson, ' this is editCommentJson');
    //   console.log("SHOULDA REPLACED ID WITH " + commentId)
    //   console.log(editedCommentArray, ' this is editedCommentArray');
      this.setState({
        donations: editedDonationArray,
        showDonationEdit: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleDonationFormChange = (e) => {
    this.setState({
      donationToEdit: { ...this.state.donationToEdit, [e.target.name]: e.target.value }
    })
  }

  // ========================= Return/Display =========================

  render() {
    // console.log(this.state)
    return (

        <Aux>
            <img className="home-image" src="http://www.twitrcovers.com/wp-content/uploads/2015/09/Abstract-Music-Rock-Bw-l.jpg" alt=""/>
            <Navigation/>
                <Switch>
          <Route exact path="/" render={(props) => (
            
          <EventList events={this.state.events}
                   deleteEvent={this.deleteEvent}
                   showModal={this.showModal}
                   ////////////passing props for edit EVENT ///////////
                   showEdit={this.state.showEdit}
                   donations={this.state.donations}
                   addDonation={this.addDonation} 
                   deleteDonation={this.deleteDonation} 
                   closeAndEdit={this.closeAndEdit} 
                   handleFormChange={this.handleFormChange} 
                   eventToEdit={this.state.eventToEdit}
                   ///////////passing props for  edit DONATION ////////
                   showDonationEdit={this.state.showDonationEdit}
                   closeAndEditDonation={this.closeAndEditDonation}
                   handleDonationFormChange={this.handleDonationFormChange} 
                   donationToEdit={this.state.donationToEdit}
                   showDonationModal={this.showDonationModal}
            />
          )} />





          <Route exact path="/new" render={(props) => (
            <EventCreate {...props} addEvent={this.addEvent} />
          )} />

        </Switch>
        </Aux>


    );
  }
}


export default MainContainer;