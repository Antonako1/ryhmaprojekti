import styles from "./AddItem.module.css"

const AddAlcohol = () => {
    return (
        <>
            <label htmlFor="alcoholType">Alcohol Type</label>
            <input type="text" id="alcoholType" name="alcoholType" required />

            <label htmlFor="alcoholBrand">Alcohol Brand</label>
            <input type="text" id="alcoholBrand" name="alcoholBrand" required />

            <label htmlFor="alcoholVolume">Alcohol Volume</label>
            <input type="number" id="alcoholVolume" name="alcoholVolume" required />

            <label htmlFor="alcoholYear">Alcohol Year</label>
            <input type="number" id="alcoholYear" name="alcoholYear" required />
            
            <input type="submit" value="Add Alcohol" />
        </>
    );
}

export default AddAlcohol;