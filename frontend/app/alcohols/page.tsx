import RollingCatalog from "@/components/RollingCatalog/RollingCatalog";
import { Types } from "@/Utils/consts";

const AlcoholsPage = () => {
    return (
        <div>
            <RollingCatalog props={{TO_FETCH: Types.ALCOHOL}}/>
        </div>
    )
}

export default AlcoholsPage;