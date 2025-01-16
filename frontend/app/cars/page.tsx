import RollingCatalog from "@/components/RollingCatalog/RollingCatalog";
import { Types } from "@/Utils/consts";

const CarsPage = () => {
    return (
        <div>
            <RollingCatalog props={{TO_FETCH: Types.CARS}}/>
        </div>
    );
}

export default CarsPage;