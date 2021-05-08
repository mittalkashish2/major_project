import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Modal from 'react-modal';

const Home = () => {
    var user = window.localStorage.getItem('user');
    console.log(user);
    var selectedInterests = [];
    const courses = ['Trigonometry', 'Complex Numbers', 'Algebra', 'Probability', 'Linear Algebra'];
    const numbers = ['Trigonometry', 'Complex Numbers', 'Algebra', 'Probability', 'Linear Algebra', 'Differentiation', 'Vector', 'Coordinate Geometry', 'Redox Reactions', 'Quantum Theory', 'Chemical Equilibrium', 'Ionic', 'Surface Chemistry', 'Organic Chemistry', 'Polymers', 'Biomolecules', 'Metallurgy', 'Periodic Table', 'Dimensions', 'Gravitation', 'Electrostatics', 'Electricity', 'Magnetic Field', 'Optics', 'Kinematics', 'Programming', 'Machine Learning', 'Artificial Intelligence', 'Networking', 'Computing', 'Database', 'Software', 'Thermodynamics', 'Communication', 'Environment', 'Psychology', 'Integration'];
    
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

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

   const handleSubmit = () => {
     let request = {selectedInterests};
     axios.post('http://localhost:8000/interest/{user}',request)
     .then(response => {
       console.log(response);
     })
     .catch(err => {
       console.log(err);
     })
     openModal();
   }

    return (
      <div className="home">
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
          {setIsOpen && /* <button onClick={openModal}>Open Modal</button> */
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
            <div>{printCourse}</div>
            <button onClick={closeModal}>close</button>
            {/* <div>I am a modal</div> */}
            {/* <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form> */}
          </Modal> }
        </div>
      </div>
    );
  }
  
  export default Home;