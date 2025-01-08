import RollingCatalog from "@/components/RollingCatalog/RollingCatalog";

const AlcoholsPage = () => {
    return (
        <div>
            <RollingCatalog props={{TO_FETCH: "ALCOHOL"}}/>
        </div>
    )
}

export default AlcoholsPage;