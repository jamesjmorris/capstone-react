import React from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem } from 'reactstrap';
import DonationEdit from '../DonationEdit/index';


const DonationList = (props) => {
    let apiEventID = 'http://localhost:8000/api/events/' + props.eventID + '/';

    const donationList = props.donations.map((donation, i) => {
        // console.log(donation, ' this is donation');

        if (apiEventID === donation.event) {
            return (
                <div key={donation.id}>
                    <ListGroup>
                        <ListGroupItem>
                            <span>{donation.date}</span>
                            <br></br>
                            <span>{donation.body}</span>
                            <br></br>
                            
                        
                    
                    <div className="comment-edit-delete-btns">
                    <br></br>
                    <DonationEdit
                        {...props}
                        donationID={donation.id}
                        showDonationModal={props.showDonationModal}
                        closeAndEditDonation={props.closeAndEditDonation}
                        donationToEdit={donation}
                        handleDonationFormChange={props.handleDonationFormChange}
                    />
                    <button className="btn btn-danger btn-sm" onClick={props.deleteDonation.bind(null, donation.id)}>Delete Donation</button>
                            {/*<button onClick={props.showCommentModal.bind(null, comment.id)}>Edit</button>*/}
                    </div>
                    </ListGroupItem>
                </ListGroup>
                
                </div>
            )
        }
    })

    return (
        <div>
            {donationList}
        </div>
    )
};

export default DonationList;
