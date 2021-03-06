import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Course from './Course';

class Courses extends Component {

  state = {
    courses: [],
    errors: [],
  }

  // Get course data
  componentDidMount() {
    const {context} = this.props;
    context.data.getCourses()
      .then( courses => {
        this.setState({courses})
      })
      .catch(err => {
        console.log('Error fetching the course data', err)
        this.props.history.push('/error');
      }) 
  }

  render() {
    // Map over the course data and create Course component
    const courses = this.state.courses.map( course => (
      <Course title={course.title} key={course.id} id={course.id} /> 
    ));

    return (
      <div className="bounds">
        {courses}
          <div className="grid-33">
            <Link className="course--module course--add--module" to={"/courses/create"}>
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
            </Link>
        </div>
      </div>   
    );
  }
}

export default Courses;