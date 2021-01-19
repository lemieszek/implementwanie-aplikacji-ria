import React from 'react';
import { client } from '../../utils/client';
import styles from './List.module.css';
import { Link } from 'react-router-dom';

export const List = () => {
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    client('cars').then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  if (cars.length === 0) {
    return <div className={styles.empty}>brak samochodów</div>;
  }
  return (
    <ul className={styles.list}>
      {cars.map((car) => (
        <li key={car.id} className={styles.item}>
          <Link to={`/${car.id}`} className={styles.link}>
            <span style={{ color: car.available ? undefined : 'red' }}>
              {car.name}
            </span>
            <span>{car.price} zł</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
