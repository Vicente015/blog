import { format } from 'date-fns';
import { graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import * as _ from 'lodash';
import { lighten, setLightness } from 'polished';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { Footer } from '../components/Footer';
import SiteNav, { SiteNavMain } from '../components/header/SiteNav';
import PostContent from '../components/PostContent';
import { ReadNext } from '../components/ReadNext';
import { Subscribe } from '../components/subscribe/Subscribe';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteMain, linkSvg } from '../styles/shared';
import config from '../website-config';
import { AuthorList } from '../components/AuthorList';

export interface Author {
  id: string;
  bio: string;
  avatar: {
    children: Array<{
      fluid: FluidObject;
    }>;
  };
}

interface PageTemplateProps {
  location: Location;
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        image: {
          childImageSharp: {
            fluid: any;
          };
        };
        excerpt: string;
        tags: string[];
        author: Author[];
        github: string;
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
            date: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    excerpt: string;
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
    author: Author[];
    github: string;
  };
}

const PageTemplate = ({ data, pageContext, location }: PageTemplateProps) => {
  const post = data.markdownRemark;
  let width = '';
  let height = '';
  if (post.frontmatter.image?.childImageSharp) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }

  const date = new Date(post.frontmatter.date);
  // 2018-08-20
  const datetime = format(date, 'yyyy-MM-dd');
  // 20 AUG 2018
  const displayDatetime = format(date, 'dd LLL yyyy');

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{post.frontmatter.title}</title>

        <meta name="description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta property="og:url" content={config.siteUrl + location.pathname} />
        {post.frontmatter.image?.childImageSharp && (
          <meta
            property="og:image"
            content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
          />
        )}
        <meta property="article:published_time" content={post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags.join(', ')} />
        )}

        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.facebook && <meta property="article:author" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta name="twitter:url" content={config.siteUrl + location.pathname} />
        {post.frontmatter.image?.childImageSharp && (
          <meta
            name="twitter:image"
            content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
          />
        )}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.frontmatter.author[0].id} />
        <meta name="twitter:label2" content="Filed under" />
        {post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags.join(', ')} />}
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}
      </Helmet>
      <Wrapper css={PostTemplate, linkSvg}>
        <header className="site-header">
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isPost post={post.frontmatter} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            {/* TODO: no-image css tag? */}
            <article css={[PostFull, !post.frontmatter.image && NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTags className="post-full-tags">
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && post.frontmatter.tags.map(tag => {
                    return (
                      <Link key={tag} to={`/tags/${_.kebabCase(tag)}/`}>
                        {`${tag}`}
                      </Link>
                    );
                  })}
                </PostFullTags>
                {post.frontmatter.github && (
                  <GitHub className="post-github">
                    <Link key={post.frontmatter.github} to={`${post.frontmatter.github}`}>
                      <svg width="112" height="112" viewBox="0 0 112 112">
                        <path d="M55.9563 8.3454C28.9078 8.33446 7 30.2313 7 57.2579C7 78.6298 20.7047 96.797 39.7906 103.469C42.3609 104.114 41.9672 102.288 41.9672 101.041V92.5641C27.125 94.3032 26.5234 84.4813 25.5281 82.8407C23.5156 79.4063 18.7578 78.5313 20.1797 76.8907C23.5594 75.1516 27.0047 77.3282 30.9969 83.2235C33.8844 87.5001 39.5172 86.7782 42.3719 86.0673C42.9953 83.497 44.3297 81.2001 46.1672 79.4173C30.7891 76.661 24.3797 67.2766 24.3797 56.1204C24.3797 50.7063 26.1625 45.7298 29.6625 41.7157C27.4313 35.0985 29.8703 29.4329 30.1984 28.5907C36.5531 28.022 43.1594 33.1407 43.6734 33.5454C47.2828 32.572 51.4063 32.0579 56.0219 32.0579C60.6594 32.0579 64.7938 32.5938 68.4359 33.5782C69.6719 32.6376 75.7969 28.2407 81.7031 28.7767C82.0203 29.6188 84.4047 35.1532 82.3047 41.6829C85.8484 45.7079 87.6531 50.7282 87.6531 56.1532C87.6531 67.3313 81.2 76.7266 65.7781 79.4391C67.0991 80.7382 68.1479 82.2874 68.8634 83.9963C69.5789 85.7053 69.9467 87.5396 69.9453 89.3923V101.697C70.0328 102.681 69.9453 103.655 71.5859 103.655C90.9563 97.1251 104.902 78.8267 104.902 57.2688C104.902 30.2313 82.9828 8.3454 55.9563 8.3454V8.3454Z" fill="black"/>
                      </svg>
                    </Link>
                  </GitHub>
                )}
                <PostFullTitle className="post-full-title">{post.frontmatter.title}</PostFullTitle>
                <PostFullCustomExcerpt className="post-full-custom-excerpt">
                  {post.frontmatter.excerpt}
                </PostFullCustomExcerpt>
                <PostFullByline className="post-full-byline">
                  <section className="post-full-byline-content">
                    <AuthorList authors={post.frontmatter.author} tooltip="large" />
                    <section className="post-full-byline-meta">
                      <h4 className="author-name">
                        {post.frontmatter.author.map(author => (
                          <Link key={author.id} to={`/author/${_.kebabCase(author.id)}/`}>
                            {author.id}
                          </Link>
                        ))}
                      </h4>
                      <div className="byline-meta-content">
                        <time className="byline-meta-date" dateTime={datetime}>
                          {displayDatetime}
                        </time>
                        <span className="byline-reading-time">
                          <span className="bull">&bull;</span> {post.timeToRead} min read
                        </span>
                      </div>
                    </section>
                  </section>
                </PostFullByline>
              </PostFullHeader>

              {post.frontmatter.image?.childImageSharp && (
                <PostFullImage>
                  <Img
                    style={{ height: '100%' }}
                    fluid={post.frontmatter.image.childImageSharp.fluid}
                    alt={post.frontmatter.title}
                  />
                </PostFullImage>
              )}
              <PostContent htmlAst={post.htmlAst} />

              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}
            </article>
          </div>
        </main>

        <ReadNext
          currentPageSlug={location.pathname}
          tags={post.frontmatter.tags}
          relatedPosts={data.relatedPosts}
          pageContext={pageContext}
        />

        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

const PostTemplate = css`
  .site-main {
    margin-top: 64px;
    background: ${colors.darkmode};
    padding-bottom: 4vw;
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 170px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
    margin-top: 15%;
  }
`;

const PostFullTags = styled.section`
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-items: center;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 1.3rem;
  line-height: 1.4em;
  font-weight: 600;
  text-transform: uppercase;

  a {
    margin-right: 0.5rem;
    align-self: flex-start;
  }
`;

const GitHub = styled.div`
  font-size: 0;

  svg {
    display: block;
    width: 3.5rem;
    height: 3.5rem;
    margin-top: -4%;
    margin-left: 100%;
  }
  
  a {
    font-size: 0;
  }

  @media (max-width: 500px) {
    svg {
      display: block;
      width: 3.5rem;
      height: 3.5rem;
      margin-top: -4%;
      margin-left: 90%;
    }
  }

`;

const PostFullCustomExcerpt = styled.p`
  margin: 20px 0 0;
  color: ${lighten('0.1', colors.midgrey)};
  font-family: Georgia, serif;
  font-size: 2.3rem;
  line-height: 1.4em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }
`;

const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 0;
  padding-top: 15px;
  /* border-top: 1px solid color(var(--lightgrey) l(+10%)); */
  border-top: 1px solid ${lighten('0.1', colors.lightgrey)};

  .post-full-byline-content {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  .post-full-byline-content .author-list {
    justify-content: flex-start;
    padding: 0 12px 0 0;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
    font-size: 1.2rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .post-full-byline-meta h4 {
    margin: 0 0 3px;
    font-size: 1.3rem;
    line-height: 1.4em;
    font-weight: 500;
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }

    /* border-top-color: color(var(--darkmode) l(+15%)); */
    border-top-color: ${lighten('0.15', colors.darkmode)};

    .post-full-byline-meta h4 a {
      color: rgba(255, 255, 255, 0.75);
    }

    .post-full-byline-meta h4 a:hover {
      color: #fff;
    }
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }

  color: rgba(255, 255, 255, 0.9);
`;

const PostFullImage = styled.figure`
  margin: 25px 0 50px;
  height: 100%;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 25px -6vw 50px;
    border-radius: 0;
    img {
      max-width: 1170px;
    }
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;

export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: { eq: "img/bloglogo.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
        excerpt
        github
        image {
          childImageSharp {
            fluid(maxWidth: 3720) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author {
          id
          bio
          avatar {
            children {
              ... on ImageSharp {
                fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PageTemplate;
