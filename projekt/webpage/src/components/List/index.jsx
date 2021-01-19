import React from 'react';
import { client } from '../../utils/client';
import styles from './List.module.css';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../utils/use_local_storage';

export const List = () => {
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isShowOnlyAvailable, setIsShowOnlyAvailable] = useLocalStorage(
    'onlyAvailable',
    false
  );

  React.useEffect(() => {
    setLoading(true);
    const availableParam = isShowOnlyAvailable && 'available=true';
    const path = availableParam ? `cars?${availableParam}` : 'cars';
    client(path).then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, [isShowOnlyAvailable]);

  if (loading) return null;
  if (cars.length === 0) {
    return <div className={styles.empty}>brak samochodów</div>;
  }
  return (
    <>
      <div className={styles.filters}>
        <input
          type="checkbox"
          name="available"
          id="available"
          checked={isShowOnlyAvailable}
          onChange={(event) => setIsShowOnlyAvailable(event.target.checked)}
        />
        <label htmlFor="available">Pokaż tylko dostępne</label>
      </div>
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
    </>
  );
};
