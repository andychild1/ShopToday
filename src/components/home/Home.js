import SelectCat from "../../features/product/SelectCat";
import './Home.css';

const Home = () => {

    return(
        <>
        <h3 className="home-title">Welcome To Shop Today!</h3>
        <div className="home-container">
            <h4>Choose a category</h4>
            <SelectCat />
        </div>
        </>
    );
};
export default Home;