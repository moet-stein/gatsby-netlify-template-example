import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ImgCloudinary from '../ImgCloudinary';

const useStyles = makeStyles((theme) => ({
  imgWidth: {
    width: '300px',
    cursor: 'pointer',
    transition: 'box-shadow .3s',
    borderRadius: '3px',
    '&:hover': {
      boxShadow: '0 0 20px rgba(5,5,5,.5)',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #fff',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '80%',
  },
  modalImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  '@media only screen and (max-width: 600px)': {
    imgWidth: {
      width: '200px',
    },
    paper: {
      height: '60%',
    },
  },
}));

export default function LayImg({ img }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(img);

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={1}
        onClick={handleOpen}
      >
        {img?.image && (
          <ImgCloudinary style={{ borderRadius: 5, width: 300 }}
            className={classes.imgWidth}
            src={img.image}
            quality={100}
            width={1024}
            title="img"


          />
        )}
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {img && <img className={classes.modalImg} src={img.image} />}
            {img.imageTitle && (
              <Typography variant="h6">{img.imageTitle}</Typography>
            )}
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
