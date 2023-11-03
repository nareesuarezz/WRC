import { useEffect, useState } from "react";
import CarListService from "../../services/carList.services"; 
import "./carList.css";
import Header from "../../components/header/header";
import Cabecera from "../../components/menu/Hamburger";
import UserMenu from "../../components/user/userMenu";


interface Car {
  driver: string;
  car: string;
  img: string;
 
}

function CarList() {
  const [cars, setCars] = useState<Car[]>([]); // Inicializa el estado con el tipo Car[]
  const [query, setQuery] = useState("");

  const getCars = () => {
    const allCars = CarListService.getCars() as Car[]; // Asegúrate de que los datos sean del tipo Car[]
    setCars(allCars);
  }

  const showCars = () => {
    return (
      cars.filter(c => c.driver.toLowerCase().includes(query.toLowerCase()) ||
        c.car.toLowerCase().includes(query.toLowerCase())).map(c => {
          return (
            <div className="car-list-item" key={c.driver}>
              <div className="car-list-img">
                <img src={`/assets/img/${c.img}`} alt="car" />
              </div>
              <p>{c.driver} - {c.car}</p>
            </div>
          );
        })
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setQuery(searchValue);
  }

  useEffect(() => {
    getCars();
  }, []);


  return (
    <>
      <Header/>
      <div className="user-menu-container">
        <UserMenu />
      </div>
      <Cabecera/>
     
      <div className="search">
        <h2>Car List</h2>
        <input type="search" onChange={handleChange} />
      </div>
      <div className="main-container">
        <div className="car-list-container">
          {showCars()}
        </div>
      </div>
    </>
  );
  
}

export default CarList;