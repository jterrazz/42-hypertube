import React from 'react'
import fetch from 'isomorphic-unfetch'

function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async () => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js');
  const data = await res.json();

  return {
    stars: data.node_id
  }
};

export default Page