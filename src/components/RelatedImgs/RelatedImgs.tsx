import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import { useLocation } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { makeStyles } from '@material-ui/core/styles';
import WorksImage from '../WorksImage/WorksImage';
import useSiteMetadata from '../SiteMetadata';
import { getCurrentLangKey } from 'ptz-i18n';
import { FormattedMessage } from 'react-intl';
import { NavBarContext } from '../../context/NavbarContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '800px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollX: {
    width: '800px',
    height: '300px',
    overflowX: 'auto',
    display: 'inline-flex',
  },
  blueGrey: {
    color: blueGrey[600],
  },
  '@media only screen and (max-width: 800px)': {
    scrollX: {
      width: '300px',
    },
    root: {
      width: '300px',
    },
  },
}));

export function RelatedImgs({ data, location }) {
  const classes = useStyles();
  const { negZIndex } = useContext(NavBarContext);
  const allWorks = data.allMarkdownRemark.edges.map((w) => w.node);
  const theWork = allWorks.filter(
    (w) => w.fields.slug === decodeURI(useLocation().pathname)
  );

  const hashtags = theWork[0].frontmatter.hashtags.map((h) => h.hashtag);
  const [matchedWorks, setMatchedWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { languages } = useSiteMetadata();
  const { langs, defaultLangKey } = languages;
  const url = location.pathname;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);

  const matched = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const foundWorks = allWorks.filter(
      (w) =>
        matched(
          hashtags,
          w.frontmatter.hashtags.map((h) => h.hashtag)
        ) &&
        w !== theWork[0] &&
        w.frontmatter.language === langKey
    );

    setMatchedWorks(foundWorks);
    setLoading(false);
  }, []);

  return (
    <Box className={classes.root} mt={20}>
      {!loading && matchedWorks.length > 0 && (
        <>
          <Box>
            <Typography className={classes.blueGrey} variant="h4">
              <FormattedMessage id="relatedWorks" />
            </Typography>{' '}
          </Box>
          <Box
            display="flex"
            // justifyContent="center"
            // alignItems="center"
            className={classes.scrollX}
          >
            {matchedWorks.map((w) => (
              <>
                {negZIndex ? (
                  <Box
                    m={1}
                    key={w.frontmatter.title}
                    style={{ zIndex: '-1000' }}
                  >
                    <WorksImage
                      imageInfo={w.frontmatter.featuredimage}
                      title={w.frontmatter.title}
                      slug={w.fields.slug}
                      quality="70" width="600"
                    />
                  </Box>
                ) : (
                  <Box m={1} key={w.frontmatter.title}>
                    <WorksImage
                      imageInfo={w.frontmatter.featuredimage}
                      title={w.frontmatter.title}
                      slug={w.fields.slug}
                      quality="70" width="600"
                    />
                  </Box>
                )}
              </>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

RelatedImgs.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default ({ location }) => (
  <StaticQuery
    query={graphql`
      query RelatedImQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "workdetails-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                language
                hashtags {
                  hashtag
                }
                featuredimage
              }
            }
          }
        }
      }
    `}
    render={(data) => <RelatedImgs data={data} location={location} />}
  />
);
