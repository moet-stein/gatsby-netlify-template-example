import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import grey from '@material-ui/core/colors/grey';
import { useLocation } from '@reach/router';
import { Image } from 'cloudinary-react';
import ImgCloudinary from '../ImgCloudinary';

const useStyles = makeStyles(() => ({
  root: {
    width: '240px',
    display: 'inline-block',
  },
  widthImg: {
    width: '180px',
  },

  image: {
    opacity: '1',
    display: 'block',
    width: '100%',
    height: 'auto',
    transition: '.5s ease',
    backfaceVisibility: 'hidden',
    borderRadius: '5px',
  },
  middle: {
    transition: '.5s ease',
    opacity: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  container: {
    position: 'relative',
    '&:hover $image': { opacity: '0.3' },
    '&:hover $middle': { opacity: '1' },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: grey[600],
    opacity: '0.9',
    borderRadius: '5px',
    color: 'white',
    fontSize: '16px',
    padding: '16px 32px',
    marginBottom: '3px',
  },
  hashTags: {
    backgroundColor: grey[300],
    opacity: '0.8',
    borderRadius: '5px',
    width: '200px',
  },
  '@media only screen and (max-width: 600px)': {
    root: {
      width: '150px',
    },
    widthImg: {
      width: '150px',
    },
  },
}));

const WorksImage = ({ imageInfo, title, slug, quality, width }) => {
  const classes = useStyles();
  const location = useLocation().pathname;
  console.log('imageInfo :>> ', imageInfo);
  const qualityTransfomation = imageInfo.replace('q_100,w_2400', `q_${quality},w_${width}`)
  // https://res.cloudinary.com/dcyfdwhvk/image/upload/c_scale,f_auto,q_100,w_2400/v1628770242/Spontane_Oase_Ausschnit_tdum6v.jpg
  return (
    <div
      className={classes.root}
    // style={{
    //   width: '240px',
    //   display: 'inline-block',
    // }}
    >
      {!!imageInfo && (
        <Link className="title has-text-primary is-size-4" to={slug}>
          {location === '/workdetails' && (
            <div className={classes.container}>
              <ImgCloudinary width={width} quality={quality} title={title} src={qualityTransfomation} className={classes.image} />
              {/* <Image cloudName="demo" publicId="sample" width="300" crop="scale" /> */}

              <div className={classes.middle}>
                <div className={classes.content}>{title}</div>
              </div>
            </div>
          )}
          {location !== '/workdetails' && (
            <Box className={classes.widthImg}>
              <div className={classes.container}>
                <ImgCloudinary width={width} quality={quality} title={title} src={qualityTransfomation} className={classes.image} />
                {/* <img width={width} height="auto" src={qualityTransfomation} className={classes.image} /> */}
                {/* <Img fixed={imageInfo} className={classes.image} /> */}
                <div className={classes.middle}>
                  <div className={classes.content}>{title}</div>
                </div>
              </div>
            </Box>
          )}
        </Link>
      )}
    </div>
  );
  // }
};

WorksImage.propTypes = {
  imageInfo: PropTypes.string,
};

export default WorksImage;
