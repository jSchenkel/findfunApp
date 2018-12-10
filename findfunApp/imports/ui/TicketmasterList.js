import { Meteor } from 'meteor/meteor';
import React from 'react';

import TicketmasterListItem from './TicketmasterListItem.js';

export default class TicketmasterList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      ticketmasterList: []
    };
  }

  componentDidMount() {
    if (this.props.city && this.props.time) {
      // get entertainment from server method (which calls Ticketmaster API)
      Meteor.call('getTicketmasterResults', this.props.city, this.props.time, (err, res) => {
        if (err) {
          console.log('getTicketmasterResults err: ', err);
        } else {
          console.log('getTicketmasterResults res: ', res);
          // save ticketmaster data response to state
          this.setState({ ticketmasterList: res });
        }
      });
    }
  }

  renderTicketmasterListItems() {
    if (this.state.ticketmasterList) {
      // iterate through array of objects and render child component for each element
      return this.state.ticketmasterList.map((ticketmasterListItem) => {
        return (
          <TicketmasterListItem key={ticketmasterListItem.id} ticketmasterListItem={ticketmasterListItem} city={this.props.city} time={this.props.time} />
        );
      });
    }
  }

  render() {
    return (
      <div className="column">
        <div className="box">
          <h3 className="title is-3 has-text-grey-dark">Shows</h3>
          <h5 className="title is-5 has-text-grey-dark">Bookmark a fun show for you and your friends</h5>
        </div>
        {this.renderTicketmasterListItems()}
      </div>
    );
  }
}
