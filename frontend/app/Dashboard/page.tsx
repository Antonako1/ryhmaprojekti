import AddProduct from "@/components/Add/AddMain";
import RollingCatalog from "@/components/RollingCatalog";

const Dashboard = () => {
    return (
        <div>
            <RollingCatalog props={{TO_FETCH: "CARS"}}/>
            <AddProduct props={{TYPE: "CARS"}}/>
            <hr />
            <AddProduct props={{TYPE: "ALCOHOL"}}/>
        </div>
    )
}

export default Dashboard;