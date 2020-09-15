import React from 'react';
import {Button} from '@material-ui/core';

export function JoinProjectButton() {
  const handleOnClick = () => {
    try {
      alert('Ваша заявка на участие отправлена'); // Todo: придумать логику
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOnClick}>
        Присоединиться к проекту
      </Button>
    </>
  );
}
