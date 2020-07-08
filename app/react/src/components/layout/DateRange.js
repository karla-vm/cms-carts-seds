import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TextField } from "@cmsgov/design-system-core";
import DateComponent from "./DateComponent";

class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.method1 = this.method1.bind(this);
    // this.validateDateRange = this.validateDateRange.bind(this);
  }

  // start 05/2019
  // end 12/2019

  // THIS STATE NEEDS TO KEEP TRACK OF THE START RANGES & END RANGES (after theyve been validated)
  // add start range and end range data to state
  // write a method that compares start range to end range
  method1(value, error, name) {
    console.log("value in parent", value);
    console.log("is this a good value??", error);

    if (error === false) {
      this.setState({
        fromMethod: "bubbled up",
        [name]: value,
      });
    }
  }

  //   validateDateRange() {
  //     console.log("ON BLUR??");
  //     console.log("child component??", this.startRangeData.value);
  //   }

  render() {
    //needs to take in some function via this.props that will set state on parent component
    return (
      <div className="date-range ds-u-display--flex ds-u-flex-direction--row">
        <DateComponent startRange someMethod={this.method1} />
        {/* <DateComponent endRange /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  year: state.formYear,
});

export default connect(mapStateToProps)(DateRange);
