import './style.css';
import Logic from './module/logic';
import Navbar from './module/navbar';


export default function App() {
  return (
    <>
    <Navbar/>
    <div className='daddy'>
      <Logic/>
    </div>
    </>
  );
}
