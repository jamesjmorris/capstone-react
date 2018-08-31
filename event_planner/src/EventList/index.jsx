import React from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardDeck } from 'reactstrap';
import DonationCreate from '../DonationCreate/index';
import DonationList from '../DonationList/index';
import EventEdit from '../EventEdit/index';
import DonationEdit from '../DonationEdit/index'



const EventList = (props) => {

  const eventList = props.events.map((event, i) => {
      
    return (
      // <Col className="column-posts" col sm="6">
      //   <Card className="card-deck" key={event.id}>

      //     <CardImg top width="auto" src={event.img_url} alt="" />
      //     <CardBody>
      //       <CardTitle>
      //         <h3 className="blog-title"><a href="../EventShowPage/EventShowPage.jsx"></a>{event.name}</h3>
      //       </CardTitle>
      //       <CardSubtitle>
      //         <div key={event.id}>
      //           <h6 className="event-info">{event.date}</h6>
      //           <h6 className="event-info">{event.location}</h6>
      //           <h6 className="event-info">Amount Needed: ${event.cost}</h6>
      //         </div>
      //       </CardSubtitle>
      //       <CardText className="blog-body">
      //         {event.description}
      //       </CardText> 
      //       <span className="center-post-btns">
      //       <EventEdit
      //         closeAndEdit={props.closeAndEdit}
      //         handleFormChange={props.handleFormChange}
      //         eventToEdit={event}
      //         showModal={props.showModal}
      //       />
            
      //         <button className="btn btn-danger btn-sm delete-btn" onClick={props.deleteEvent.bind(null, event.id)}>Delete Event</button>
      //         <button className="btn btn-danger btn-sm delete-btn" onClick={props.deleteEvent.bind(null, event.id)}>Donate</button>
      //       </span>
      //     </CardBody>
      //     <DonationCreate eventID={'http://localhost:8000/api/events/' + event.id + '/'} addDonation={props.addDonation} />

      //     <DonationList
      //       eventID={event.id}
      //       donations={props.donations}
      //       deleteDonation={props.deleteDonation}

      //       showDonationModal={props.showDonationModal}
      //       closeAndEditDonation={props.closeAndEditDonation}
      //       donationToEdit={props.donationToEdit}
      //       handleCommentFormChange={props.handleCommentFormChange}
      //     />
      //   </Card>
      // </Col>
      <div className='event-main' key={event.id}>
        <img className='event-img' src={event.img_url} alt=""/>
        <h5 className="event-info"><a href="../EventShowPage/EventShowPage.jsx"></a>{event.name}</h5><br/>
        <h6 className="event-info">{event.date}</h6><br/>
        <h6 className="event-info">{event.location}</h6><br/>
        <h6 className="event-info">Amount Needed: ${event.cost}</h6><br/>
        <button className="btn btn-danger btn-sm delete-btn" onClick={props.deleteEvent.bind(null, event.id)}>Delete Event</button>
        <button className="btn btn-danger btn-sm delete-btn" onClick={props.deleteEvent.bind(null, event.id)}>Donate</button>
      </div>
    )
  })

  return (
    // <Container className="container">
    //   <Row>
    //     <CardDeck className="card-deck">
    <div>
          {eventList}
    </div>
    //     </CardDeck>
    //   </Row>
    // </Container>
  )

};


export default EventList;