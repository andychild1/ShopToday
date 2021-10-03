import SelectCat from "../../features/product/SelectCat";
import './Home.css';

const Home = () => {

    return(
        <div className="home-container" style={{width: '250px', marginTop: '120px',textAlign: 'center'}}>
            <h3>Welcome To Shop Today!</h3>
            <h5>Choose a category</h5>
            <SelectCat />
        </div>
    );
};
export default Home;