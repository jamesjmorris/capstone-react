import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';

class EditDonation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  // onClickToggleModal(){
  //   this.toggle;
  //   this.props.showCommentModal(this.props.commentID)
  // }
  // onClick={this.onClickToggleModal}>

  render() {
    console.log(JSON.stringify(this.props.donationToEdit) + "LOOK AT THESE FUCKING PROPS YO")

    return (
      <span>
        <button className="btn btn-warning btn-sm edit-comment-btn" onClick={this.toggle}> Edit Donation</button>

        {/*                <Button 
              color="danger"
              onClick={ async (e) => 
                      {
                        e.preventDefault()
                        // console.log(this.props)
                            await this.toggle
                            await this.props.showCommentModal(this.props.commentID)
                      }} >EDIT COMMENT </Button>*/}

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Donation</ModalHeader>
          <ModalBody>

            <form onSubmit={async (e) => {
              e.preventDefault()
              console.log(this.props)
              this.toggle();
              // await   this.props.showCommentModal(this.props.commentID)
              await this.props.closeAndEditDonation(this.props.donationID, this.props.donationToEdit.event)
            }} >
              <FormGroup>
                <label>
                  Edit Date:
                    <input type="text"
                    name="date"
                    onChange={this.props.handleDonationFormChange}
                    placeholder={this.props.donationToEdit.date} />
                </label>
              </FormGroup>
              <FormGroup>
                <label>
                  Edit Donation:
                  <textarea className="form-control comment-textarea" rows="6" cols="60" type="textarea"
                    name="body"
                    onChange={this.props.handleDonationFormChange}
                    placeholder={this.props.donationToEdit.body} />
                </label>
              </FormGroup>
              <input type="hidden" name="event" value={this.props.event} onChange={this.updateDonation} />
              <button className="btn btn-primary btn-sm edit-comment-btn" type="submit" value="Edit Donation">Submit</button>
            </form>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}



export default EditDonation;


