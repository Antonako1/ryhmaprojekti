import RollingCatalog from "@/components/RollingCatalog/RollingCatalog";

const CarsPage = () => {
    return (
        <div>
            <RollingCatalog props={{TO_FETCH: "CARS"}}/>
        </div>
    );
}

export default CarsPage;