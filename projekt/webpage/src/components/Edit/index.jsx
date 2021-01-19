import React from 'react';
import { client } from '../../utils/client';
import { useParams, useHistory, Link } from 'react-router-dom';

export const Edit = () => {
  const [car, setCar] = React.useState();
  const params = useParams();

  React.useEffect(() => {
    client(`car/${params.id}`).then((data) => {
      setCar(data);
    });
  }, [params.id]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const history = useHistory();

  const handleSubmit = React.useCallback(
    (event) => {
      setIsSubmitting(true);
      event.preventDefault();
      const {
        name: { value: name },
        description: { value: description },
        available: { checked: available },
        price: { value: price },
      } = event.target;
      client(`car/${params.id}`, {
        method: 'PUT',
        body: {
          name,
          description,
          available,
          price: Number(price),
        },
      }).then(({ id }) => {
        history.push(`/${id}`);
      });
    },
    [history, params.id]
  );

  if (car) {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nazwa auta</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="..."
          defaultValue={car.name}
          required
          disabled={isSubmitting}
        />
        <label htmlFor="description">Opis</label>
        <textarea
          name="description"
          id="description"
          defaultValue={car.description}
          placeholder="..."
          disabled={isSubmitting}
        />
        <input
          type="checkbox"
          name="available"
          id="available"
          defaultChecked={car.available}
          disabled={isSubmitting}
        />
        <label
          htmlFor="available"
          style={{ display: 'inline', paddingLeft: '0.3rem' }}
        >
          Dostępność
        </label>
        <label htmlFor="price">Cena w zł</label>
        <input
          name="price"
          id="price"
          type="number"
          defaultValue={car.price}
          required
          disabled={isSubmitting}
        />
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting..' : 'Submit'}
        </button>
        <br />
        <br />
        <Link to={`/${params.id}`} role="button">
          Anuluj
        </Link>
      </form>
    );
  } else return null;
};
