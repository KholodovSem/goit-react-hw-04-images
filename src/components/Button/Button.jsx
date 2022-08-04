import Button from '@mui/material/Button';
import style from './Button.module.css';

function Btn({onLoadMore}) {
  return (
    <Button variant='contained' className={style.button} onClick={onLoadMore}>Load More</Button>
  );
}

export default Btn;
