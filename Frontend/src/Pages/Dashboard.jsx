import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import EmailPlacer from '../Components/Email/EmailPlacer'
import EmailContent from '../Components/Email/EmailContent';
import { useSelector, useDispatch } from 'react-redux';


function Dashboard() {
  const showSidebar = useSelector((state) => state.rootReducer.showSidebar);
  const phoneView = useSelector((state) => state.rootReducer.phoneView);
  const viewContent = useSelector((state) => state.rootReducer.viewContent);
  const contentBody = useSelector((state) => state.rootReducer.contentBody);



  if (showSidebar && phoneView){
    return(
      <>
        <Navbar />
        <hr />
        <div style={{position:"relative",display:"flex"}}>
          <div style={{position:"absolute",width:"100%"}}>
            <Sidebar />
          </div>
          {viewContent==true?<EmailContent />:<EmailPlacer />}
        </div>
      </>
    )
  }
  else if(!showSidebar && phoneView){
    return(
      <>
        <Navbar />
        <hr />
        <div style={{position:"relative",display:"flex"}}>
          <div style={{display:"none"}}>
            <Sidebar />
          </div>
          {viewContent==true?<EmailContent />:<EmailPlacer />}
        </div>
      </>
    )
  }
  return (
    <>
      <Navbar />
      <hr />
      <div style={{display:"flex"}}>
        <Sidebar />
        {viewContent==true?<EmailContent />:<EmailPlacer />}
      </div>
      
    </>
  )
}

export default Dashboard
