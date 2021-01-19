import React from 'react';
import { client } from '../../utils/client';
import { useParams, Link } from 'react-router-dom';
import styles from './Preview.module.css';
import { useHistory } from 'react-router-dom';

export const Preview = () => {
  const [car, setCar] = React.useState();
  const params = useParams();

  const history = useHistory();

  const removeCar = React.useCallback(() => {
    if (window.confirm('Na pewadę chcesz usunąć ten samochód?')) {
      client(`car/${params.id}`, { method: 'DELETE' }).then(() => {
        history.push('/');
      });
    }
  }, [history, params.id]);

  React.useEffect(() => {
    client(`car/${params.id}`).then((data) => {
      setCar(data);
    });
  }, [params.id]);

  if (car) {
    return (
      <section>
        <label htmlFor="name">Nazwa auta</label>
        <input type="text" id="name" name="name" value={car.name} disabled />
        <label htmlFor="description">Opis</label>
        <p style={{ margin: '1rem 0 1rem 0' }}>{car.description}</p>
        <input
          type="checkbox"
          name="available"
          id="available"
          checked={car.available}
          disabled
        />
        <label
          htmlFor="available"
          style={{ display: 'inline', paddingLeft: '0.3rem' }}
        >
          {car.available ? 'Dostępny' : 'Nie dostępny'}
        </label>
        <label htmlFor="price">Cena w zł</label>
        <input
          name="price"
          id="price"
          type="number"
          value={car.price}
          disabled
        />
        <br />
        <Link to={`/${params.id}/edytuj`} role="button">
          Edytuj
        </Link>
        <button
          type="button"
          className={styles.removeButton}
          onClick={removeCar}
        >
          Usuń
        </button>
      </section>
    );
  } else return null;
};
