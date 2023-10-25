import React from 'react';
import WorksImage from '../WorksImage/WorksImage';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '@media only screen and (max-width: 800px)': {
    root: {
      margin: '0px',
    },
  },
}));

export default function Works({ posts }) {
  const classes = useStyles();
  return (
    <div className="columns is-multiline">
      {posts && (
        <Box className={classes.root} m={3} mb={10}>
          {posts
            .map((p) => p.node)
            .map((item) => (
              <Box key={item.id} m={1}>
                {/* <div
                  style={{
                    width: '240px',
                    display: 'inline-block',
                  }}
                > */}
                <WorksImage
                  imageInfo={item.frontmatter.featuredimage}
                  title={item.frontmatter.title}
                  slug={item.fields.slug}
                  quality="70" width="600"
                />
                {/* </div> */}
              </Box>
            ))}
        </Box>
      )}
    </div>
  );
}
