import React, { PropTypes } from 'react';
// material ui imports lol
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Tabs, Tab } from 'material-ui/Tabs';

import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/Tasks.js';
import TasklistItem from './TasklistItem.jsx';

// required for interacting/clicing on tabs

// dark theme for ui?
const darkMuiTheme = getMuiTheme(darkBaseTheme);
// font style for tabs
// Tasklist component - represents the whole app
export class Tasklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'left',
    };
  }

  renderTitle() {
    return (
      <div className="title">
        <header>
          <h1>Tasks</h1>
        </header>
      </div>
    );
  }

  renderTabs() {
    return (
      <div className="tabs">
        <Tabs
          value={this.state.mode}
          onChange={(mode) => { this.setState({ mode }); }
          }
        >

          <Tab label="Tasks" value="left" />
          <Tab label="Completed" value="middle" />
          <Tab label="Scheduled" value="right" />
        </Tabs>
      </div>
    );
  }
  // renderes Non-scheduled Completed Tasks
  renderNonScheduledCompletedTasks() {
    let filteredTasks = this.props.tasks;
    filteredTasks = filteredTasks.filter(task => !task.schedule);
    filteredTasks = filteredTasks.filter(task => task.checked);

    return filteredTasks.map((task) => (
      <TasklistItem key={task._id} task={task} tab={this.state.mode} />
    ));
  }
  // render unchecked Morning tasks
  renderMorningTasks(){
    let filteredTasks = this.props.tasks;
    filteredTasks = filteredTasks.filter(task => !task.schedule);
    filteredTasks = filteredTasks.filter(task => !task.checked);
    filteredTasks = filteredTasks.filter(task => (task.time === 1));

    return filteredTasks.map((task) => (
      <TasklistItem key={task._id} task={task} tab={this.state.mode} />
    ));
  }
  // render unchecked Afternoon tasks
  renderAfternoonTasks(){
    let filteredTasks = this.props.tasks;
    filteredTasks = filteredTasks.filter(task => !task.schedule);
    filteredTasks = filteredTasks.filter(task => !task.checked);
    filteredTasks = filteredTasks.filter(task => (task.time === 2));

    return filteredTasks.map((task) => (
      <TasklistItem key={task._id} task={task} tab={this.state.mode} />
    ));
  }
  // render unchecked Evening tasks
  renderEveningTasks(){
    let filteredTasks = this.props.tasks;
    filteredTasks = filteredTasks.filter(task => !task.schedule);
    filteredTasks = filteredTasks.filter(task => !task.checked);
    filteredTasks = filteredTasks.filter(task => (task.time === 3));

    return filteredTasks.map((task) => (
      <TasklistItem key={task._id} task={task} tab={this.state.mode} />
    ));
  }
  renderPlannedTasks() {
    const timeCheck = new Date();
    const sortByTime = timeCheck.getHours();

    let filteredPlannedTasks = this.props.tasks;
    filteredPlannedTasks = filteredPlannedTasks.filter(task => !task.schedule);

    // if All tasks completed
    const taskCount = Tasks.find({ schedule: { $ne: true } }).count();
    if (taskCount === 0) {
      return (
        <h2 className="empty">All Done!</h2>
      );
    } else if (sortByTime >= 6 && sortByTime <= 12) {
      return (
        <div>
          {this.renderMorningTasks()}
          {this.renderAfternoonTasks()}
          {this.renderEveningTasks()}
          {this.renderNonScheduledCompletedTasks()}
        </div>
      );
    } else if (sortByTime > 12 && sortByTime <= 18) {
      return (
        <div>
          {this.renderAfternoonTasks()}
          {this.renderEveningTasks()}
          {this.renderMorningTasks()}
          {this.renderNonScheduledCompletedTasks()}
        </div>
      );
    } else {
      return (
        <div>
          {this.renderEveningTasks()}
          {this.renderAfternoonTasks()}
          {this.renderMorningTasks()}
          {this.renderNonScheduledCompletedTasks()}
        </div>
      );
    } 
  }
  // render only completed tasks
  // used for completed tasks tab
  renderCompletedTasks() {
    let filteredCompletedTasks = this.props.tasks;

    filteredCompletedTasks = filteredCompletedTasks.filter(task => task.checked);

    return filteredCompletedTasks.map((task) => (
      <TasklistItem key={task._id} task={task} tab={this.state.mode}/>
    ));
  }

  renderNonCheckedScheduled() {
    let filteredScheduledTasks = this.props.tasks;

    filteredScheduledTasks = filteredScheduledTasks.filter(task => !task.checked);
    filteredScheduledTasks = filteredScheduledTasks.filter(task => task.schedule);

    return filteredScheduledTasks.map((task) => (
      <TasklistItem key={task._id} task={task} tab={this.state.mode}/>
    ));
  }
  renderCheckedScheduled() {
    let filteredScheduledTasks = this.props.tasks;

    filteredScheduledTasks = filteredScheduledTasks.filter(task => task.checked);
    filteredScheduledTasks = filteredScheduledTasks.filter(task => task.schedule);

    return filteredScheduledTasks.map((task) => (
      <TasklistItem key={task._id} task={task} tab={this.state.mode}/>
    ));
  }
  renderScheduledTasks() {
    return (
      <div>
        {this.renderNonCheckedScheduled()}
        {this.renderCheckedScheduled()}
      </div>
    );
  }

  renderTasklistPlanned() {
    return (
      <div className="text">
          {(this.state.mode === 'left') ?
            <div className="tasklistbody">
              {this.renderPlannedTasks()}
            </div> : ''
          }
      </div>
    );
  }

  renderTasklistComplete() {
    return (
      <div className="text">
          {(this.state.mode === 'middle') ?
            <div className="tasklistbody">
              {this.renderCompletedTasks()}
            </div> : ''
          }
      </div>
    );
  }

  renderTasklistScheduled() {
    return (
      <div className="text">
          {(this.state.mode === 'right') ?
            <div className="tasklistbody">
              {this.renderScheduledTasks()}
            </div> : ''
          }
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className="container">

          {/* Render Tasks */}
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              {this.renderTasklistPlanned()}
              {this.renderTasklistComplete()}
              {this.renderTasklistScheduled()}
            </div>
          </MuiThemeProvider>


          {/* Render Tabs */}
          {this.renderTabs()}

        </div>
      </MuiThemeProvider>
    );
  }
}

Tasklist.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { schedule: -1, checked: 1, time: 1, priority: -1, createdAt: 1 } }).fetch(),
  };
}, Tasklist);
