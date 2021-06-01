import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Modal from 'react-modal';
import Popup from './Popup';

const Home = () => {
    
    var selectedInterests = [];
    var selectedCourses = [];
    var selectedAspirations = [];
    // var courseName = ["abc","def","ghi"];
    // const [modalIsOpen,setIsOpen] = React.useState(false);
    const [multiple, setMultiple] = React.useState({
      modalIsOpen: false,
      course: []
    });
    const {modalIsOpen, course} = multiple;
    // const [courseName, setCourseName] = React.useState([]);
    // var courseId = [];
    const [buttonPopup, setButtonPopup] = useState(false);
    const [Id, setId] = useState(0);
    const [fname, setFname] = useState("");
    const courses = ['Trigonometry', 'Complex Numbers', 'Algebra', 'Probability', 'Linear Algebra'];
    const numbers = ['Trigonometry', 'Complex Numbers', 'Algebra', 'Probability', 'Linear Algebra', 'Differentiation', 'Vector', 'Coordinate Geometry', 'Redox Reactions', 'Quantum Theory', 'Chemical Equilibrium', 'Ionic', 'Surface Chemistry', 'Organic Chemistry', 'Polymers', 'Biomolecules', 'Metallurgy', 'Periodic Table', 'Dimensions', 'Gravitation', 'Electrostatics', 'Electricity', 'Magnetic Field', 'Optics', 'Kinematics', 'Programming', 'Machine Learning', 'Artificial Intelligence', 'Networking', 'Computing', 'Database', 'Software', 'Thermodynamics', 'Communication', 'Environment', 'Psychology', 'Integration'];
    const aspirations = ['Software Engineer', 'Data Engineering', 'Data Science', 'Data Analytics', 'backend development', 'frontend development', 'vlsi engineering', 'signal processing', 'power engineering', 'microelectronics', 'telecommunication', 'geo technical engineer', 'structural engineering', 'coastal engineering', 'seismic engineering', 'mechatronics', 'mechanical engineering', 'manufacturing', 'marine engineering', 'electrical engineering', 'instrumentation', 'physical metallurgy', 'metallurgy', 'extractive metallurgy', 'mineral processing', 'production engineering', 'blockchain develooper', 'machine learning engineer', 'artificial intelligence engineer', 'database engineer', 'network engineer', 'site reliability engineer', 'software tester', 'system administrator'];
    const printCourse = courses.map((course) =>
      <li key={course.toString()}>{course}</li>
   );

   const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

   const handleClick = (feature) => {
     // console.log(feature);
     if(selectedInterests.indexOf(feature) <0 ){
       selectedInterests.push(feature);
     } else {
       selectedInterests = selectedInterests.filter(interest => interest !== feature);
     }
     console.log(selectedInterests);
   }

   const handleAspiration = (feature) => {
    // console.log(feature);
    if(selectedAspirations.indexOf(feature) <0 ){
      selectedAspirations.push(feature);
    } else {
      selectedAspirations = selectedAspirations.filter(interest => interest !== feature);
    }
    console.log(selectedAspirations);
  }

   const handleSelection = (course) => {
     if(selectedCourses.indexOf(course) <0){
       selectedCourses.push(course);
     } else{
       selectedCourses = selectedCourses.filter(interest => interest !== course)
     }
   }

  var subtitle;
  function openModal() {
    // setIsOpen(true);
    setMultiple({
      modalIsOpen: true
    });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    // setIsOpen(false);
    setMultiple({
      modalIsOpen: false
    });
  }

  const submitCourses = () => {
    let user = window.localStorage.getItem('user');
    let request = {
      selectedCourses, username: user
    };
    axios.post('http://localhost:8000/submitCourses',request)
    .then(res => {
      window.location.reload(false);
    })
    .catch(err => {
      console.log(err);
    })
  }

   const handleSubmit = () => {
      let user = window.localStorage.getItem('user');
      console.log(user);
     let request = {selectedInterest: selectedInterests,
                    selectedAspiration: selectedAspirations,
                    username: user};
     axios.post('http://localhost:8000/interest',request)
     .then(response => {
       console.log(response.data);
      // courseId = response.data.courseId;
      //  courseName = response.data.courseName;
      //  console.log(courseName);
      //  openModal();
      var courseDetails = [];
      for(let i=0;i<response.data.courseId.length;i++) {
        let obj = {
          subjectId: response.data.courseId[i],
          subjectName: response.data.courseName[i]
        };
        courseDetails.push(obj);
      }
      setMultiple({
        modalIsOpen: true,
        course: courseDetails
      });
     })
     .catch(err => {
       console.log(err);
     })    
   }

    return (
      <div className="home" style={{maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden'}}>
        <Navbar/>
        <div className="header">
            Pick among the following areas.
          </div>
        {/* <div>{printArray}</div> */}
        <div>
          <div style={{margin:'30px', display: "table", width: "100%", color: "yellow", tableLayout: "fixed"}}>
            {numbers.map(number => (
            <label style={{margin:'10px', width: "14%"}}>
              <input  type="checkbox" key={number} value={number} onClick={() => handleClick(number)}/>
              {number}
            </label>     
            ))}
          </div> 
          <div className="header">
            Pick your Future Aspirations!
          </div>
          <div style={{margin:'30px', display: "table", width: "100%", color: "yellow", tableLayout: "fixed"}}>
            {aspirations.map(aspiration => (
            <label style={{margin:'10px', width: "14%"}}>
              <input  type="checkbox" key={aspiration} value={aspiration} onClick={() => handleAspiration(aspiration)}/>
              {aspiration}
            </label>     
            ))}
          </div>
          <div style={{display: "flex", justifyContent: "center", marginTop: "100px"}}> 
            <button
                type="button"
                className="login-btn"
                onClick={handleSubmit}>SUBMIT
            </button>
          </div>  
        </div>
        {/* <h1>Hi Home</h1> */}
        <div>
          {modalIsOpen && /* <button onClick={openModal}>Open Modal</button> */
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            shouldCloseOnEsc={false}
            shouldCloseOnOverlayClick={false}
          >

            <h2 ref={_subtitle => (subtitle = _subtitle)}>Please select courses you want to take</h2>
            {/* <div>{printCourse}</div> */}
            <div>
              {course.map(row => (
              <div>
              <label>
                <input type="checkbox" key={row.subjectId} value={row.subjectId} onClick={() => handleSelection(row.subjectId)} />
                <button onClick={() => {setButtonPopup(true); setFname(row.subjectId + ".png")}}>{row.subjectId}</button> 
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  {/* <h2>{arr[Id]}</h2> */}
                  <img src= {fname} alt="Smiley Face"></img>
                  {/* <h3>My popup</h3>
                  <p>This is my button triggered popup.</p> */}
                </Popup>
                {row.subjectName}
                {/* {row.subjectName} */}
              </label>     
              </div>
              ))}
            </div>
            <button onClick={submitCourses}>Submit</button>
          </Modal> }
        </div>
      </div>
    );
  }
  
  export default Home;