import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Objective2b from "./objectives/Objective2b.js";
import PageInfo from "../../layout/PageInfo";
import NavigationButton from "../../layout/NavigationButtons";
import { Tabs, TabPanel } from "@cmsgov/design-system-core";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "@reach/accordion/styles.css";
import { sliceId } from "../../Utils/helperFunctions";

class Section2b extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectiveCount: 1,
      objectiveArray: [],
      previousObjectivesArray: [],
    };
    this.newObjective = this.newObjective.bind(this);
  }

  componentDidMount() {
    // This sets up an inital, blank objective
    const initialObjective = {
      id: `${this.props.year}_1`,
      component: <Objective2b objectiveId={`${this.props.year}_1`} />,
    };

    let dummyDataArray = [];

    for (let i = 1; i < 3; i++) {
      dummyDataArray.push({
        id: `2019_${i}`,
        // this creates dummy data for the previous year tab, each tagged as a previous entry using props
        component: (
          <Objective2b objectiveId={`2019_${i}`} previousEntry="true" />
        ),
      });
    }

    this.setState({
      objectiveArray: [initialObjective],
      previousObjectivesArray: dummyDataArray,
    });
  }

  newObjective() {
    let newObjectiveId = this.state.objectiveCount + 1;
    let newObjective = {
      id: `${this.props.year}_${newObjectiveId}`,
      // This builds a new component with an ID taken from the current year and the next available ID
      component: (
        <Objective2b objectiveId={`${this.props.year}_${newObjectiveId}`} />
      ),
    };

    this.setState({
      objectiveCount: newObjectiveId,
      objectiveArray: this.state.objectiveArray.concat(newObjective),
    });
  }

  render() {
    return (
      <div className="section-2b">
        <div className="ds-l-container">
          <div className="ds-l-row">
            <div className="sidebar ds-l-col--3">
              <Sidebar />
            </div>

            <div className="main ds-l-col--9">
              <PageInfo />
              <Tabs>
                <TabPanel id="section2b" tab="Section 2B: Performance Goals">
                  <div className="section-content">
                    <form>
                      <p>
                        Your performance goals should match those reflected in
                        your CHIP State Plan, Section 9. If your goals are
                        different, submit a State Plan Amendment (SPA) to
                        reconcile any differences
                      </p>
                      <div className="objective-accordiion">
                        {/* This builds an accordion that maps through the array of Objectives in state */}
                        <Accordion
                          multiple
                          defaultIndex={[...Array(100).keys()]}
                        >
                          {this.state.objectiveArray.map((element) => (
                            <AccordionItem key={element.id}>
                              <div className="accordion-header">
                                <h3>
                                  <AccordionButton>
                                    <div className="title">
                                      {/* The sliceId utility function gets just the number of each objective, removes the year */}
                                      Objective {sliceId(element.id)}:
                                    </div>
                                    <div className="arrow"></div>
                                  </AccordionButton>
                                </h3>
                              </div>
                              <AccordionPanel>
                                {/* This is where the component is being rendered*/}
                                {element.component}
                              </AccordionPanel>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>

                      <div>
                        <h3> Add another objective</h3>
                        <p className="ds-base color-gray-light">Optional</p>
                        <button
                          onClick={this.newObjective}
                          type="button"
                          className="ds-c-button ds-c-button--primary"
                        >
                          Add another objective
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </form>
                  </div>
                </TabPanel>

                <TabPanel className="section2b-previous" tab="FY2019 answers">
                  <div className="section-content">
                    <div className="objective-accordiion">
                      {/* This builds an accordion that maps through the array of prevoous Objectives in state */}
                      <form>
                        <Accordion>
                          {this.state.previousObjectivesArray.map((element) => (
                            <AccordionItem key={element.id}>
                              <div className="accordion-header">
                                <h3>
                                  <AccordionButton>
                                    <div className="title">
                                      {/* The sliceId utility function gets just the number of each objective, removes the year */}
                                      Objective {sliceId(element.id)}:
                                    </div>
                                    <div className="arrow"></div>
                                  </AccordionButton>
                                </h3>
                              </div>
                              <AccordionPanel>
                                {/* This is where the component is being rendered*/}
                                {element.component}
                              </AccordionPanel>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </form>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
              <div className="nav-buttons">
                <NavigationButton direction="Previous" destination="/2a" />

                <NavigationButton direction="Next" destination="/3c" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  year: state.formYear,
});

export default connect(mapStateToProps)(Section2b);
