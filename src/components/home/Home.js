import SelectCat from "../../features/product/SelectCat";

const Home = () => {



    return(
        <div style={{marginTop: '150px'}}>
            <h3>Welcome To Shop Today!</h3>
            <h5>Choose a category</h5>
            <SelectCat />
        </div>
    );
};
export default Home;