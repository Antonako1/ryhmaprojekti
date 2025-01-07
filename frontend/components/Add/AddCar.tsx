import styles from "./AddItem.module.css"

const AddCar = () => {
    return (
        <>
            <label htmlFor="carMake">Car brand</label>
            <input type="text" id="carMake" name="carMake" required />

            <label htmlFor="carModel">Car Model</label>
            <input type="text" id="carModel" name="carModel" required />

            <label htmlFor="carYear">Car Year</label>
            <input type="number" id="carYear" name="carYear" required />

            <label htmlFor="carMileage">Car Mileage</label>
            <input type="number" id="carMileage" name="carMileage" required />
            
            <input type="submit" value="Add Car" />
        </>
    );
}

export default AddCar;