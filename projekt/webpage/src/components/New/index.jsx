import React from 'react';
import { client } from '../../utils/client';
import { useHistory } from 'react-router-dom';

export const New = () => {
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
      client('car', {
        method: 'POST',
        body: {
          name,
          description,
          available,
          price: Number(price),
        },
      }).then(({ id }) => {
        history.push('/' + id);
      });
    },
    [history]
  );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nazwa auta</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="..."
        required
        disabled={isSubmitting}
      />
      <label htmlFor="description">Opis</label>
      <textarea
        name="description"
        id="description"
        placeholder="..."
        disabled={isSubmitting}
      />
      <input
        type="checkbox"
        name="available"
        id="available"
        defaultChecked
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
        required
        disabled={isSubmitting}
      />
      <br />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting..' : 'Submit'}
      </button>
    </form>
  );
};
